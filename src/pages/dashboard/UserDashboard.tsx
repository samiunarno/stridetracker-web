import { TrendingUp, Calendar, Watch, Dumbbell, Activity } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import ActivityLog from '../../components/dashboard/ActivityLog';
import WeeklyStats from '../../components/dashboard/WeeklyStats';
import ProgressChart from '../../components/dashboard/ProgressChart';
import DietPlan from '../../components/dashboard/DietPlan';
import ConnectedApps from '../../components/dashboard/ConnectedApps';
import Button from '../../components/ui/Button';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const { trainingPlan, isLoading, refreshPlan } = useApp();
  
  // Prepare data for charts
  const paceData = [
    { date: '2023-01-01', value: 5.9 },
    { date: '2023-01-08', value: 5.8 },
    { date: '2023-01-15', value: 5.7 },
    { date: '2023-01-22', value: 5.65 },
    { date: '2023-01-29', value: 5.5 },
    { date: '2023-02-05', value: 5.4 },
    { date: '2023-02-12', value: 5.3 },
  ];
  
  const distanceData = [
    { date: '2023-01-01', value: 25 },
    { date: '2023-01-08', value: 28 },
    { date: '2023-01-15', value: 32 },
    { date: '2023-01-22', value: 30 },
    { date: '2023-01-29', value: 35 },
    { date: '2023-02-05', value: 38 },
    { date: '2023-02-12', value: 42 },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hi, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Welcome to your running dashboard</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            leftIcon={<Calendar className="h-5 w-5" />}
            onClick={refreshPlan}
            isLoading={isLoading}
          >
            {isLoading ? 'Generating Plan...' : 'Refresh Plan'}
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          title="Weekly Distance" 
          value="32.5 km" 
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Active Days" 
          value="5 days" 
          icon={<Calendar className="h-6 w-6" />}
          change={{ value: 20, isPositive: true }}
        />
        <StatCard 
          title="Avg. Pace" 
          value="5:30 /km" 
          icon={<Watch className="h-6 w-6" />}
          change={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Training Load" 
          value="Medium" 
          icon={<Dumbbell className="h-6 w-6" />}
          change={{ value: 0, isPositive: true }}
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weekly Stats Chart */}
          <WeeklyStats activities={trainingPlan?.activities || []} />
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProgressChart 
              title="Average Pace"
              data={paceData}
              dataLabel="Pace"
              unit=" min/km"
              color="#10b981"
            />
            <ProgressChart 
              title="Weekly Distance"
              data={distanceData}
              dataLabel="Distance"
              unit=" km"
              color="#0070f3"
            />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-8">
          {/* Connected Apps */}
          <ConnectedApps />
          
          {/* Diet Plan */}
          <DietPlan meals={trainingPlan?.meals || []} />
        </div>
      </div>
      
      {/* Activity Log */}
      <div className="mt-8">
        <ActivityLog activities={trainingPlan?.activities || []} />
      </div>
      
      {/* Upcoming Events */}
      <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex items-start">
          <div className="mr-4">
            <Activity className="h-10 w-10" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Training Tip</h3>
            <p className="opacity-90">
              Remember to focus on your recovery as much as your training. Proper nutrition, hydration,
              sleep, and rest days are crucial for performance improvement and injury prevention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;