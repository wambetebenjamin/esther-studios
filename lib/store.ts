/**
 * Vercel KV backed store with an in memory fallback so the site works
 * locally and in preview before KV credentials are added.
 */
type KvLike = {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, opts?: { ex?: number }): Promise<unknown>;
};

const memory = new Map<string, { value: unknown; expires: number }>();

let kvClient: KvLike | null = null;
let kvAttempted = false;

async function getKv(): Promise<KvLike | null> {
  if (kvAttempted) return kvClient;
  kvAttempted = true;

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }

  try {
    const mod = await import("@vercel/kv");
    kvClient = mod.kv as unknown as KvLike;
  } catch {
    kvClient = null;
  }

  return kvClient;
}

export async function storeGet<T>(key: string): Promise<T | null> {
  const client = await getKv();
  if (client) {
    try {
      return await client.get<T>(key);
    } catch {
      /* fall through to memory */
    }
  }

  const hit = memory.get(key);
  if (!hit) return null;
  if (hit.expires && hit.expires < Date.now()) {
    memory.delete(key);
    return null;
  }
  return hit.value as T;
}

export async function storeSet(
  key: string,
  value: unknown,
  ttlSeconds?: number,
): Promise<void> {
  const client = await getKv();
  if (client) {
    try {
      await client.set(key, value, ttlSeconds ? { ex: ttlSeconds } : undefined);
      return;
    } catch {
      /* fall through to memory */
    }
  }

  memory.set(key, {
    value,
    expires: ttlSeconds ? Date.now() + ttlSeconds * 1000 : 0,
  });
}
