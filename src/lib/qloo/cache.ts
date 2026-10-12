import { prisma } from "@/lib/db/prisma";

const memoryCache = new Map<string, { data: any; expiresAt: number }>();

export async function getCachedQlooResponse<T = any>(cacheKey: string): Promise<T | null> {
  const now = Date.now();

  // Fast memory check
  const memHit = memoryCache.get(cacheKey);
  if (memHit) {
    if (memHit.expiresAt > now) {
      return memHit.data as T;
    }
    memoryCache.delete(cacheKey);
  }

  // Database check
  try {
    const dbHit = await prisma.qlooCache.findUnique({
      where: { cacheKey },
    });

    if (dbHit) {
      if (dbHit.expiresAt.getTime() > now) {
        const parsed = JSON.parse(dbHit.responseBody);
        memoryCache.set(cacheKey, { data: parsed, expiresAt: dbHit.expiresAt.getTime() });
        return parsed as T;
      } else {
        await prisma.qlooCache.delete({ where: { cacheKey } }).catch(() => {});
      }
    }
  } catch (err) {
    console.warn("[Qloo Cache] DB read failed, continuing without cache:", err);
  }

  return null;
}

export async function setCachedQlooResponse(
  cacheKey: string,
  endpoint: string,
  requestHash: string,
  data: any,
  ttlSeconds = 86400 * 7 // 7 days cache default
): Promise<void> {
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
  const jsonStr = JSON.stringify(data);

  memoryCache.set(cacheKey, { data, expiresAt: expiresAt.getTime() });

  try {
    await prisma.qlooCache.upsert({
      where: { cacheKey },
      update: {
        responseBody: jsonStr,
        expiresAt,
      },
      create: {
        cacheKey,
        endpoint,
        requestHash,
        responseBody: jsonStr,
        expiresAt,
      },
    });
  } catch (err) {
    console.warn("[Qloo Cache] DB write failed:", err);
  }
}
