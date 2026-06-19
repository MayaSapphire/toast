import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Task } from '../types/task';

const STORAGE_KEY = '@toast_tasks';

interface TasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  updateTask: (updatedTask: Task) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from storage on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load tasks:', e);
      }
      setIsLoaded(true);
    };
    loadTasks();
  }, []);

  // Save tasks to storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(e => 
        console.error('Failed to save tasks:', e)
      );
    }
  }, [tasks, isLoaded]);

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => {
      const exists = prevTasks.some(t => t.id === updatedTask.id);
      if (exists) {
        return prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      }
      return [...prevTasks, updatedTask];
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};