'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result.error) {
            alert(result.error);
        } else {
            const session = await getSession();
            if (session) {
                console.log('Session:', session); 
                localStorage.setItem('token', session.accessToken);
                router.push('/home');
            } else {
                alert('Failed to retrieve session data.');
            }
        }
    };

    const handleLoginRedirect = () => {
        router.push('/signup');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                        <h1 className="mb-4">Login</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <span className="mx-2">or</span>
                        <button type="button" className="btn btn-secondary" onClick={handleLoginRedirect}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
