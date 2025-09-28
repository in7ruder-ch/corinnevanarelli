// middleware.js
import { NextResponse } from "next/server";

// Nota:
// - Quitamos cualquier lógica de Basic Auth.
// - Dejamos /admin y /api/* fluir; las rutas admin ya validan cookie en servidor.
// - Excluimos assets estáticos del matcher para evitar sobrecarga.

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplica a todo menos estáticos comunes
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|public).*)",
  ],
};
