"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Task Manager</h2>
        <ul>
          <li><Link href="/dashboard">Home</Link></li>
          <li><Link href="/dashboard/tasks">Tasks</Link></li>
          <li><Link href="/dashboard/projects">Projects</Link></li>
        </ul>
        <button className="mt-4 bg-red-500 py-2 px-4 w-full rounded" onClick={() => signOut()}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
