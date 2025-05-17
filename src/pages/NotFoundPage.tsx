import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Activity, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <Activity className="w-20 h-20 text-primary-600 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on the right track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button 
              variant="primary"
              leftIcon={<Home className="h-5 w-5" />}
            >
              Go Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;