import { Plan, Activity, Meal } from '../types/plan';
import { addDays, format } from 'date-fns';

// Generate mock training plan data
export const generateMockTrainingPlan = (): Plan => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Start from Monday
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6); // End on Sunday
  
  const activities: Activity[] = [];
  const meals: Meal[] = [];
  
  // Generate activities for the week
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    const dateString = format(currentDate, 'yyyy-MM-dd');
    const dayOfWeek = format(currentDate, 'EEEE');
    
    // Create activities based on day of week
    if (dayOfWeek === 'Monday') {
      activities.push({
        title: 'Easy Run',
        description: 'Start the week with an easy run to recover from any weekend exertion.',
        type: 'Run',
        date: dateString,
        metrics: {
          distance: '5',
          duration: '30',
          pace: '6:00'
        }
      });
    } else if (dayOfWeek === 'Tuesday') {
      activities.push({
        title: 'Speed Work',
        description: '8x400m repeats with 200m easy jog recovery between each.',
        type: 'Run',
        date: dateString,
        metrics: {
          distance: '8',
          duration: '45',
          pace: '4:45'
        }
      });
    } else if (dayOfWeek === 'Wednesday') {
      activities.push({
        title: 'Recovery',
        description: 'Active recovery day with light stretching or yoga.',
        type: 'Recovery',
        date: dateString,
        metrics: {
          duration: '30'
        }
      });
    } else if (dayOfWeek === 'Thursday') {
      activities.push({
        title: 'Tempo Run',
        description: '15 min easy warm-up, 20 min at tempo pace, 10 min cool-down.',
        type: 'Run',
        date: dateString,
        metrics: {
          distance: '7.5',
          duration: '45',
          pace: '5:00'
        }
      });
    } else if (dayOfWeek === 'Friday') {
      activities.push({
        title: 'Rest Day',
        description: 'Complete rest to recover and prepare for the weekend.',
        type: 'Rest',
        date: dateString
      });
    } else if (dayOfWeek === 'Saturday') {
      activities.push({
        title: 'Long Run',
        description: 'Build endurance with a longer, slower run. Focus on distance, not pace.',
        type: 'Run',
        date: dateString,
        metrics: {
          distance: '15',
          duration: '90',
          pace: '6:00'
        }
      });
    } else if (dayOfWeek === 'Sunday') {
      activities.push({
        title: 'Cross Training',
        description: 'Low-impact cross training such as cycling or swimming.',
        type: 'Cross Training',
        date: dateString,
        metrics: {
          duration: '45'
        }
      });
    }
    
    // Add meals for each day
    meals.push(
      {
        type: 'Breakfast',
        description: generateMockMeal('Breakfast', dayOfWeek),
        date: dateString,
        nutritionInfo: {
          calories: String(Math.floor(Math.random() * 200) + 400),
          protein: String(Math.floor(Math.random() * 10) + 15),
          carbs: String(Math.floor(Math.random() * 20) + 40),
          fat: String(Math.floor(Math.random() * 10) + 10)
        }
      },
      {
        type: 'Lunch',
        description: generateMockMeal('Lunch', dayOfWeek),
        date: dateString,
        nutritionInfo: {
          calories: String(Math.floor(Math.random() * 300) + 500),
          protein: String(Math.floor(Math.random() * 15) + 25),
          carbs: String(Math.floor(Math.random() * 30) + 50),
          fat: String(Math.floor(Math.random() * 15) + 15)
        }
      },
      {
        type: 'Dinner',
        description: generateMockMeal('Dinner', dayOfWeek),
        date: dateString,
        nutritionInfo: {
          calories: String(Math.floor(Math.random() * 400) + 600),
          protein: String(Math.floor(Math.random() * 20) + 30),
          carbs: String(Math.floor(Math.random() * 40) + 60),
          fat: String(Math.floor(Math.random() * 20) + 20)
        }
      }
    );
  }
  
  return {
    startDate: format(startDate, 'yyyy-MM-dd'),
    endDate: format(endDate, 'yyyy-MM-dd'),
    weekFocus: 'Building aerobic base with tempo work to improve lactate threshold.',
    activities,
    meals,
    generated: new Date().toISOString()
  };
};

// Helper to generate mock meal descriptions
const generateMockMeal = (mealType: string, dayOfWeek: string): string => {
  const breakfastOptions = [
    'Oatmeal with berries, banana, and a tablespoon of almond butter.',
    'Greek yogurt with honey, granola, and mixed berries.',
    'Whole grain toast with avocado and two poached eggs.',
    'Protein smoothie with banana, spinach, protein powder, and almond milk.',
    'Overnight chia pudding with coconut milk and mango.',
    'Scrambled eggs with spinach, tomatoes, and whole grain toast.',
    'Whole grain pancakes with fresh berries and a drizzle of maple syrup.'
  ];
  
  const lunchOptions = [
    'Quinoa bowl with grilled chicken, roasted vegetables, and tahini dressing.',
    'Mixed green salad with tuna, hard-boiled eggs, olives, and balsamic vinaigrette.',
    'Turkey and avocado wrap with mixed greens and hummus.',
    'Lentil soup with a side of whole grain bread and a small salad.',
    'Chicken and vegetable stir-fry with brown rice.',
    'Mediterranean bowl with falafel, hummus, tabbouleh, and pita.',
    'Grilled salmon salad with mixed greens, cucumber, and lemon dressing.'
  ];
  
  const dinnerOptions = [
    'Grilled salmon with steamed broccoli and sweet potato.',
    'Lean beef stir-fry with mixed vegetables and brown rice.',
    'Whole wheat pasta with turkey meatballs and tomato sauce.',
    'Roasted chicken breast with quinoa and roasted vegetables.',
    'Black bean and vegetable burrito bowl with brown rice and avocado.',
    'Baked cod with lemon, asparagus, and new potatoes.',
    'Vegetable curry with chickpeas and brown rice.'
  ];
  
  let options: string[];
  
  if (mealType === 'Breakfast') {
    options = breakfastOptions;
  } else if (mealType === 'Lunch') {
    options = lunchOptions;
  } else {
    options = dinnerOptions;
  }
  
  // Use the day of week to deterministically select a meal
  const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(dayOfWeek);
  
  return options[dayIndex];
};