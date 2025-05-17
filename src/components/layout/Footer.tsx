import { Link } from 'react-router-dom';
import { Activity, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Activity className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold">RunnersPro</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              RunnersPro delivers personalized AI-powered training plans for runners of all levels.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:info@runnerspro.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Running Guides
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Nutrition Tips
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} RunnersPro. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link to="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;