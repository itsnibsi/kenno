"use server";

import { Task, db } from '@/lib/db';
import { genId } from '@/lib/utils';

export const getTasks = async () => {
  const tasks = await db.selectFrom("Task")
    .selectAll()
    .orderBy('createdAt', 'asc')
    .execute();

  return tasks;
}

export const createTask = async (title: string) => {
  const taskId = "task_" + genId();
  await db.insertInto('Task').values({ id: taskId, title }).execute();
  return await db.selectFrom('Task').select(['id', 'title', 'completed']).where('id', '=', taskId).limit(1).executeTakeFirst();
}

export const toggleTask = async (taskId: string, completed: boolean) => {
  await db.updateTable('Task')
    .set({ completed: Number(completed) })
    .where('id', '=', taskId)
    .execute();
}