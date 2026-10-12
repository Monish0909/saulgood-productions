interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding window rate limiter: 5 requests per hour per IP.
 */
export function checkRateLimit(ip: string, limit = 5, windowMs = 60 * 60 * 1000): {
  success: boolean;
  remaining: number;
} {
  const now = Date.now();
  if (rateLimitMap.size > 500) {
    for (const [k, v] of rateLimitMap) if (now > v.resetAt) rateLimitMap.delete(k);
  }
  const record = rateLimitMap.get(ip);

  // Clean up if expired
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count };
}
