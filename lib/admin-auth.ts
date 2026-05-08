import crypto from "crypto";

type VerifyResult = { ok: true; exp: number } | { ok: false };

function base64UrlEncode(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecodeToString(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(b64, "base64").toString("utf8");
}

function hmacSha256(secret: string, data: string) {
  return crypto.createHmac("sha256", secret).update(data).digest();
}

export function signAdminSession(params: { secret: string; maxAgeSeconds: number }) {
  const exp = Math.floor(Date.now() / 1000) + params.maxAgeSeconds;
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = JSON.stringify({ exp, nonce });
  const payloadB64 = base64UrlEncode(payload);
  const sigB64 = base64UrlEncode(hmacSha256(params.secret, payloadB64));
  return `${payloadB64}.${sigB64}`;
}

export function verifyAdminSession(params: { secret: string; token: string }): VerifyResult {
  const parts = params.token.split(".");
  if (parts.length !== 2) return { ok: false };

  const [payloadB64, sigB64] = parts;

  const expectedSig = hmacSha256(params.secret, payloadB64);
  const actualSigRaw = Buffer.from(
    sigB64.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (sigB64.length % 4)) % 4),
    "base64",
  );

  if (actualSigRaw.length !== expectedSig.length) return { ok: false };
  if (!crypto.timingSafeEqual(actualSigRaw, expectedSig)) return { ok: false };

  try {
    const payloadStr = base64UrlDecodeToString(payloadB64);
    const payload = JSON.parse(payloadStr) as { exp?: unknown };
    const exp = typeof payload.exp === "number" ? payload.exp : NaN;
    if (!Number.isFinite(exp)) return { ok: false };

    const now = Math.floor(Date.now() / 1000);
    if (now > exp) return { ok: false };

    return { ok: true, exp };
  } catch {
    return { ok: false };
  }
}
