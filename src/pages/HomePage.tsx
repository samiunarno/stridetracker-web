import { Link } from 'react-router-dom';
import { 
  Award, Calendar, BarChart2, Activity, CheckCircle, 
  Smartphone, Users, Gauge 
} from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              AI-Powered Coaching for <span className="text-primary-600">Running Excellence</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized training plans, nutrition guidance, and progress tracking—all powered by AI and tailored to your unique running journey.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="primary"
                  rightIcon={<Activity className="h-5 w-5" />}
                >
                  Start Your Plan
                </Button>
              </Link>
              <Link to="/features">
                <Button 
                  size="lg" 
                  variant="outline"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-20 bg-white rounded-xl shadow-xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Runner tracking progress" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Transform Your Running Journey</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines advanced AI, expert coaching principles, and personalized analytics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-5">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Training Plans</h3>
              <p className="text-gray-600">
                Get a personalized 7-day training plan that adapts to your progress, fitness level, and goals.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-600 mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                AI-generated plans based on proven training methodologies used by professional coaches.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-accent-100 flex items-center justify-center text-accent-600 mb-5">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Visualize your improvements with detailed charts and metrics to keep you motivated.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-5">
                <Gauge className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Activity Integration</h3>
              <p className="text-gray-600">
                Connect with Strava and Garmin to automatically sync all your running activities.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 mb-5">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Optimized</h3>
              <p className="text-gray-600">
                Access your training plan and nutrition guide on any device, anywhere, anytime.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center text-red-600 mb-5">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600">
                Join a community of runners to share insights, experiences, and motivation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and transform your running in days.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  Sign Up & Connect
                </h3>
                <p className="text-gray-600 text-center">
                  Create your account and connect your fitness devices and apps to sync your data.
                </p>
              </div>
              
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-primary-200 -z-10 transform -translate-x-8"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  Get Your Plan
                </h3>
                <p className="text-gray-600 text-center">
                  Our AI analyzes your data and generates a personalized 7-day training and nutrition plan.
                </p>
              </div>
              
              <div className="hidden md:block absolute top-8 left-full w-full h-1 bg-primary-200 -z-10 transform -translate-x-8"></div>
            </div>
            
            {/* Step 3 */}
            <div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  Train & Improve
                </h3>
                <p className="text-gray-600 text-center">
                  Follow your plan, track your progress, and watch as your plan adapts to your improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From Our Runners</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what our community has to say about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://i.pravatar.cc/150?img=11" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Marathoner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The AI coach helped me cut 15 minutes from my marathon time by adjusting my training plan based on my progress. The nutrition guidance was exactly what I needed."
              </p>
              <div className="flex text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://i.pravatar.cc/150?img=32" 
                  alt="Michael Rodriguez" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-500">Trail Runner</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a trail runner, finding the right training balance was always hard. This platform gives me structured plans that accommodate my varied terrain and intensity needs."
              </p>
              <div className="flex text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://i.pravatar.cc/150?img=23" 
                  alt="Emily Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Emily Chen</h4>
                  <p className="text-sm text-gray-500">5K Specialist</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I started as a beginner, and within 3 months I was able to run my first 5K. The progressive training approach kept me motivated without feeling overwhelmed."
              </p>
              <div className="flex text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Running?</h2>
            <p className="text-xl text-primary-100 mb-10">
              Join thousands of runners who are achieving their goals with personalized AI coaching.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="secondary"
                  rightIcon={<CheckCircle className="h-5 w-5" />}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;