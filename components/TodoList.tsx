'use client';

import { useState } from 'react';
import { Todo, FilterType } from '@/types';
import TodoItem from '@/components/TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = () => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) return;

    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="w-full max-w-lg">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 rounded-lg border border-red-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition-all placeholder:text-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
        <button
          onClick={addTodo}
          disabled={inputValue.trim().length === 0}
          className="rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      {todos.length > 0 && (
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-1">
            {filterButtons.map((fb) => (
              <button
                key={fb.value}
                onClick={() => setFilter(fb.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === fb.value
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                }`}
              >
                {fb.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-red-500">
            {activeCount} item{activeCount !== 1 ? 's' : ''} left
          </span>
        </div>
      )}

      {/* Todo List */}
      <ul className="mt-4 space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>

      {/* Empty State */}
      {todos.length === 0 && (
        <div className="mt-12 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-red-500">No todos yet</p>
          <p className="mt-1 text-xs text-red-400">Add your first todo above to get started!</p>
        </div>
      )}

      {/* No results for filter */}
      {todos.length > 0 && filteredTodos.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-red-400">
            No {filter} todos found.
          </p>
        </div>
      )}

      {/* Clear completed */}
      {completedCount > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearCompleted}
            className="text-xs text-red-400 underline transition-colors hover:text-red-600"
          >
            Clear completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}
