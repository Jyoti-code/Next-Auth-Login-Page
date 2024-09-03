import { NextResponse } from 'next/server';
const User = require('../../../../modal/User');

export async function POST(request) {
    const { username, email, password } = await request.json();

    return new Promise((resolve) => {
        User.create(username, email, password, (err, result) => {
            if (err) {
                resolve(
                    NextResponse.json({ message: 'Error registering user', error: err }, { status: 500 })
                );
            } else {
                resolve(
                    NextResponse.json({ message: 'User registered successfully' }, { status: 200 })
                );
            }
        });
    });
}
