import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Card from '../ui/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DataPoint {
  date: string;
  value: number;
}

interface ProgressChartProps {
  title: string;
  data: DataPoint[];
  dataLabel: string;
  color?: string;
  unit?: string;
}

const ProgressChart = ({ 
  title, 
  data, 
  dataLabel, 
  color = '#0070f3',
  unit = ''
}: ProgressChartProps) => {
  
  const chartData = useMemo(() => {
    // Sort data by date
    const sortedData = [...data].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    return {
      labels: sortedData.map(d => {
        const date = new Date(d.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          label: dataLabel,
          data: sortedData.map(d => d.value),
          borderColor: color,
          backgroundColor: `${color}22`, // Add transparency
          fill: true,
          tension: 0.3,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 1,
          pointRadius: 3,
        }
      ]
    };
  }, [data, dataLabel, color]);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: '#f3f4f6',
        },
        ticks: {
          maxTicksLimit: 5,
          callback: function(value: number) {
            return `${value}${unit}`;
          }
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
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}${unit}`;
          }
        }
      }
    }
  };
  
  return (
    <Card className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-xs text-gray-500">Current</p>
          <p className="font-medium">{data.length > 0 ? `${data[data.length - 1].value}${unit}` : '-'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Average</p>
          <p className="font-medium">
            {data.length > 0 
              ? `${(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1)}${unit}` 
              : '-'
            }
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Trend</p>
          <p className={`font-medium ${
            data.length > 1 && data[data.length - 1].value > data[0].value
              ? 'text-green-600'
              : data.length > 1 && data[data.length - 1].value < data[0].value
                ? 'text-red-600'
                : 'text-gray-600'
          }`}>
            {data.length > 1 
              ? `${(((data[data.length - 1].value - data[0].value) / data[0].value) * 100).toFixed(1)}%` 
              : '-'
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProgressChart;