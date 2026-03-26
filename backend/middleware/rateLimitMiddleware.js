const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000);
const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100);
const authMaxRequests = Number(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS ?? 10);

const requestBuckets = new Map();

function getClientKey(req) {
  return req.ip ?? req.headers["x-forwarded-for"] ?? "unknown";
}

function createRateLimiter(limit) {
  return (req, res, next) => {
    const key = `${getClientKey(req)}:${req.baseUrl}${req.path}:${limit}`;
    const now = Date.now();
    const bucket = requestBuckets.get(key);

    if (!bucket || now - bucket.start > windowMs) {
      requestBuckets.set(key, { count: 1, start: now });
      return next();
    }

    if (bucket.count >= limit) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    bucket.count += 1;
    return next();
  };
}

export const apiRateLimit = createRateLimiter(maxRequests);
export const authRateLimit = createRateLimiter(authMaxRequests);
