import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, AuthContextType, LoginCredentials, RegisterData, User, mockUsers, initialAuthState } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialAuthState);

  // Initialize auth state
  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem('@user');
      const tokenJson = await AsyncStorage.getItem('@token');
      if (userJson && tokenJson) {
        setState({
          user: JSON.parse(userJson),
          token: JSON.parse(tokenJson),
          isLoading: false,
          error: null,
        });
      } else {
        setState(initialAuthState);
      }
    } catch (error) {
      setState({ ...initialAuthState, error: 'Failed to load user' });
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState({ ...initialAuthState, isLoading: true });
      
      // Find user in mock data
      const mockUser = mockUsers.find(
        user => user.email === credentials.email && user.password === credentials.password
      );

      if (!mockUser) {
        throw new Error('Invalid credentials');
      }

      // Create a user object without the password
      const { password, ...userWithoutPassword } = mockUser;
      const token = `mock_token_${Date.now()}`;

      await AsyncStorage.setItem('@user', JSON.stringify(userWithoutPassword));
      await AsyncStorage.setItem('@token', JSON.stringify(token));

      setState({
        user: userWithoutPassword,
        token,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...initialAuthState,
        error: error instanceof Error ? error.message : 'Login failed. Please try again.',
      });
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setState({ ...initialAuthState, isLoading: true });
      
      // Check if email already exists
      if (mockUsers.some(user => user.email === data.email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser: User = {
        id: `M${Date.now()}`,
        email: data.email,
        name: data.name,
        role: 'member',
        phoneNumber: data.phoneNumber,
        address: data.address,
        createdAt: new Date().toISOString(),
        memberNumber: `2024${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      };

      const token = `mock_token_${Date.now()}`;

      await AsyncStorage.setItem('@user', JSON.stringify(newUser));
      await AsyncStorage.setItem('@token', JSON.stringify(token));

      setState({
        user: newUser,
        token,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...initialAuthState,
        error: error instanceof Error ? error.message : 'Registration failed. Please try again.',
      });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('@user');
      await AsyncStorage.removeItem('@token');
      setState(initialAuthState);
    } catch (error) {
      setState({
        ...initialAuthState,
        error: 'Logout failed. Please try again.',
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
