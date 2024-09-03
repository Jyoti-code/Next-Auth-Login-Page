import { NextResponse } from 'next/server';
import { generateToken } from '../../../../lib/jwt'; 
const User = require('../../../../modal/User'); 

export async function POST(request) {
    const { email, password } = await request.json();

    return new Promise((resolve) => {
        User.authenticate(email, password, (err, user) => {
            if (err) {
                resolve(
                    NextResponse.json({ message: 'Login failed', error: err.message }, { status: 401 })
                );
            } else {
                const token = generateToken({ email: user.email }); 
                resolve(
                    NextResponse.json({ message: 'Login successful', token: token }, { status: 200 })
                );
            }
        });
    });
}
