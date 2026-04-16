import React, { createContext, ReactNode, useContext, useState } from 'react';
import { task } from '../types/task';

interface TasksContextType {
  tasks: task[];
  setTasks: React.Dispatch<React.SetStateAction<task[]>>;
  updateTask: (updatedTask: task) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<task[]>([
  ]);

  const updateTask = (updatedTask: task) => {
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
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