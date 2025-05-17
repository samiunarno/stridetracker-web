import { ReactNode } from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const StatCard = ({ title, value, icon, change, description }: StatCardProps) => {
  return (
    <Card className="h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-1 flex items-center">
              <span className={`text-sm ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last week</span>
            </div>
          )}
          
          {description && (
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          )}
        </div>
        
        <div className="p-2 bg-primary-100 rounded-md text-primary-600">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;