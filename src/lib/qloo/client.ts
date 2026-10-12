import crypto from "crypto";

export interface QlooRequestOptions {
  method?: "GET" | "POST";
  endpoint: string;
  params?: Record<string, string | number | boolean>;
  body?: any;
}

export interface QlooApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
  durationMs: number;
}

export class QlooClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.QLOO_API_KEY || "";
    this.baseUrl = (process.env.QLOO_API_BASE_URL || "https://api.qloo.com/v1").replace(/\/$/, "");
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0 && !this.apiKey.includes("demo_key"));
  }

  public async request<T = any>(options: QlooRequestOptions): Promise<QlooApiResponse<T>> {
    const startTime = Date.now();
    const { endpoint, method = "GET", params, body } = options;

    if (!this.isConfigured()) {
      return {
        success: false,
        error: "Qloo API key not configured. Operating in degraded local mode.",
        durationMs: 0,
      };
    }

    let url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => searchParams.append(k, String(v)));
      url += `?${searchParams.toString()}`;
    }

    const requestHash = crypto
      .createHash("sha256")
      .update(`${method}:${endpoint}:${JSON.stringify(params || {})}:${JSON.stringify(body || {})}`)
      .digest("hex")
      .slice(0, 16);

    const maxRetries = 2;
    let lastError: string | null = null;
    let statusCode = 0;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": this.apiKey,
            "User-Agent": "CareerDNA/1.0",
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        statusCode = response.status;
        const durationMs = Date.now() - startTime;

        // Anonymized debug log
        console.log(`[Qloo API] hash=${requestHash} status=${statusCode} endpoint=${endpoint} duration=${durationMs}ms`);

        if (response.ok) {
          const data = (await response.json()) as T;
          return {
            success: true,
            data,
            statusCode,
            durationMs,
          };
        } else {
          lastError = `HTTP ${response.status}: ${await response.text().catch(() => response.statusText)}`;
        }
      } catch (err: any) {
        lastError = err.name === "AbortError" ? "Request timeout (6000ms)" : err.message;
        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, 300 * Math.pow(2, attempt)));
        }
      }
    }

    const durationMs = Date.now() - startTime;
    console.warn(`[Qloo API Warning] hash=${requestHash} endpoint=${endpoint} failed after retries: ${lastError}`);

    return {
      success: false,
      error: lastError || "Unknown Qloo API error",
      statusCode,
      durationMs,
    };
  }
}

export const qlooClient = new QlooClient();
