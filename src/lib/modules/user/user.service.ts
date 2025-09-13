import { createClient } from '@/utils/supabase/browserClient';
import { createAdminClient } from '@/utils/supabase/adminClient';
import { User, CreateUserInput, UpdateUserInput } from './user.types';

export class UserService {
  private supabaseClient;
  private supabaseAdminClient;

  constructor() {
    this.supabaseClient = createClient();
    this.supabaseAdminClient = createAdminClient();
  }

  /**
   * Get all users with pagination and search
   */
  async getAllUsers(page: number = 1, limit: number = 10, search: string = '') {
    try {
      // Build the query
      let query = this.supabaseAdminClient
        .from('users')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Apply search filter if provided
      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      query = query.range(startIndex, startIndex + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        return { data: null, error: error.message, count: 0, totalPages: 0 };
      }

      return { 
        data: data as User[] | null, 
        error: null, 
        count: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      };
    } catch (error) {
      return { data: null, error: 'Failed to fetch users', count: 0, totalPages: 0 };
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<{ data: User | null; error: any }> {
    const { data, error } = await this.supabaseAdminClient
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
    const { data, error } = await this.supabaseAdminClient
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
    const { data, error } = await this.supabaseAdminClient
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
    const { data, error } = await this.supabaseAdminClient
      .from('users')
      .delete()
      .eq('id', id)
      .select()
      .single();

    return { data: data as User | null, error };
  }
}