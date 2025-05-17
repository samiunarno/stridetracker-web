import { Activity } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-pulse-slow">
          <Activity className="h-12 w-12 text-primary-600 mx-auto" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Loading...</h2>
        <p className="mt-2 text-gray-500">Preparing your running experience</p>
      </div>
    </div>
  );
};

export default LoadingScreen;