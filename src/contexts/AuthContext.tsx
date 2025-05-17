import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for an existing session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll mock successful authentication
      
      // Check for admin credentials
      if (email === 'admin@runnerspro.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin-1',
          email,
          name: 'Admin User',
          role: 'admin',
          subscription: 'premium',
          avatarUrl: 'https://i.pravatar.cc/150?img=68',
          createdAt: new Date().toISOString()
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        navigate('/admin');
        return;
      }
      
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, let any email/password combination work, but with specific validation
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid email or password');
      }
      
      const mockUser: User = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        email,
        name: email.split('@')[0],
        role: 'user',
        subscription: 'free',
        avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate input
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (name.length < 2) {
        throw new Error('Please enter your full name');
      }
      
      // Create a new user
      const newUser: User = {
        id: 'user-' + Math.floor(Math.random() * 1000),
        email,
        name,
        role: 'user',
        subscription: 'free',
        avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        error,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};