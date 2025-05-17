import { useState } from 'react';
import { format } from 'date-fns';
import { Activity } from '../../types/plan';
import Card from '../ui/Card';
import { Calendar, Clock, TrendingUp, Heart, Award } from 'lucide-react';

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityLog = ({ activities }: ActivityLogProps) => {
  const [visibleActivities, setVisibleActivities] = useState(5);
  
  const handleShowMore = () => {
    setVisibleActivities(prev => prev + 5);
  };
  
  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'run':
        return <TrendingUp className="h-4 w-4" />;
      case 'recovery':
        return <Heart className="h-4 w-4" />;
      case 'rest':
        return <Clock className="h-4 w-4" />;
      case 'race':
        return <Award className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
      </div>
      
      <div className="space-y-4">
        {activities.slice(0, visibleActivities).map((activity, i) => (
          <div key={i} className="flex items-start p-3 rounded-lg bg-gray-50">
            <div className={`p-2 rounded-full mr-3 ${
              activity.type === 'Run' 
                ? 'bg-primary-100 text-primary-600' 
                : activity.type === 'Rest' 
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-secondary-100 text-secondary-600'
            }`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <span className="text-xs text-gray-500">
                  {format(new Date(activity.date), 'MMM d')}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              
              {activity.metrics && (
                <div className="flex gap-3 mt-2">
                  {activity.metrics.distance && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">{activity.metrics.distance}</span> km
                    </div>
                  )}
                  {activity.metrics.duration && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">{activity.metrics.duration}</span> min
                    </div>
                  )}
                  {activity.metrics.pace && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">{activity.metrics.pace}</span> /km
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {visibleActivities < activities.length && (
          <div className="text-center pt-2">
            <button
              onClick={handleShowMore}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Show more
            </button>
          </div>
        )}
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No activities recorded yet.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActivityLog;