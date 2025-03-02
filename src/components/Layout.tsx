import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  CheckSquare, 
  PlusSquare, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <CheckSquare className="mr-2" />
            TaskManager
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded hover:bg-indigo-700 flex items-center">
              <Home size={18} className="mr-1" /> Dashboard
            </Link>
            <Link to="/tasks" className="px-3 py-2 rounded hover:bg-indigo-700 flex items-center">
              <CheckSquare size={18} className="mr-1" /> Tasks
            </Link>
            <Link to="/tasks/new" className="px-3 py-2 rounded hover:bg-indigo-700 flex items-center">
              <PlusSquare size={18} className="mr-1" /> New Task
            </Link>
            <button 
              onClick={handleLogout} 
              className="px-3 py-2 rounded hover:bg-indigo-700 flex items-center"
            >
              <LogOut size={18} className="mr-1" /> Logout
            </button>
          </nav>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 text-white">
          <div className="container mx-auto px-4 py-2">
            <Link 
              to="/" 
              className="block py-2 hover:bg-indigo-800 rounded px-2 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={18} className="mr-2" /> Dashboard
            </Link>
            <Link 
              to="/tasks" 
              className="block py-2 hover:bg-indigo-800 rounded px-2 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CheckSquare size={18} className="mr-2" /> Tasks
            </Link>
            <Link 
              to="/tasks/new" 
              className="block py-2 hover:bg-indigo-800 rounded px-2 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PlusSquare size={18} className="mr-2" /> New Task
            </Link>
            <button 
              onClick={handleLogout} 
              className="block w-full text-left py-2 hover:bg-indigo-800 rounded px-2 flex items-center"
            >
              <LogOut size={18} className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>TaskManager App &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;