import Link from 'next/link';

export default async function Page() {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Kenno</h1>
      <div>
        <Link href='/tasks'>Tasks</Link>
      </div>
    </div>
  );
}