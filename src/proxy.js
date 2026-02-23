import { auth } from "./auth";
import { NextResponse } from "next/server";


const validRoutes = [
       "/",
       "/notes",
       "/credits",
       "/history",
       "/payment-failed",
       "/payment-success",
       "/register"

];


export async function proxy(req) {
       const session = await auth();

       const pathname = req.nextUrl.pathname;

       const isPublicPath = pathname === "/register";

       const isValidRoute = validRoutes.includes(pathname);

       //Invalid route → redirect home
       if (!isValidRoute) {
              return NextResponse.redirect(new URL("/", req.url));
       }

       if (isPublicPath && session) {
              return NextResponse.redirect(new URL("/", req.url));
       }

       if (!isPublicPath && !session) {
              return NextResponse.redirect(new URL("/register", req.url));
       }

       return NextResponse.next();
}

export const config = {
       matcher: [
              "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)",
       ],
};