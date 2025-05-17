import { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';

interface SyncEvent {
  id: string;
  service: string;
  status: 'success' | 'error';
  message: string;
  timestamp: string;
  details?: string;
}

interface SyncStatusProps {
  events: SyncEvent[];
}

const SyncStatus = ({ events }: SyncStatusProps) => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const statusCounts = useMemo(() => {
    return {
      success: events.filter(e => e.status === 'success').length,
      error: events.filter(e => e.status === 'error').length,
      total: events.length
    };
  }, [events]);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };
  
  const toggleEventDetails = (id: string) => {
    if (expandedEvent === id) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(id);
    }
  };
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Sync Status</h3>
        
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-semibold">{statusCounts.total}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <p className="text-sm text-green-600">Success</p>
          <p className="text-xl font-semibold text-green-700">{statusCounts.success}</p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <p className="text-sm text-red-600">Error</p>
          <p className="text-xl font-semibold text-red-700">{statusCounts.error}</p>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {events.map(event => (
          <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleEventDetails(event.id)}
            >
              <div className="flex items-center">
                {event.status === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <div>
                  <p className="text-sm font-medium">{event.service}</p>
                  <p className="text-xs text-gray-500">{event.timestamp}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                  event.status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {event.status}
                </span>
                
                {expandedEvent === event.id ? (
                  <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                )}
              </div>
            </div>
            
            {expandedEvent === event.id && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm">{event.message}</p>
                {event.details && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono overflow-x-auto">
                    {event.details}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {events.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No sync events recorded.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SyncStatus;