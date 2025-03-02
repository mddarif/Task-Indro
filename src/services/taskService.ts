import api from './api';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  due_date?: string | null;
}

export const getTasks = async (filters?: { 
  category?: string; 
  completed?: boolean;
  search?: string;
}) => {
  const params = new URLSearchParams();
  
  if (filters?.category) {
    params.append('category', filters.category);
  }
  
  if (filters?.completed !== undefined) {
    params.append('completed', filters.completed.toString());
  }
  
  if (filters?.search) {
    params.append('search', filters.search);
  }
  
  const query = params.toString() ? `?${params.toString()}` : '';
  const response = await api.get(`/tasks/${query}`);
  return response.data;
};

export const getTask = async (id: number) => {
  const response = await api.get(`/tasks/${id}/`);
  return response.data;
};

export const createTask = async (taskData: TaskFormData) => {
  const response = await api.post('/tasks/', taskData);
  return response.data;
};

export const updateTask = async (id: number, taskData: Partial<TaskFormData>) => {
  const response = await api.put(`/tasks/${id}/`, taskData);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}/`);
  return true;
};

export const toggleTaskCompletion = async (id: number, completed: boolean) => {
  const response = await api.patch(`/tasks/${id}/`, { completed });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories/');
  return response.data;
};

export const getTaskStats = async () => {
  const response = await api.get('/tasks/stats/');
  return response.data;
};