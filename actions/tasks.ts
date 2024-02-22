"use server";

import { db } from '@/lib/db';
import { genId } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const getTasks = async () => {
  const task = await db.selectFrom("Task")
    .selectAll()
    .execute();

  return task;
}

export const createTask = async (title: string) => {
  await db.insertInto('Task')
    .values({ id: "task_" + genId(), title })
    .execute();
  revalidatePath('/')
}

export const toggleTask = async (taskId: string, completed: boolean) => {
  await db.updateTable('Task')
    .set({ completed: Number(completed) })
    .where('id', '=', taskId)
    .execute();
  revalidatePath('/')
}