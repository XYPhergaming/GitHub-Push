'use client';

import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {user.uid}
        </p>
      </div>
      <Button onClick={handleLogout} variant="secondary" className="w-full mt-6">
        Sign Out
      </Button>
    </div>
  );
}