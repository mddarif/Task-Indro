import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTaskStats, getTasks, Task } from '../services/taskService';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ListChecks, 
  CheckSquare, 
  XCircle, 
  PlusCircle 
} from 'lucide-react';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  high_priority: number;
  due_soon: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, tasksData] = await Promise.all([
          getTaskStats(),
          getTasks()
        ]);
        
        setStats(statsData);
        // Get the 5 most recent tasks
        setRecentTasks(tasksData.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-indigo-100 p-3 mr-4">
            <ListChecks className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-xl font-semibold">{stats?.total || 0}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-semibold">{stats?.completed || 0}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-semibold">{stats?.pending || 0}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-red-100 p-3 mr-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">High Priority</p>
            <p className="text-xl font-semibold">{stats?.high_priority || 0}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Due Soon</p>
            <p className="text-xl font-semibold">{stats?.due_soon || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recent Tasks</h2>
          <Link 
            to="/tasks" 
            className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
          >
            View all <CheckSquare className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <div key={task.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                    ) : (
                      <div 
                        className={`h-3 w-3 rounded-full mr-3 ${
                          task.priority === 'high' 
                            ? 'bg-red-500' 
                            : task.priority === 'medium' 
                              ? 'bg-yellow-500' 
                              : 'bg-blue-500'
                        }`}
                      />
                    )}
                    <div>
                      <h3 className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {task.category} • {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}
                      </p>
                    </div>
                  </div>
                  <Link 
                    to={`/tasks/edit/${task.id}`}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500 mb-4">No tasks yet</p>
              <Link 
                to="/tasks/new" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Create your first task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;