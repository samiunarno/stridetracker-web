import { useState, useEffect } from 'react';
import { RefreshCw, Users, Database, Activity, Calendar } from 'lucide-react';
import Card from '../ui/Card';

interface SystemStatsProps {
  totalUsers: number;
  activePlans: number;
  syncedActivities: number;
  databaseSize: string;
}

const SystemStats = ({ totalUsers, activePlans, syncedActivities, databaseSize }: SystemStatsProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setRefreshing(false);
  };
  
  // Format time ago
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };
  
  // Update "time ago" every minute
  useEffect(() => {
    const timer = setInterval(() => {
      // Force re-render to update time ago
      setLastUpdated(prev => new Date(prev.getTime()));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">System Overview</h3>
        
        <div className="flex items-center">
          <p className="text-xs text-gray-500 mr-2">
            Updated {getTimeAgo(lastUpdated)}
          </p>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="text-sm font-medium text-blue-700">Total Users</h4>
          </div>
          <p className="text-2xl font-semibold text-blue-800">{totalUsers}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-green-600 mr-2" />
            <h4 className="text-sm font-medium text-green-700">Active Plans</h4>
          </div>
          <p className="text-2xl font-semibold text-green-800">{activePlans}</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Activity className="h-5 w-5 text-purple-600 mr-2" />
            <h4 className="text-sm font-medium text-purple-700">Synced Activities</h4>
          </div>
          <p className="text-2xl font-semibold text-purple-800">{syncedActivities}</p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg">
          <div className="flex items-center mb-2">
            <Database className="h-5 w-5 text-amber-600 mr-2" />
            <h4 className="text-sm font-medium text-amber-700">Database Size</h4>
          </div>
          <p className="text-2xl font-semibold text-amber-800">{databaseSize}</p>
        </div>
      </div>
    </Card>
  );
};

export default SystemStats;