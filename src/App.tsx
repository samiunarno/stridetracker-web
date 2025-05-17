import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const UserDashboard = lazy(() => import('./pages/dashboard/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));
const UserProfile = lazy(() => import('./pages/profile/UserProfile'));
const TrainingPlan = lazy(() => import('./pages/training/TrainingPlan'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: JSX.Element, 
  requiredRole?: 'user' | 'admin' 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Protected user routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="user">
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/training-plan" 
                  element={
                    <ProtectedRoute>
                      <TrainingPlan />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;