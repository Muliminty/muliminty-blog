'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <span className="text-neon" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              ✨ Muliminty
            </span>
          </Link>

          {/* 导航链接 */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx('nav-link', {
                    active: pathname === item.href,
                  })}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
