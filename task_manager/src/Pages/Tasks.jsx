import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import TaskFilter from '../components/TaskFilter';
import useLocalStorage from '../hooks/useLocalStorage';

function Tasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      title: taskText,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="container mx-auto p-4">
      <TaskForm onAddTask={addTask} />
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
      <div className="mt-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            completed={task.completed}
            onToggle={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
