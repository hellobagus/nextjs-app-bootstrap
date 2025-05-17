import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, LoginCredentials, RegisterData, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Initialize auth state
  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem('@user');
      if (userJson) {
        setState({
          user: JSON.parse(userJson),
          isLoading: false,
          error: null,
        });
      } else {
        setState({ user: null, isLoading: false, error: null });
      }
    } catch (error) {
      setState({ user: null, isLoading: false, error: 'Failed to load user' });
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        role: credentials.role,
        name: 'User Name', // This would come from the API
      };

      await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
      setState({ user: mockUser, isLoading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed. Please try again.',
      }));
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // TODO: Replace with actual API call
      const mockUser: User = {
        id: '1',
        email: data.email,
        role: 'member',
        name: data.name,
      };

      await AsyncStorage.setItem('@user', JSON.stringify(mockUser));
      setState({ user: mockUser, isLoading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed. Please try again.',
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('@user');
      setState({ user: null, isLoading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Logout failed. Please try again.',
      }));
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
