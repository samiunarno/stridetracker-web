import { useState } from 'react';
import { Meal } from '../../types/plan';
import Card from '../ui/Card';
import { ChevronRight, ChevronLeft, Coffee, Utensils, Wine } from 'lucide-react';

interface DietPlanProps {
  meals: Meal[];
}

const DietPlan = ({ meals }: DietPlanProps) => {
  const [currentDay, setCurrentDay] = useState(0);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const filteredMeals = meals.filter(meal => 
    new Date(meal.date).getDay() === (currentDay === 6 ? 0 : currentDay + 1) // Adjust for Sunday
  );
  
  const nextDay = () => {
    setCurrentDay(current => (current + 1) % 7);
  };
  
  const prevDay = () => {
    setCurrentDay(current => (current - 1 + 7) % 7);
  };
  
  const getMealTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'lunch':
        return <Utensils className="h-4 w-4" />;
      case 'dinner':
        return <Wine className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Nutrition Plan</h3>
        
        <div className="flex items-center">
          <button 
            onClick={prevDay}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <span className="mx-2 text-sm font-medium">
            {daysOfWeek[currentDay]}
          </span>
          
          <button 
            onClick={nextDay}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Next day"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal, i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  meal.type === 'Breakfast'
                    ? 'bg-accent-100 text-accent-600'
                    : meal.type === 'Lunch'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-secondary-100 text-secondary-600'
                }`}>
                  {getMealTypeIcon(meal.type)}
                </div>
                <h4 className="font-medium text-gray-900">{meal.type}</h4>
              </div>
              
              <p className="mt-2 text-sm text-gray-700">{meal.description}</p>
              
              {meal.nutritionInfo && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center p-1 bg-white rounded border border-gray-200">
                    <p className="text-xs text-gray-500">Calories</p>
                    <p className="font-medium text-sm">{meal.nutritionInfo.calories}</p>
                  </div>
                  <div className="text-center p-1 bg-white rounded border border-gray-200">
                    <p className="text-xs text-gray-500">Protein</p>
                    <p className="font-medium text-sm">{meal.nutritionInfo.protein}g</p>
                  </div>
                  <div className="text-center p-1 bg-white rounded border border-gray-200">
                    <p className="text-xs text-gray-500">Carbs</p>
                    <p className="font-medium text-sm">{meal.nutritionInfo.carbs}g</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No meals planned for this day.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DietPlan;