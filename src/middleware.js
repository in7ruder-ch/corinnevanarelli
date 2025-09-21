import { NextResponse } from "next/server";

// Proteger /admin y las APIs de bookings
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export function middleware(req) {
  const user = process.env.ADMIN_USER || "";
  const pass = process.env.ADMIN_PASS || "";

  if (!user || !pass) {
    return new NextResponse("Admin auth not configured", { status: 500 });
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const encoded = auth.split(" ")[1];
    // Edge runtime: usar atob para Base64
    const decoded = atob(encoded);
    const [u, p] = decoded.split(":");
    if (u === user && p === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
  });
}
