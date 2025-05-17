import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Activity, Mail, Lock, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, error, clearError, isAuthenticated, isLoading } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  const validateForm = () => {
    clearError();
    setPasswordError('');
    
    if (password !== passwordConfirm) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await signup(email, password, name);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Activity className="h-12 w-12 text-primary-600 mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="mt-2 text-gray-600">Get started with your personalized running plan</p>
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
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="h-5 w-5 text-gray-400" />}
              required
            />
            
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
              error={passwordError}
              helperText="Must be at least 6 characters"
              required
            />
            
            <Input
              label="Confirm Password"
              type="password"
              id="passwordConfirm"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;