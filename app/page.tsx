import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Todo App
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Stay organized. Get things done.
        </p>
      </div>
      <TodoList />
    </main>
  );
}
