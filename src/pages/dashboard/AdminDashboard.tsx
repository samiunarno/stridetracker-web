import { useState, useEffect } from 'react';
import { Users, Activity, Calendar, RefreshCw } from 'lucide-react';
import SystemStats from '../../components/admin/SystemStats';
import UsersTable from '../../components/admin/UsersTable';
import SyncStatus from '../../components/admin/SyncStatus';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

// Mock data for admin dashboard
const mockUsers = [
  {
    id: 'user-123',
    name: 'John Smith',
    email: 'john@example.com',
    subscription: 'premium',
    lastActive: '2023-02-15',
    isActive: true
  },
  {
    id: 'user-124',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    subscription: 'free',
    lastActive: '2023-02-14',
    isActive: true
  },
  {
    id: 'user-125',
    name: 'Michael Davis',
    email: 'michael@example.com',
    subscription: 'premium',
    lastActive: '2023-02-13',
    isActive: true
  },
  {
    id: 'user-126',
    name: 'Emily Wilson',
    email: 'emily@example.com',
    subscription: 'free',
    lastActive: '2023-02-10',
    isActive: true
  },
  {
    id: 'user-127',
    name: 'Robert Brown',
    email: 'robert@example.com',
    subscription: 'premium',
    lastActive: '2023-02-08',
    isActive: false
  }
];

const mockSyncEvents = [
  {
    id: 'sync-1',
    service: 'Strava API',
    status: 'success',
    message: 'Successfully synced 5 activities',
    timestamp: '2023-02-15 14:30:22',
    details: '{"syncedActivities": 5, "users": 3, "duration": "2.3s"}'
  },
  {
    id: 'sync-2',
    service: 'Garmin API',
    status: 'error',
    message: 'Authentication failed',
    timestamp: '2023-02-15 13:15:10',
    details: '{"error": "Invalid credentials", "code": 401}'
  },
  {
    id: 'sync-3',
    service: 'Google Sheets',
    status: 'success',
    message: 'Data updated successfully',
    timestamp: '2023-02-15 12:45:33',
    details: '{"sheets": ["users", "activities", "plans"], "cells": 256}'
  },
  {
    id: 'sync-4',
    service: 'LangFlow AI',
    status: 'success',
    message: 'Generated 3 new training plans',
    timestamp: '2023-02-15 10:22:05',
    details: '{"plans": 3, "duration": "15.2s"}'
  },
  {
    id: 'sync-5',
    service: 'Strava API',
    status: 'success',
    message: 'Successfully synced 2 activities',
    timestamp: '2023-02-14 16:12:45',
    details: '{"syncedActivities": 2, "users": 1, "duration": "1.8s"}'
  }
] as const;

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate a refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform management and overview</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button 
            variant="outline"
            leftIcon={<RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />}
            onClick={handleRefresh}
            isLoading={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="mb-8">
        <SystemStats 
          totalUsers={123}
          activePlans={89}
          syncedActivities={1254}
          databaseSize="156 MB"
        />
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UsersTable users={mockUsers} />
        </div>
        
        <div>
          <SyncStatus events={mockSyncEvents} />
        </div>
      </div>
      
      {/* Alerts & Notices */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card padding="lg" className="bg-amber-50 border-amber-200">
          <div className="flex">
            <div className="mr-4">
              <Activity className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">API Rate Limit Alert</h3>
              <p className="text-amber-700">
                Strava API usage at 80% of daily limit. Consider optimizing sync frequency or upgrading the plan.
              </p>
            </div>
          </div>
        </Card>
        
        <Card padding="lg" className="bg-green-50 border-green-200">
          <div className="flex">
            <div className="mr-4">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Scheduled Maintenance</h3>
              <p className="text-green-700">
                Database optimization scheduled for Sunday, Feb 20 at 2:00 AM UTC. Expected downtime: 15 minutes.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;