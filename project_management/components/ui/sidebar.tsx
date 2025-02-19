// Fixing missing Sidebar component
// Creating Sidebar.tsx inside components

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Settings', path: '/settings' }
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-5">
      <h2 className="text-xl font-bold mb-5">Task Manager</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={`mb-3 ${pathname === item.path ? 'text-blue-400' : ''}`}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
