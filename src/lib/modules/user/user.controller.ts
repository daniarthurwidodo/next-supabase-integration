import { UserService } from './user.service';
import { User, CreateUserInput, UpdateUserInput } from './user.types';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get all users with pagination and search
   */
  async getAllUsers(page: number = 1, limit: number = 10, search: string = '') {
    try {
      const { data, error, count, totalPages } = await this.userService.getAllUsers(page, limit, search);
      
      if (error) {
        return { data: null, error: error, count: 0, totalPages: 0 };
      }
      
      return { data, error: null, count: count || 0, totalPages: totalPages || 0 };
    } catch (error) {
      return { data: null, error: 'An unexpected error occurred', count: 0, totalPages: 0 };
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string) {
    try {
      if (!id) {
        return { data: null, error: 'User ID is required' };
      }

      // Validate the UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(id)) {
        return { data: null, error: 'Invalid user ID format' };
      }

      const { data, error } = await this.userService.getUserById(id);
      
      if (error) {
        return { data: null, error: error.message || 'Failed to fetch user' };
      }
      
      if (!data) {
        return { data: null, error: 'User not found' };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Create a new user
   */
  async createUser(userData: CreateUserInput) {
    try {
      // Validate required fields
      if (!userData.full_name || !userData.email) {
        return { data: null, error: 'Full name and email are required' };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return { data: null, error: 'Please enter a valid email address' };
      }

      const { data, error } = await this.userService.createUser(userData);
      
      if (error) {
        return { data: null, error: error.message || 'Failed to create user' };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Update user
   */
  async updateUser(id: string, userData: UpdateUserInput) {
    try {
      if (!id) {
        return { data: null, error: 'User ID is required' };
      }

      // Check if user exists
      const { data: existingUser, error: fetchError } = await this.userService.getUserById(id);
      
      if (fetchError) {
        return { data: null, error: fetchError.message || 'Failed to fetch user' };
      }
      
      if (!existingUser) {
        return { data: null, error: 'User not found' };
      }

      const { data, error } = await this.userService.updateUser(id, userData);
      
      if (error) {
        return { data: null, error: error.message || 'Failed to update user' };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Delete user
   */
  async deleteUser(id: string) {
    try {
      if (!id) {
        return { data: null, error: 'User ID is required' };
      }

      // Check if user exists
      const { data: existingUser, error: fetchError } = await this.userService.getUserById(id);
      
      if (fetchError) {
        return { data: null, error: fetchError.message || 'Failed to fetch user' };
      }
      
      if (!existingUser) {
        return { data: null, error: 'User not found' };
      }

      const { data, error } = await this.userService.deleteUser(id);
      
      if (error) {
        return { data: null, error: error.message || 'Failed to delete user' };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'An unexpected error occurred' };
    }
  }
}