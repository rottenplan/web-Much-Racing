'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react'; // Client side signIn
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Use NextAuth signIn
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setError('Invalid email or password');
                setLoading(false);
            } else {
                router.push('/dashboard');
                // Router push handles redirect, no need to set loading false as page will change
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred');
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--background)',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2rem',
                backgroundColor: 'var(--secondary)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Sign in to access your telemetry</p>
                </div>

                {error && (
                    <div style={{
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        backgroundColor: 'rgba(248, 0, 0, 0.1)',
                        border: '1px solid var(--accent)',
                        color: 'var(--accent)',
                        borderRadius: 'var(--radius)',
                        fontSize: '0.875rem',
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius)',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--input)',
                                color: 'var(--foreground)',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0.75rem',
                            marginTop: '1rem',
                            borderRadius: 'var(--radius)',
                            border: 'none',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--primary-foreground)',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--muted-foreground)' }}>Don't have an account? </span>
                    <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
