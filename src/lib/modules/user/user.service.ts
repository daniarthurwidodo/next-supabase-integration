import { createClient } from '@/utils/supabase/browserClient';
import { User, CreateUserInput, UpdateUserInput } from './user.types';

export class UserService {
  private supabaseClient;

  constructor() {
    this.supabaseClient = createClient();
  }

  /**
   * Get all users with pagination and search
   */
  async getAllUsers(page: number = 1, limit: number = 10, search: string = '') {
    try {
      const response = await fetch(`/api/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      
      if (!response.ok) {
        return { data: null, error: 'Failed to fetch users', count: 0, totalPages: 0 };
      }
      
      const result = await response.json();
      
      return { 
        data: result.users as User[] | null, 
        error: null, 
        count: result.total || 0,
        totalPages: result.totalPages || 0
      };
    } catch (error) {
      return { data: null, error: 'Failed to fetch users', count: 0, totalPages: 0 };
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<{ data: User | null; error: any }> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    // Handle case when user is not found
    if (error && error.code === 'PGRST116') {
      // This is the "not found" error from Supabase
      return { data: null, error: null };
    }

    return { data: data as User | null, error };
  }

  /**
   * Create a new user
   */
  async createUser(userData: CreateUserInput): Promise<{ data: User | null; error: any }> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .insert([
        {
          full_name: userData.full_name,
          email: userData.email,
          avatar_url: userData.avatar_url || null,
        },
      ])
      .select()
      .single();

    return { data: data as User | null, error };
  }

  /**
   * Update user
   */
  async updateUser(
    id: string,
    userData: UpdateUserInput
  ): Promise<{ data: User | null; error: any }> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .update({
        ...userData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .maybeSingle();

    // Handle case when user is not found
    if (error && error.code === 'PGRST116') {
      return { data: null, error: { message: 'User not found', code: 'NOT_FOUND' } };
    }

    return { data: data as User | null, error };
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<{ data: User | null; error: any }> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .delete()
      .eq('id', id)
      .select()
      .single();

    return { data: data as User | null, error };
  }
}