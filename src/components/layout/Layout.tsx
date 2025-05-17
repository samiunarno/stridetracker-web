import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Check if current route is auth related
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  // Check if current route is dashboard or admin
  const isDashboard = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/admin') || 
                     location.pathname.includes('/training-plan') ||
                     location.pathname.includes('/profile');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className={`flex-grow ${isDashboard ? 'bg-gray-50' : ''}`}>
        {children}
      </main>
      
      {/* Only show footer on non-dashboard pages */}
      {!isDashboard && <Footer />}
    </div>
  );
};

export default Layout;