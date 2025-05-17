import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { 
  CheckCircle2, XCircle, RefreshCw, Link as LinkIcon
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ConnectedApps = () => {
  const { connectedApps, toggleAppConnection } = useApp();
  const [syncing, setSyncing] = useState<{ strava: boolean; garmin: boolean }>({
    strava: false,
    garmin: false
  });
  
  const handleConnect = (app: 'strava' | 'garmin') => {
    // In a real app, this would initiate OAuth flow
    toggleAppConnection(app);
  };
  
  const handleSync = async (app: 'strava' | 'garmin') => {
    setSyncing(prev => ({ ...prev, [app]: true }));
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSyncing(prev => ({ ...prev, [app]: false }));
  };
  
  return (
    <Card className="h-full">
      <h3 className="text-lg font-semibold mb-5">Connected Apps</h3>
      
      <div className="space-y-5">
        {/* Strava */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.087 4.116z" fill="currentColor" />
                <path d="M10.232 13.828l3.066 6.173 3.066-6.173H10.232zM18.306 0l-5.155 10.172h3.066l2.089-4.116 2.089 4.116h3.065L18.306 0z" fill="currentColor" fillOpacity="0.5" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="font-medium">Strava</h4>
              <p className="text-xs text-gray-500">
                {connectedApps.strava 
                  ? 'Connected' 
                  : 'Not connected'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-3">
              {connectedApps.strava 
                ? <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                : <XCircle className="h-5 w-5 text-red-500" />
              }
            </div>
            
            {connectedApps.strava ? (
              <Button 
                variant="outline" 
                size="sm"
                isLoading={syncing.strava}
                leftIcon={syncing.strava ? null : <RefreshCw className="h-4 w-4" />}
                onClick={() => handleSync('strava')}
              >
                {syncing.strava ? 'Syncing...' : 'Sync'}
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                leftIcon={<LinkIcon className="h-4 w-4" />}
                onClick={() => handleConnect('strava')}
              >
                Connect
              </Button>
            )}
          </div>
        </div>
        
        {/* Garmin */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="currentColor" fillOpacity="0.1" />
                <path d="M19.47 13.01c.304-.58.483-1.246.483-1.936 0-2.189-1.633-4.048-3.822-4.048-2.19 0-3.822 1.81-3.822 4 0 2.188 1.633 4.047 3.822 4.047.725 0 1.45-.198 2.001-.493l1.586 1.586 1.104-1.104-1.352-1.352v-1.7zm-3.34.595c-1.398 0-2.483-1.085-2.483-2.483 0-1.397 1.133-2.53 2.53-2.53 1.398 0 2.483 1.133 2.483 2.53s-1.133 2.483-2.53 2.483z" fill="currentColor" />
                <path d="M11.694 16.638c-2.66 0-4.822-2.207-4.822-4.869 0-2.661 2.162-4.868 4.822-4.868.543 0 1.035.087 1.53.262.242-.543.629-1.037 1.08-1.43-.789-.319-1.673-.493-2.61-.493-3.796 0-6.885 2.926-6.885 6.53 0 3.602 3.09 6.529 6.885 6.529.937 0 1.821-.175 2.61-.493-.451-.392-.838-.887-1.08-1.43-.495.176-.987.262-1.53.262z" fill="currentColor" />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="font-medium">Garmin</h4>
              <p className="text-xs text-gray-500">
                {connectedApps.garmin 
                  ? 'Connected' 
                  : 'Not connected'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-3">
              {connectedApps.garmin 
                ? <CheckCircle2 className="h-5 w-5 text-green-500" /> 
                : <XCircle className="h-5 w-5 text-red-500" />
              }
            </div>
            
            {connectedApps.garmin ? (
              <Button 
                variant="outline" 
                size="sm"
                isLoading={syncing.garmin}
                leftIcon={syncing.garmin ? null : <RefreshCw className="h-4 w-4" />}
                onClick={() => handleSync('garmin')}
              >
                {syncing.garmin ? 'Syncing...' : 'Sync'}
              </Button>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                leftIcon={<LinkIcon className="h-4 w-4" />}
                onClick={() => handleConnect('garmin')}
              >
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-gray-500">
        <p>Connect your fitness apps to automatically sync your activity data.</p>
      </div>
    </Card>
  );
};

export default ConnectedApps;