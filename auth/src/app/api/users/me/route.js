import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/jwt'; 

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    try {
        const decoded = verifyToken(token);
        return NextResponse.json({ email: decoded.email });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
}
