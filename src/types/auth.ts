export type UserRole = 'client' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
} 