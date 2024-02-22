"use server";

import { getTasks } from '@/actions/tasks';
import TaskList from '@/components/tasks/TaskList';

export default async function Page() {
  const tasks = (await getTasks()).map(task => ({ id: task.id, title: task.title, completed: !!task.completed }));

  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Tasks</h1>
      <TaskList initialTasks={tasks} />
    </div>
  )
}