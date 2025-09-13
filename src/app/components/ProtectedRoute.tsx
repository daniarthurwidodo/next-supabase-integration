'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    // In a real app, you would check your auth state here
    const isAuthenticated = false; // Simulate not authenticated

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push('/login');
    } else {
      // User is authenticated, stop loading
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}