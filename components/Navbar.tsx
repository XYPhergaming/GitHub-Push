'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import Button from './Button';

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', public: true },
    { href: '/chat', label: 'Chat', protected: true },
    { href: '/profile', label: 'Profile', protected: true },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Mini Chat
        </Link>

        <div className="flex gap-4">
          {navLinks.map((link) => {
            if (link.protected && !user) return null;
            if (link.public && user) return null; // hide home if logged in
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  pathname === link.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}