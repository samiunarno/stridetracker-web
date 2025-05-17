import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, User, Settings, LogOut,
  BarChart2, Activity, Calendar, Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current route is auth related
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  // Check if current route is dashboard or admin
  const isDashboard = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/admin') || 
                     location.pathname.includes('/training-plan') ||
                     location.pathname.includes('/profile');

  // Handle scroll events to change navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isDashboard || isAuthPage 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Activity className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">RunnersPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {!isDashboard && (
              <>
                <Link to="/" className={`text-sm font-medium ${
                  isScrolled || isAuthPage ? 'text-gray-700 hover:text-primary-600' : 'text-gray-800 hover:text-gray-900'
                }`}>
                  Home
                </Link>
                <Link to="/features" className={`text-sm font-medium ${
                  isScrolled || isAuthPage ? 'text-gray-700 hover:text-primary-600' : 'text-gray-800 hover:text-gray-900'
                }`}>
                  Features
                </Link>
                <Link to="/pricing" className={`text-sm font-medium ${
                  isScrolled || isAuthPage ? 'text-gray-700 hover:text-primary-600' : 'text-gray-800 hover:text-gray-900'
                }`}>
                  Pricing
                </Link>
                <Link to="/about" className={`text-sm font-medium ${
                  isScrolled || isAuthPage ? 'text-gray-700 hover:text-primary-600' : 'text-gray-800 hover:text-gray-900'
                }`}>
                  About
                </Link>
              </>
            )}

            {isDashboard && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium flex items-center ${
                    location.pathname === '/dashboard' 
                      ? 'text-primary-600' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <BarChart2 className="w-4 h-4 mr-1" />
                  Dashboard
                </Link>
                <Link 
                  to="/training-plan" 
                  className={`text-sm font-medium flex items-center ${
                    location.pathname === '/training-plan' 
                      ? 'text-primary-600' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Training Plan
                </Link>
                <Link 
                  to="/profile" 
                  className={`text-sm font-medium flex items-center ${
                    location.pathname === '/profile' 
                      ? 'text-primary-600' 
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`text-sm font-medium flex items-center ${
                      location.pathname === '/admin' 
                        ? 'text-primary-600' 
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Authentication Buttons or User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className={`px-5 py-2 rounded-md text-sm font-medium ${
                    isScrolled || isAuthPage
                      ? 'text-gray-700 hover:text-primary-600'
                      : 'text-gray-800 hover:bg-white/10 hover:text-gray-900'
                  }`}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition duration-150"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  <img
                    src={user.avatarUrl || 'https://i.pravatar.cc/150?img=68'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="ml-2 font-medium text-sm hidden lg:block">
                    {user.name}
                  </span>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Your Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 w-full shadow-md py-3 px-4 animate-fade-in">
          <div className="space-y-3">
            {!isDashboard ? (
              <>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/features"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  Features
                </Link>
                <Link
                  to="/pricing"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  About
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-primary-600 font-medium flex items-center"
                >
                  <BarChart2 className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/training-plan"
                  className="block text-gray-700 hover:text-primary-600 font-medium flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Training Plan
                </Link>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-primary-600 font-medium flex items-center"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block text-gray-700 hover:text-primary-600 font-medium flex items-center"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Admin
                  </Link>
                )}
              </>
            )}

            {!isAuthenticated ? (
              <div className="pt-4 space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-5 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="pt-4 space-y-3">
                <div className="flex items-center pb-3 border-b border-gray-200">
                  <img
                    src={user.avatarUrl || 'https://i.pravatar.cc/150?img=68'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;