import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { auth } from "@/auth/auth";

const intlProxy = createMiddleware(routing);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/");
  const locale = segments[1];
  const pathWithoutLocale = `/${segments.slice(2).join("/")}`;

  if (
    pathWithoutLocale.startsWith(`${locale}/dashboard`) ||
    pathWithoutLocale === `/${locale}/dashboard`
  ) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.rewrite(
      new URL(pathname.replace("/api", "/internal-api"), req.url)
    );
  }

  return intlProxy(req);
}

export const config = {
  matcher: ["/", "/(en|vi)/:path*", "/api/:path*"],
};
