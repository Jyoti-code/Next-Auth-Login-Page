import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { generateToken, verifyToken } from '../../../../lib/jwt';
import User from '../../../../modal/User';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                return new Promise((resolve, reject) => {
                    User.authenticate(email, password, (err, user) => {
                        if (err || !user) {
                            reject(new Error('Invalid credentials'));
                        } else {
                            const token = generateToken({ id: user.id, email: user.email });
                            resolve({ ...user, token });
                        }
                    });
                });
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.accessToken = user.token; 
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                };
                session.accessToken = token.accessToken; 
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
