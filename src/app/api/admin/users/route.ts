import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET /api/admin/users - List all users
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const role = searchParams.get('role') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0

    const where: any = {}
    if (role) where.role = role

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          role: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          subscription: true,
          preferences: true,
          _count: { select: { comments: true, mediaUploads: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({ users, total, limit, offset })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

// POST /api/admin/users - Create user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(1),
      phone: z.string().optional(),
      role: z.enum(['READER', 'EDITOR', 'ADMIN', 'SUPERADMIN']).optional(),
    })

    const data = userSchema.parse(body)
    
    // Hash password
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash(data.password, 12)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone,
        role: data.role || 'READER',
        emailVerified: false,
        preferences: {
          create: {
            topics: [],
            newsletter: false,
            notifications: true,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

// PUT /api/admin/users - Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...updateData } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const userUpdateSchema = z.object({
      name: z.string().min(1).optional(),
      phone: z.string().optional(),
      role: z.enum(['READER', 'EDITOR', 'ADMIN', 'SUPERADMIN']).optional(),
      emailVerified: z.boolean().optional(),
    })

    const data = userUpdateSchema.parse(updateData)

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        emailVerified: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

// DELETE /api/admin/users - Delete user
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id: userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}