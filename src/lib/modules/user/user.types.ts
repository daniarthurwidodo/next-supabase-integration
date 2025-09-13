export interface User {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  avatar_url: string | null;
  email: string;
}

export interface CreateUserInput {
  full_name: string;
  email: string;
  avatar_url?: string;
}

export interface UpdateUserInput {
  full_name?: string;
  avatar_url?: string;
}