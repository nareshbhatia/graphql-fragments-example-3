import Link from 'next/link';

export default function HelloPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Hello World
      </h1>

      <nav className="mt-16">
        <ul className="text-sm flex items-center gap-x-4 uppercase">
          <Link href="/">&lt; Back</Link>
        </ul>
      </nav>
    </div>
  );
}
