import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Activity, Mail, Lock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, clearError, isAuthenticated, isLoading } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Activity className="h-12 w-12 text-primary-600 mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 flex items-start">
            <div className="flex-1">{error}</div>
            <button 
              onClick={clearError} 
              className="ml-2 text-red-500 hover:text-red-800"
              aria-label="Close error message"
            >
              &times;
            </button>
          </div>
        )}
        
        {/* Demo account notice */}
        <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-6">
          <p className="text-sm">
            <strong>Demo Account:</strong> To see the admin dashboard, use:
            <br />
            Email: <span className="font-medium">admin@runnerspro.com</span>
            <br />
            Password: <span className="font-medium">admin123</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              required
            />
            
            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;