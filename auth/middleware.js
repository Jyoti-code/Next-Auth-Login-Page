import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (token) {
        try {
            verifyToken(token);
            return NextResponse.next(); 
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: ['/home/:path*'], 
};
