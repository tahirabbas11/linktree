import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidToken } from '@/utils/jwt';

export async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl;
    
    // Get token from cookies
    const accessToken = req.cookies.get('accessToken');
    console.log("Middleware : ",accessToken);
    

    // if (accessToken) {
    //     const valid = await isValidToken(accessToken.value, req, res);
    //     console.log('Valid:', valid);
        
    //     if (valid && pathname === "/login") {
    //         // If the token is valid and user is at login page, redirect to dashboard
    //         return NextResponse.redirect(new URL('/', req.url));
    //     } else if (valid) {
    //         // Allow the request to proceed
    //         return NextResponse.next();
    //     }
    // }
    
    // No token or invalid token, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next|favicon.ico).*)',
};

