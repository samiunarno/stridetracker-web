import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import ConnectAppButton from '../../components/profile/ConnectAppButton';
import { User, Mail, Lock, Save, Award, CreditCard } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    height: '175',
    weight: '70',
    birthdate: '1990-01-01',
    gender: 'not-specified',
    primaryGoal: 'improve-fitness',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      setFeedbackMessage('New passwords do not match');
      setMessageType('error');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFeedbackMessage('Profile updated successfully');
    setMessageType('success');
    setIsSaving(false);
    
    // Clear password fields
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    
    // Clear feedback message after a delay
    setTimeout(() => {
      setFeedbackMessage('');
      setMessageType(null);
    }, 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            {/* Feedback message */}
            {feedbackMessage && (
              <div className={`mb-6 p-3 rounded-md ${
                messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {feedbackMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4 sm:mb-0 sm:mr-6">
                    <img 
                      src={user?.avatarUrl || 'https://i.pravatar.cc/150?img=68'} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-sm text-gray-500 mt-1">Member since {
                      new Date(user?.createdAt || Date.now()).toLocaleDateString()
                    }</p>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      leftIcon={<User className="h-5 w-5 text-gray-400" />}
                    />
                    
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                      disabled
                      helperText="Email cannot be changed"
                    />
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <Input
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={handleInputChange}
                      leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={handleInputChange}
                        leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                      />
                      
                      <Input
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={handleInputChange}
                        leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-4">Runner Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={profileData.height}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={profileData.weight}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Birthdate
                      </label>
                      <input
                        type="date"
                        name="birthdate"
                        value={profileData.birthdate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      >
                        <option value="not-specified">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primary Goal
                      </label>
                      <select
                        name="primaryGoal"
                        value={profileData.primaryGoal}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      >
                        <option value="improve-fitness">Improve Fitness</option>
                        <option value="lose-weight">Lose Weight</option>
                        <option value="run-faster">Run Faster</option>
                        <option value="run-longer">Run Longer</option>
                        <option value="prepare-race">Prepare for Race</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    leftIcon={<Save className="h-5 w-5" />}
                    isLoading={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
        
        <div className="space-y-8">
          {/* Subscription Card */}
          <Card>
            <h3 className="text-lg font-medium mb-4">Your Subscription</h3>
            
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">
                  {user?.subscription === 'premium' ? 'Premium Plan' : 'Free Plan'}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.subscription === 'premium' 
                    ? 'Renews on March 15, 2023' 
                    : 'Limited features'}
                </p>
              </div>
            </div>
            
            {user?.subscription !== 'premium' && (
              <Button variant="primary" fullWidth>
                Upgrade to Premium
              </Button>
            )}
            
            {user?.subscription === 'premium' && (
              <Button variant="outline" fullWidth>
                Manage Subscription
              </Button>
            )}
          </Card>
          
          {/* Achievements Card */}
          <Card>
            <h3 className="text-lg font-medium mb-4">Achievements</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Early Adopter</p>
                  <p className="text-sm text-gray-500">Joined during beta phase</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Consistent Runner</p>
                  <p className="text-sm text-gray-500">Completed 10+ sessions</p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Connected Apps */}
          <Card>
            <h3 className="text-lg font-medium mb-4">Connected Apps</h3>
            
            <div className="space-y-4">
              <ConnectAppButton 
                service="strava"
                color="text-orange-600"
                bgColor="bg-orange-50"
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.087 4.116z" fill="currentColor" />
                    <path d="M10.232 13.828l3.066 6.173 3.066-6.173H10.232zM18.306 0l-5.155 10.172h3.066l2.089-4.116 2.089 4.116h3.065L18.306 0z" fill="currentColor" fillOpacity="0.5" />
                  </svg>
                }
                name="Strava"
              />
              
              <ConnectAppButton 
                service="garmin"
                color="text-blue-600"
                bgColor="bg-blue-50"
                icon={
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="currentColor" fillOpacity="0.1" />
                    <path d="M19.47 13.01c.304-.58.483-1.246.483-1.936 0-2.189-1.633-4.048-3.822-4.048-2.19 0-3.822 1.81-3.822 4 0 2.188 1.633 4.047 3.822 4.047.725 0 1.45-.198 2.001-.493l1.586 1.586 1.104-1.104-1.352-1.352v-1.7zm-3.34.595c-1.398 0-2.483-1.085-2.483-2.483 0-1.397 1.133-2.53 2.53-2.53 1.398 0 2.483 1.133 2.483 2.53s-1.133 2.483-2.53 2.483z" fill="currentColor" />
                    <path d="M11.694 16.638c-2.66 0-4.822-2.207-4.822-4.869 0-2.661 2.162-4.868 4.822-4.868.543 0 1.035.087 1.53.262.242-.543.629-1.037 1.08-1.43-.789-.319-1.673-.493-2.61-.493-3.796 0-6.885 2.926-6.885 6.53 0 3.602 3.09 6.529 6.885 6.529.937 0 1.821-.175 2.61-.493-.451-.392-.838-.887-1.08-1.43-.495.176-.987.262-1.53.262z" fill="currentColor" />
                  </svg>
                }
                name="Garmin"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;