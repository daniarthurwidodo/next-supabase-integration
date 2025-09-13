'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My App</h1>
          <nav className="flex space-x-4">
            <Link 
              href="/admin/dashboard" 
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname.startsWith('/admin') 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              Admin Dashboard
            </Link>
            <Link 
              href="/login" 
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname === '/login' 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                pathname === '/register' 
                  ? 'bg-gray-900 text-white dark:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-700 hover:text-white dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              Register
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}