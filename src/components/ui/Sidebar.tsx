'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Timer, Gauge, Settings, CloudIcon, FlagTriangleRight } from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Lap Timer', href: '/laptimer', icon: FlagTriangleRight },
    { name: 'Drag Meter', href: '/dragmeter', icon: Timer },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <Gauge size={28} />
                <span>MuchRacing</span>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(styles.navItem, isActive && styles.navItemActive)}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <CloudIcon size={16} />
                <span>Connected</span>
            </div>
        </aside>
    );
}
