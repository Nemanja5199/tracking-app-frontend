'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Tracking App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link 
              href="/overview" 
              className={pathname === '/overview' ? 'active' : ''}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link 
              href="/upload" 
              className={pathname === '/upload' ? 'active' : ''}
            >
              Upload
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};