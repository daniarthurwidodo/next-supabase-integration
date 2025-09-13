import { NextResponse } from 'next/server';
import { UserController } from '@/lib/modules/user/user.controller';
import { UpdateUserInput } from '@/lib/modules/user/user.types';

// GET /api/users/[id] - Get a single user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const userController = new UserController();
    const result = await userController.getUserById(id);

    if (result.error) {
      if (result.error === 'User not found') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      if (result.error === 'Invalid user ID format') {
        return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
      }
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    if (!result.data) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/[id] - Update a user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get the request body
    const userData: UpdateUserInput = await request.json();

    const userController = new UserController();
    const result = await userController.updateUser(id, userData);

    if (result.error) {
      if (result.error === 'User not found') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      if (result.error === 'User ID is required') {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const userController = new UserController();
    const result = await userController.deleteUser(id);

    if (result.error) {
      if (result.error === 'User not found') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      if (result.error === 'User ID is required') {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}