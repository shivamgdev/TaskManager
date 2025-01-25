import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../utils/types';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Incomplete'>(
    'All',
  );

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error('Failed to load tasks', e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.error('Failed to save tasks', e);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (task: Task) => setTasks([...tasks, task]);
  const editTask = (updatedTask: Task) =>
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
    );
  const deleteTask = (id: string) =>
    setTasks(tasks.filter(task => task.id !== id));
  const toggleComplete = (id: string) =>
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter(task =>
          filter === 'Completed' ? task.completed : !task.completed,
        );

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    filteredTasks,
    setFilter,
    filter,
  };
};

export default useTasks;
