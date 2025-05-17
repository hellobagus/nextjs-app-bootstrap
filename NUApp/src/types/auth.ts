export type UserRole = 'member' | 'adminPusat' | 'adminCabang';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cabangId?: string;
  memberNumber?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

// Mock users for testing
export const mockUsers = [
  // Member
  {
    id: 'M001',
    email: 'member@nu.or.id',
    password: 'member123',
    name: 'Ahmad Saputra',
    role: 'member' as UserRole,
    memberNumber: '2024001',
    phoneNumber: '081234567890',
    address: 'Jl. Raya No. 123, Jakarta',
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Admin Pusat
  {
    id: 'AP001',
    email: 'adminpusat@nu.or.id',
    password: 'adminpusat123',
    name: 'H. Muhammad Hasan',
    role: 'adminPusat' as UserRole,
    phoneNumber: '081234567891',
    address: 'Kantor Pusat NU, Jakarta',
    createdAt: '2023-01-01T00:00:00Z',
  },
  // Admin Cabang
  {
    id: 'AC001',
    email: 'admincabang@nu.or.id',
    password: 'admincabang123',
    name: 'Hj. Siti Aminah',
    role: 'adminCabang' as UserRole,
    cabangId: 'CAB001',
    phoneNumber: '081234567892',
    address: 'Kantor Cabang NU Jakarta Selatan',
    createdAt: '2023-06-01T00:00:00Z',
  },
];

// Login credentials for testing
export const testCredentials = {
  member: {
    email: 'member@nu.or.id',
    password: 'member123',
  },
  adminPusat: {
    email: 'adminpusat@nu.or.id',
    password: 'adminpusat123',
  },
  adminCabang: {
    email: 'admincabang@nu.or.id',
    password: 'admincabang123',
  },
};

// Initial auth state
export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};
