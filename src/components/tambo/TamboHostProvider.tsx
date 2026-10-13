"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { TasteProfileCard } from "./TasteProfileCard";
import { CareerTasteMap } from "./CareerTasteMap";
import { CareerDeepDive } from "./CareerDeepDive";
import { RoadmapTimeline } from "./RoadmapTimeline";
import { PortfolioProjectCard } from "./PortfolioProjectCard";
import { ResourceList } from "./ResourceList";
import { FollowUpQuestionCard } from "./FollowUpQuestionCard";
import { ComparisonTable } from "./ComparisonTable";
import { QlooReasoningPanel } from "./QlooReasoningPanel";
import { ExportRoadmapButton } from "./ExportRoadmapButton";

export interface ComponentSpec {
  component: string;
  props: Record<string, any>;
}

export interface MessageItem {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  componentSpec?: ComponentSpec | null;
  createdAt: string;
}

interface TamboHostContextValue {
  messages: MessageItem[];
  isStreaming: boolean;
  sendMessage: (text: string) => Promise<void>;
  triggerAction: (action: { type: string; payload: Record<string, any> }) => Promise<void>;
  resetThread: () => void;
  renderComponent: (spec: ComponentSpec) => React.ReactNode;
}

const TamboHostContext = createContext<TamboHostContextValue | null>(null);

// Component registry dictionary
const REGISTERED_COMPONENTS: Record<string, React.ComponentType<any>> = {
  TasteProfileCard,
  CareerTasteMap,
  CareerDeepDive,
  RoadmapTimeline,
  PortfolioProjectCard,
  ResourceList,
  FollowUpQuestionCard,
  ComparisonTable,
  QlooReasoningPanel,
  ExportRoadmapButton,
};

class ComponentErrorBoundary extends React.Component<
  { componentName: string; children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { componentName: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[Tambo Generative UI Error in <${this.props.componentName} />]:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200">
          <div className="font-semibold text-amber-300 mb-1">
            Generative UI Notice: &lt;{this.props.componentName} /&gt;
          </div>
          <p className="text-neutral-400">
            This generative UI module received partial parameters and recovered safely. Ask the strategist to regenerate or deep dive into this track.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function TamboHostProvider({
  children,
  initialMessages = [],
  threadId = "default-thread",
  userId = "alex.chen@careerdna.ai",
}: {
  children: React.ReactNode;
  initialMessages?: MessageItem[];
  threadId?: string;
  userId?: string;
}) {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);

  // Send message to agent streaming endpoint
  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsStreaming(true);

      try {
        const res = await fetch("/api/agent/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            threadId,
            userId,
            messages: [...messages, userMsg],
          }),
        });

        if (!res.ok) {
          throw new Error(`Agent error: ${res.statusText}`);
        }

        const data = await res.json();

        // Process emitted messages & components
        if (data.messages && Array.isArray(data.messages)) {
          setMessages((prev) => [...prev, ...data.messages]);
        }
      } catch (err: any) {
        console.error("Tambo stream error:", err);
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: "I encountered an error analyzing your request. Please try again or rephrase.",
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, threadId, userId]
  );

  // Trigger direct interactive action (e.g. card click)
  const triggerAction = useCallback(
    async (action: { type: string; payload: Record<string, any> }) => {
      setIsStreaming(true);
      try {
        const res = await fetch("/api/agent/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            threadId,
            userId,
            messages,
            directAction: action,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.messages && Array.isArray(data.messages)) {
            setMessages((prev) => [...prev, ...data.messages]);
          }
        }
      } catch (err) {
        console.error("Failed to trigger action:", err);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, threadId, userId]
  );

  const resetThread = useCallback(() => {
    setMessages([]);
  }, []);

  const renderComponent = useCallback((spec: any) => {
    if (!spec) return null;
    let parsed: any = spec;
    if (typeof spec === "string") {
      try {
        parsed = JSON.parse(spec);
      } catch (err) {
        console.error("Failed to parse componentSpec JSON:", err);
        return null;
      }
    }
    if (!parsed || !parsed.component) return null;
    const Component = REGISTERED_COMPONENTS[parsed.component];
    if (!Component) {
      return (
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-3 text-xs text-red-300">
          Component not found: {parsed.component}
        </div>
      );
    }
    let props = parsed.props || {};
    if (typeof props === "string") {
      try {
        props = JSON.parse(props);
      } catch {
        props = {};
      }
    }
    return (
      <ComponentErrorBoundary componentName={parsed.component}>
        <Component {...props} />
      </ComponentErrorBoundary>
    );
  }, []);

  return (
    <TamboHostContext.Provider
      value={{
        messages,
        isStreaming,
        sendMessage,
        triggerAction,
        resetThread,
        renderComponent,
      }}
    >
      {children}
    </TamboHostContext.Provider>
  );
}

export function useTamboHost() {
  const context = useContext(TamboHostContext);
  if (!context) {
    return {
      messages: [],
      isStreaming: false,
      sendMessage: async () => {},
      triggerAction: async () => {},
      resetThread: () => {},
      renderComponent: () => null,
    };
  }
  return context;
}
