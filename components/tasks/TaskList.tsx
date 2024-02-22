"use client";

import { createTask, deleteTask, toggleTask } from '@/actions/tasks';
import { cn } from '@/lib/utils';
import { useOptimistic, useState, useTransition } from 'react';

type TaskItem = {
  id: string;
  title: string;
  completed: boolean;
};

enum TaskAction {
  Create = 'create',
  Toggle = 'toggle',
  Delete = 'delete',
}

interface OptimisticUpdate {
  action: TaskAction;
  taskId?: string;
  completed?: boolean;
  newTaskTitle?: string;
}

export default function TaskList({ initialTasks }: { initialTasks: TaskItem[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isPending, startTransition] = useTransition();

  const [optimisticTasks, updateOptimisticTasks] = useOptimistic<TaskItem[], OptimisticUpdate>(
    tasks,
    (state: TaskItem[], update: OptimisticUpdate) => {
      switch (update.action) {
        case TaskAction.Create:
          if (update.newTaskTitle) {
            return [{ id: '', title: update.newTaskTitle, completed: false }, ...state];
          }
          break;
        case TaskAction.Toggle:
          if (update.taskId != null && update.completed != null) {
            return state.map(task =>
              task.id === update.taskId ? { ...task, completed: Boolean(update.completed) } : task
            );
          }
          break;
        case TaskAction.Delete:
          if (update.taskId != null) {
            return state.filter(task => task.id !== update.taskId);
          }
          break;
        default:
          return state;
      }
      return state;
    },
  );

  const handleToggle = async (taskId: string, completed: boolean) => {
    startTransition(async () => {
      // Optimistically update the local state before the actual toggle
      updateOptimisticTasks({ action: TaskAction.Toggle, taskId, completed });

      // Perform the actual toggle task operation
      await toggleTask(taskId, completed);
      setTasks(prev => prev.map(task => (task.id === taskId ? { ...task, completed } : task)));
    });
  };

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTaskTitle = new FormData(e.currentTarget).get('newTaskTitle') as string;
    if (newTaskTitle) {
      e.currentTarget.reset();
      startTransition(async () => {
        updateOptimisticTasks({ action: TaskAction.Create, newTaskTitle });

        const addedTask = await createTask(newTaskTitle);
        setTasks(prev => [{ ...addedTask!, completed: Boolean(addedTask!.completed) }, ...prev]);
      });
    }
  };

  const handleDelete = async (taskId: string) => {
    startTransition(async () => {
      updateOptimisticTasks({ action: TaskAction.Delete, taskId });
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    })

    return (
      <div>
        <form onSubmit={handleAddTask}>
          <input type="text" name="newTaskTitle" />
          <button type="submit" disabled={isPending}>
            Add
          </button>
        </form>
        <ul className='space-y-2 mt-4'>
          {optimisticTasks.map((task) => (
            <li key={task.id} className={cn('px-2 max-w-96 grid grid-cols-6 items-center')}>
              <div className='mr-2 col-span-1 py-1 flex items-center'>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id, !task.completed)}
                />
              </div>
              <div className={cn('col-span-4 align-middlepy-4 ', task.completed && 'text-gray-500 line-through')}>{task.title}</div>
              <div className='ml-2 col-span-1 py-1'>
                <button
                  onClick={() => null}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div >
    )
  }

