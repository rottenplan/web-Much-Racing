'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
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
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Registration failed');
                setLoading(false);
            } else {
                // Redirect to login on success
                router.push('/login?registered=true');
            }
        } catch (err) {
            console.error('Registration error:', err);
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
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>Create Account</h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Join the race</p>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength={3}
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
                            minLength={6}
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
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--muted-foreground)' }}>Already have an account? </span>
                    <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
