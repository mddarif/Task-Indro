import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Task } from '../services/taskService';
import { CheckCircle2, Circle, Edit, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => onToggleComplete(task.id, task.completed)}
              className="mr-3 flex-shrink-0 focus:outline-none"
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                {task.title}
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {task.category}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <span className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)} mr-1`}></span>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
                {task.due_date && (
                  <>
                    <span className="mx-2">•</span>
                    <span>
                      Due: {format(new Date(task.due_date), 'MMM d, yyyy')}
                    </span>
                  </>
                )}
              </div>
              {task.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
              )}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <Link
              to={`/tasks/edit/${task.id}`}
              className="mr-2 text-indigo-600 hover:text-indigo-900"
            >
              <Edit className="h-5 w-5" />
            </Link>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;