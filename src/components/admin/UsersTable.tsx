import { useState } from 'react';
import { ChevronDown, ChevronUp, User, Search, XCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  subscription: string;
  lastActive: string;
  isActive: boolean;
}

interface UsersTableProps {
  users: AdminUser[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof AdminUser>('lastActive');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: keyof AdminUser) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }
    
    if (sortDirection === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });
  
  return (
    <Card padding="none" className="h-full">
      <div className="p-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold">Users</h3>
          
          <div className="w-full md:w-64">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-gray-400" />}
              rightIcon={
                searchTerm ? (
                  <button onClick={() => setSearchTerm('')}>
                    <XCircle className="h-4 w-4 text-gray-400" />
                  </button>
                ) : null
              }
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  <span>User</span>
                  {sortField === 'name' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('subscription')}
              >
                <div className="flex items-center">
                  <span>Subscription</span>
                  {sortField === 'subscription' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastActive')}
              >
                <div className="flex items-center">
                  <span>Last Active</span>
                  {sortField === 'lastActive' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('isActive')}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  {sortField === 'isActive' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {user.isActive ? (
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={`https://i.pravatar.cc/150?img=${parseInt(user.id.split('-')[1], 10) % 70}`} 
                          alt=""
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.subscription === 'premium' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.subscription}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastActive}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UsersTable;