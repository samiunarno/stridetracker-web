export interface Activity {
  id?: string;
  title: string;
  description: string;
  type: string;
  date: string;
  completed?: boolean;
  metrics?: {
    distance?: string;
    duration?: string;
    pace?: string;
    elevationGain?: string;
    heartRate?: string;
  };
}

export interface Meal {
  id?: string;
  type: string;
  description: string;
  date: string;
  nutritionInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat?: string;
  };
}

export interface Plan {
  id?: string;
  userId?: string;
  startDate: string;
  endDate: string;
  weekFocus?: string;
  activities: Activity[];
  meals: Meal[];
  generated?: string;
}