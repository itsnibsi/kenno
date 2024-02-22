import { db } from '@/lib/db';
import tasks from '@/data/tasks';

async function seed() {
  await db.insertInto('Task').values(tasks).execute();
}

seed()
  .then(async () => {
    console.log('Seeded successfully');
    await db.destroy();
  })
  .catch(async (error) => {
    console.error('Failed to seed');
    console.error(error);
    await db.destroy();
    process.exit(1);
  });