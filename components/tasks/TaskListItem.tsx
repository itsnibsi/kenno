"use client";

import { cn } from '@/lib/utils';
import { useTransition } from 'react';

type TaskListItemProps = {
  task: {
    id: string;
    title: string;
    completed: number;
  };
  onToggle: (taskId: string, completed: boolean) => void;
};

export function TaskListItem({ task: { id, title, completed }, onToggle }: TaskListItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleOnChange = (e: { target: { checked: boolean; }; }) => {
    startTransition(() => onToggle(id, e.target.checked));
  };

  return (
    <li className={cn(
      'flex items-center',
      completed && 'line-through',
      completed && 'text-gray-500',
    )}>
      <input
        type="checkbox"
        defaultChecked={completed === 1}
        disabled={isPending}
        onChange={handleOnChange} className='mr-2' />
      {title}
    </li>
  );
}