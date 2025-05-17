import { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { useApp } from '../../contexts/AppContext';
import DayPlan from '../../components/training/DayPlan';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { RefreshCw, Calendar, Save, Download } from 'lucide-react';

const TrainingPlan = () => {
  const { trainingPlan, isLoading, refreshPlan } = useApp();
  const [currentDate] = useState(new Date());
  
  // Get the start of the current week (Monday)
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Generate an array of 7 days starting from the week start
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i);
    return format(date, 'yyyy-MM-dd');
  });
  
  const handleExportPlan = () => {
    // In a real app, this would generate a PDF or export to calendar
    alert('Plan exported successfully!');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Training Plan</h1>
          <p className="text-gray-600 mt-1">
            Week of {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline"
            leftIcon={<Download className="h-5 w-5" />}
            onClick={handleExportPlan}
          >
            Export Plan
          </Button>
          
          <Button 
            variant="primary"
            leftIcon={<RefreshCw className="h-5 w-5" />}
            isLoading={isLoading}
            onClick={refreshPlan}
          >
            {isLoading ? 'Generating...' : 'Refresh Plan'}
          </Button>
        </div>
      </div>
      
      {/* Training Overview */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">This Week's Focus</h2>
              <p className="max-w-3xl">
                {trainingPlan?.weekFocus || 
                  "Building your aerobic base with moderate intensity runs. Focus on maintaining good form and consistency throughout each session. Include at least one day of complete rest for recovery."}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Calendar className="h-10 w-10 text-primary-100" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Weekly Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        <Card padding="md" className="text-center">
          <p className="text-sm text-gray-500 mb-1">Weekly Distance</p>
          <p className="text-2xl font-semibold">32.5 km</p>
        </Card>
        
        <Card padding="md" className="text-center">
          <p className="text-sm text-gray-500 mb-1">Running Days</p>
          <p className="text-2xl font-semibold">5</p>
        </Card>
        
        <Card padding="md" className="text-center">
          <p className="text-sm text-gray-500 mb-1">Rest Days</p>
          <p className="text-2xl font-semibold">2</p>
        </Card>
        
        <Card padding="md" className="text-center">
          <p className="text-sm text-gray-500 mb-1">Avg. Duration</p>
          <p className="text-2xl font-semibold">45 min</p>
        </Card>
      </div>
      
      {/* Daily Plans */}
      <div className="space-y-4">
        {weekDays.map(date => {
          // Get activities for this day
          const dayActivities = trainingPlan?.activities.filter(
            activity => format(new Date(activity.date), 'yyyy-MM-dd') === date
          ) || [];
          
          // Get meals for this day
          const dayMeals = trainingPlan?.meals.filter(
            meal => format(new Date(meal.date), 'yyyy-MM-dd') === date
          ) || [];
          
          return (
            <DayPlan 
              key={date} 
              date={date} 
              activities={dayActivities} 
              meals={dayMeals} 
            />
          );
        })}
      </div>
      
      {/* Notes & Tips */}
      <div className="mt-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Training Tips</h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Recovery</h4>
              <p className="text-gray-700 text-sm">
                Make sure to prioritize sleep and hydration. Aim for 7-9 hours of quality sleep each night and drink at least 2-3 liters of water daily, more on intense training days.
              </p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Pacing</h4>
              <p className="text-gray-700 text-sm">
                For easy runs, you should be able to hold a conversation. If you're gasping for breath, slow down. Save the intensity for designated tempo and interval workouts.
              </p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Nutrition</h4>
              <p className="text-gray-700 text-sm">
                Eat a small, carbohydrate-rich meal 1-2 hours before running. For runs longer than 60 minutes, consider bringing energy gels or sports drinks to maintain energy levels.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrainingPlan;