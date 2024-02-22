import { TaskListItem } from './TaskListItem';
import { getTasks, toggleTask } from '@/actions/tasks';

export default async function TaskList() {
  const tasks = await getTasks();
  const plainTasks = tasks.map(({ id, title, completed }) => ({ id, title, completed }));

  return (
    <div>
      <ul className='space-y-2'>
        {plainTasks.map((task) => (
          <TaskListItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </ul>
    </div>
  )
}