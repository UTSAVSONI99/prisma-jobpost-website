"use client"
import Link from 'next/link'
import Image from 'next/image'
import {  useSession } from 'next-auth/react';

import { logout } from '@/lib/auth';

export default function Navbar() {
  const{data:session} = useSession();
  return (
    <header className='sticky top-0 z-40 border-b border-[#e7dfcf]/70 bg-[#fffdf8]/90 backdrop-blur'>
      <nav className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        <Link href="/" className='flex items-center gap-3'>
          <div className='rounded-full bg-[#0f766e]/10 p-1.5 ring-1 ring-[#0f766e]/20'>
            <Image src="/logo.png" alt="Job Board Logo" width={34} height={34} className='h-7 w-auto' />
          </div>
          <span className='text-lg font-semibold tracking-tight text-[#1f2937]'>
            Job Board
          </span>
        </Link>

        <div className='flex items-center gap-1.5 sm:gap-3'>
          <Link href="/jobs" className='rounded-full px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#efe7d8] hover:text-[#1f2937]'>
            Browse Jobs
          </Link>

          {session ? (
            <>
              <Link href="/jobs/post" className='rounded-full px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#efe7d8] hover:text-[#1f2937]'>
                Post Job
              </Link>
              <Link href="/dashboard" className='rounded-full px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#efe7d8] hover:text-[#1f2937]'>
                Dashboard
              </Link>
              <button
                className='rounded-full border border-[#d9ccb7] bg-white px-3 py-2 text-sm font-medium text-[#6b7280] hover:border-[#c9b79c] hover:text-[#1f2937]'
                onClick={logout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className='rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#115e59]'>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
