import { NextResponse } from "next/server";
import { signAdminSession } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminAuthSecret = process.env.ADMIN_AUTH_SECRET;

  if (!adminPassword || !adminAuthSecret) {
    return NextResponse.json(
      { ok: false, error: "Server admin auth is not configured" },
      { status: 500 },
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  const maxAgeSeconds = 60 * 60 * 12;
  const token = signAdminSession({ secret: adminAuthSecret, maxAgeSeconds });

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "admin_session",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  });

  return res;
}
