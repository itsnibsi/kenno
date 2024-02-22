"use client";

import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';

type TaskListItemProps = {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
};

export function TaskListItem({ task: { id, title, completed }, onToggle }: TaskListItemProps) {
  return (
    <li className={cn(
      'flex items-center',
      completed && 'line-through',
      completed && 'text-gray-500',
    )}>
      <input
        type="checkbox"
        defaultChecked={completed}
        onChange={() => onToggle(id)} />
      {title}
    </li>
  );
}