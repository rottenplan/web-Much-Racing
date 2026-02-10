import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { z } from 'zod';

const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = registerSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: 'Validation failed', errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { username, email, password } = result.data;

        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email or username already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json(
            { message: 'User registered successfully' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
