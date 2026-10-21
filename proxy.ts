import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SHOW_CIGARETTES, VAPE_PAGE_PATH, isCigaretteRequestPath } from "./app/lib/cigaretteGate";

export function proxy(request: NextRequest) {
  if (SHOW_CIGARETTES) return NextResponse.next();
  if (!isCigaretteRequestPath(request.nextUrl.pathname)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = VAPE_PAGE_PATH;
  url.search = "";
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|html)$).*)"],
};
