import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Plan, Activity, Meal } from '../types/plan';
import { generateMockTrainingPlan } from '../utils/mockDataGenerators';

interface AppContextType {
  trainingPlan: Plan | null;
  isLoading: boolean;
  refreshPlan: () => Promise<void>;
  syncWithStrava: () => Promise<void>;
  syncWithGarmin: () => Promise<void>;
  connectedApps: {
    strava: boolean;
    garmin: boolean;
  };
  toggleAppConnection: (app: 'strava' | 'garmin') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [trainingPlan, setTrainingPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [connectedApps, setConnectedApps] = useState({
    strava: false,
    garmin: false
  });

  // Load training plan when user changes
  useEffect(() => {
    if (user) {
      loadTrainingPlan();
    } else {
      setTrainingPlan(null);
    }
  }, [user]);

  const loadTrainingPlan = async () => {
    setIsLoading(true);
    try {
      // Simulate loading data from API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock data for the demo
      const mockPlan = generateMockTrainingPlan();
      setTrainingPlan(mockPlan);
    } catch (error) {
      console.error('Failed to load training plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPlan = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to regenerate plan
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate new mock data
      const newPlan = generateMockTrainingPlan();
      setTrainingPlan(newPlan);
    } catch (error) {
      console.error('Failed to refresh plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncWithStrava = async () => {
    if (!connectedApps.strava) {
      console.error('Strava not connected');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call to sync with Strava
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, we would update the plan with Strava data
    } catch (error) {
      console.error('Failed to sync with Strava:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncWithGarmin = async () => {
    if (!connectedApps.garmin) {
      console.error('Garmin not connected');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call to sync with Garmin
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, we would update the plan with Garmin data
    } catch (error) {
      console.error('Failed to sync with Garmin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAppConnection = (app: 'strava' | 'garmin') => {
    setConnectedApps(prev => ({
      ...prev,
      [app]: !prev[app]
    }));
  };

  return (
    <AppContext.Provider
      value={{
        trainingPlan,
        isLoading,
        refreshPlan,
        syncWithStrava,
        syncWithGarmin,
        connectedApps,
        toggleAppConnection
      }}
    >
      {children}
    </AppContext.Provider>
  );
};