import TaskList from '@/components/tasks/TaskList';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Tasks</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
}