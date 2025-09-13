import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to login page as it's now the homepage
  redirect('/login');
}
