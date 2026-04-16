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
    {id: 1, name: "Long long long long long long long long long task name", importance: 0.1, urgency: 0.2, energy: 0.4 },
    {id: 2, name: "Task 2", importance: 0.3, urgency: 0.6, energy: 0.3 },
    {id: 3, name: "Task 3", importance: 0.7, urgency: 0.5, energy: 0.2 },
    {id: 4, name: "Task 4", importance: 0.1, urgency: 0.2, energy: 0.4 },
    {id: 5, name: "Task 5", importance: 0.3, urgency: 0.6, energy: 0.3 },
    {id: 6, name: "Task 6", importance: 0.7, urgency: 0.5, energy: 0.2 },
    {id: 7, name: "Task 7", importance: 0.1, urgency: 0.2, energy: 0.4 },
    {id: 8, name: "Task 8", importance: 0.3, urgency: 0.6, energy: 0.3 },
    {id: 9, name: "Task 9", importance: 0.7, urgency: 0.5, energy: 0.2 },
    {id: 10, name: "Task 10", importance: 0.1, urgency: 0.2, energy: 0.4 },
    {id: 11, name: "Task 11", importance: 0.3, urgency: 0.6, energy: 0.3 },
    {id: 12, name: "Task 12", importance: 0.7, urgency: 0.5, energy: 0.2 },
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