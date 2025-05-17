import { useMemo } from 'react';
import { Activity } from '../../types/plan';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Card from '../ui/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyStatsProps {
  activities: Activity[];
}

const WeeklyStats = ({ activities }: WeeklyStatsProps) => {
  const chartData = useMemo(() => {
    // Group activities by day and calculate distance
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const distanceByDay = new Array(7).fill(0);
    const durationByDay = new Array(7).fill(0);
    
    activities.forEach(activity => {
      const date = new Date(activity.date);
      const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // Adjust to Mon-Sun
      
      if (activity.metrics?.distance) {
        distanceByDay[dayIndex] += parseFloat(activity.metrics.distance);
      }
      
      if (activity.metrics?.duration) {
        durationByDay[dayIndex] += parseInt(activity.metrics.duration, 10);
      }
    });
    
    return {
      labels: days,
      datasets: [
        {
          label: 'Distance (km)',
          data: distanceByDay,
          backgroundColor: '#0070f3',
          borderRadius: 4,
        },
        {
          label: 'Duration (min)',
          data: durationByDay.map(d => d / 10), // Scale down duration to fit on same chart
          backgroundColor: '#10b981',
          borderRadius: 4,
        }
      ]
    };
  }, [activities]);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 5,
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            
            if (label.includes('Duration')) {
              return `${label}: ${value * 10} min`;
            }
            return `${label}: ${value} km`;
          }
        }
      }
    }
  };
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Weekly Training Stats</h3>
      </div>
      
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Total Distance</p>
          <p className="text-xl font-semibold mt-1">
            {chartData.datasets[0].data.reduce((a, b) => a + b, 0).toFixed(1)} km
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Total Duration</p>
          <p className="text-xl font-semibold mt-1">
            {chartData.datasets[1].data.reduce((a, b) => a + b * 10, 0)} min
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyStats;