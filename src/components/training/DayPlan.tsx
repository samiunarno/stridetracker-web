import { useState } from 'react';
import { format } from 'date-fns';
import { Activity, Meal } from '../../types/plan';
import Card from '../ui/Card';
import { ChevronDown, ChevronUp, TrendingUp, Coffee, Utensils, Wine } from 'lucide-react';

interface DayPlanProps {
  date: string;
  activities: Activity[];
  meals: Meal[];
}

const DayPlan = ({ date, activities, meals }: DayPlanProps) => {
  const [expanded, setExpanded] = useState(true);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Format the date
  const formattedDate = format(new Date(date), 'EEEE, MMMM d');
  const dayOfWeek = format(new Date(date), 'EEE');
  
  // Check if this date is today
  const isToday = format(new Date(), 'yyyy-MM-dd') === format(new Date(date), 'yyyy-MM-dd');
  
  return (
    <Card className={`border-l-4 ${isToday ? 'border-l-primary-500' : 'border-l-gray-200'}`}>
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
            isToday ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
          }`}>
            <span className="text-sm font-medium">{dayOfWeek}</span>
          </div>
          <h3 className={`font-medium ${isToday ? 'text-primary-700' : 'text-gray-800'}`}>
            {formattedDate}
            {isToday && <span className="ml-2 text-xs bg-primary-100 text-primary-700 py-0.5 px-2 rounded-full">Today</span>}
          </h3>
        </div>
        
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {expanded && (
        <div className="mt-4 space-y-6">
          {/* Activities */}
          {activities.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Training</h4>
              <div className="space-y-3">
                {activities.map((activity, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-full mr-2 ${
                        activity.type === 'Run' 
                          ? 'bg-primary-100 text-primary-600' 
                          : activity.type === 'Rest' 
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-green-100 text-green-600'
                      }`}>
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <h5 className="font-medium">{activity.title}</h5>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                    
                    {activity.metrics && (
                      <div className="flex flex-wrap gap-3">
                        {activity.metrics.distance && (
                          <div className="bg-white px-2 py-1 rounded border border-gray-200 text-xs">
                            <span className="font-medium">{activity.metrics.distance}</span> km
                          </div>
                        )}
                        {activity.metrics.duration && (
                          <div className="bg-white px-2 py-1 rounded border border-gray-200 text-xs">
                            <span className="font-medium">{activity.metrics.duration}</span> min
                          </div>
                        )}
                        {activity.metrics.pace && (
                          <div className="bg-white px-2 py-1 rounded border border-gray-200 text-xs">
                            <span className="font-medium">{activity.metrics.pace}</span> /km
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Meals */}
          {meals.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Nutrition</h4>
              <div className="space-y-3">
                {meals.map((meal, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-full mr-2 ${
                        meal.type === 'Breakfast'
                          ? 'bg-accent-100 text-accent-600'
                          : meal.type === 'Lunch'
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-secondary-100 text-secondary-600'
                      }`}>
                        {meal.type === 'Breakfast' ? (
                          <Coffee className="h-4 w-4" />
                        ) : meal.type === 'Lunch' ? (
                          <Utensils className="h-4 w-4" />
                        ) : (
                          <Wine className="h-4 w-4" />
                        )}
                      </div>
                      <h5 className="font-medium">{meal.type}</h5>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{meal.description}</p>
                    
                    {meal.nutritionInfo && (
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white px-2 py-1 rounded border border-gray-200 text-center text-xs">
                          <span className="block text-gray-500">Calories</span>
                          <span className="font-medium">{meal.nutritionInfo.calories}</span>
                        </div>
                        <div className="bg-white px-2 py-1 rounded border border-gray-200 text-center text-xs">
                          <span className="block text-gray-500">Protein</span>
                          <span className="font-medium">{meal.nutritionInfo.protein}g</span>
                        </div>
                        <div className="bg-white px-2 py-1 rounded border border-gray-200 text-center text-xs">
                          <span className="block text-gray-500">Carbs</span>
                          <span className="font-medium">{meal.nutritionInfo.carbs}g</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activities.length === 0 && meals.length === 0 && (
            <p className="text-gray-500 text-center py-4">No activities or meals planned for this day.</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default DayPlan;