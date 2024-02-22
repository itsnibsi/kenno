"use client";

import { createTask, getTasks, toggleTask } from '@/actions/tasks';
import { useOptimistic, useState, useTransition } from 'react';

type TaskItem = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TaskList({ initialTasks }: { initialTasks: TaskItem[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isPending, startTransition] = useTransition();
  const [optimisticTasks, addOptimisticTaskItem] = useOptimistic<TaskItem[], string>(
    tasks,
    (state: TaskItem[], newTaskTitle: string) => [
      ...state,
      { id: '', title: newTaskTitle, completed: false },
    ],
  );

  const handleToggle = async (taskId: string, completed: boolean) => {
    await toggleTask(taskId, completed);
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTaskTitle = new FormData(e.currentTarget).get('newTaskTitle') as string;
    if (newTaskTitle) {
      e.currentTarget.reset();
      startTransition(async () => {
        addOptimisticTaskItem(newTaskTitle);

        const addedTask = await createTask(newTaskTitle);
        setTasks(prev => [...prev, { ...addedTask!, completed: Boolean(addedTask!.completed) }]);
      });
    }
  };

  return (
    <div>
      <ul>
        {optimisticTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'text-gray-500' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id, !task.completed)}
            />
            {task.title}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddTask}>
        <input type="text" name="newTaskTitle" />
        <button type="submit" disabled={isPending}>
          Add
        </button>
      </form>
    </div>
  )
}

