import { useState } from 'react';
import Button from '../ui/Button';
import { Link as LinkIcon, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface ConnectAppButtonProps {
  service: 'strava' | 'garmin';
  color: string;
  bgColor: string;
  icon: JSX.Element;
  name: string;
}

const ConnectAppButton = ({ service, color, bgColor, icon, name }: ConnectAppButtonProps) => {
  const { connectedApps, toggleAppConnection } = useApp();
  const [syncing, setSyncing] = useState(false);
  
  const isConnected = connectedApps[service];
  
  const handleConnect = () => {
    // In a real app, this would initiate OAuth
    toggleAppConnection(service);
  };
  
  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSyncing(false);
  };
  
  return (
    <div className={`p-4 rounded-lg ${bgColor}`}>
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <h3 className="ml-3 font-medium">{name}</h3>
      </div>
      
      {isConnected ? (
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CheckCircle2 className={`h-4 w-4 mr-2 ${color}`} />
            <span>Connected</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={syncing ? null : <RefreshCw className="h-4 w-4" />}
            isLoading={syncing}
            onClick={handleSync}
          >
            {syncing ? 'Syncing...' : 'Sync Data'}
          </Button>
        </div>
      ) : (
        <Button
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={<LinkIcon className="h-4 w-4" />}
          onClick={handleConnect}
        >
          Connect {name}
        </Button>
      )}
    </div>
  );
};

export default ConnectAppButton;