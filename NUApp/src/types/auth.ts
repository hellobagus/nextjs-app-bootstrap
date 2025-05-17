export type UserRole = 'member' | 'adminPusat' | 'adminCabang';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  ktpNumber: string;
  kkNumber: string;
}
