type VerifyResult = { ok: true; exp: number } | { ok: false };

function hasBuffer() {
  return typeof Buffer !== "undefined";
}

function bytesToBase64(bytes: Uint8Array) {
  if (hasBuffer()) return Buffer.from(bytes).toString("base64");
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  // eslint-disable-next-line no-undef
  return btoa(binary);
}

function base64ToBytes(b64: string) {
  if (hasBuffer()) return new Uint8Array(Buffer.from(b64, "base64"));
  // eslint-disable-next-line no-undef
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlEncodeBytes(bytes: Uint8Array) {
  return bytesToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlEncodeString(str: string) {
  const bytes = new TextEncoder().encode(str);
  return base64UrlEncodeBytes(bytes);
}

function base64UrlDecodeToBytes(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return base64ToBytes(b64);
}

function base64UrlDecodeToString(input: string) {
  const bytes = base64UrlDecodeToBytes(input);
  return new TextDecoder().decode(bytes);
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacSha256(secret: string, data: string) {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.subtle) throw new Error("WebCrypto is not available");

  const key = await cryptoObj.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sig = await cryptoObj.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

function randomHex(bytesLen: number) {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.getRandomValues) throw new Error("crypto.getRandomValues is not available");
  const bytes = new Uint8Array(bytesLen);
  cryptoObj.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signAdminSession(params: { secret: string; maxAgeSeconds: number }) {
  const exp = Math.floor(Date.now() / 1000) + params.maxAgeSeconds;
  const nonce = randomHex(16);
  const payload = JSON.stringify({ exp, nonce });
  const payloadB64 = base64UrlEncodeString(payload);
  const sigBytes = await hmacSha256(params.secret, payloadB64);
  const sigB64 = base64UrlEncodeBytes(sigBytes);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminSession(params: { secret: string; token: string }): Promise<VerifyResult> {
  const parts = params.token.split(".");
  if (parts.length !== 2) return { ok: false };

  const [payloadB64, sigB64] = parts;

  try {
    const expectedSigBytes = await hmacSha256(params.secret, payloadB64);
    const actualSigBytes = base64UrlDecodeToBytes(sigB64);
    if (!constantTimeEqual(actualSigBytes, expectedSigBytes)) return { ok: false };

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
