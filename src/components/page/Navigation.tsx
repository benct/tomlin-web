import Link from 'next/link';
import { Icon } from '@mdi/react';
import {
    mdiAirplane,
    mdiChartBoxOutline,
    mdiChevronDown,
    mdiClose,
    mdiFileOutline,
    mdiHomeOutline,
    mdiHomeSearchOutline,
    mdiInformationOutline,
    mdiLogin,
    mdiLogout,
    mdiNoteOutline,
    mdiShieldLockOutline,
    mdiTelevision,
    mdiToolboxOutline,
} from '@mdi/js';

import { useAppContext } from '@/data/context';
import { Button } from './Button';

interface NavigationProps {
    show: boolean;
    toggle: () => void;
}

export interface NavigationLinkProps {
    title: string;
    href: string;
    icon?: string;
    chevron?: boolean;
    prefetch?: boolean;
}

export const Navigation = ({ show, toggle }: NavigationProps) => {
    const { isLoggedIn, hasPermission } = useAppContext();

    const NavLink = ({ title, href, icon, chevron, prefetch = false }: NavigationLinkProps) => (
        <li>
            <Link
                href={href}
                onClick={toggle}
                tabIndex={show ? 0 : -1}
                className="flex gap-16 p-8 rounded-8 hover:bg-neutral dark:hover:bg-neutral-dark"
                prefetch={prefetch ? undefined : false}>
                {icon ? <Icon path={icon} size={1} className="text-neutral dark:text-neutral-dark" /> : <span className="w-24" />}
                <span className="flex-1 text-primary dark:text-primary-dark">{title}</span>
                {chevron ? <Icon path={mdiChevronDown} size={1} className="text-neutral dark:text-neutral-dark" /> : null}
            </Link>
        </li>
    );

    return (
        <>
            <nav
                className={`fixed z-40 h-screen p-16 overflow-y-auto bg-white w-256 dark:bg-slate-800 transition-transform left-0 top-0 ${
                    show ? 'transform-none' : '-translate-x-full'
                }`}
                tabIndex={-1}
                aria-labelledby="menu-title"
                aria-hidden={!show}
                aria-modal={show}
                role={show ? 'dialog' : 'none'}>
                <div className="flex justify-between items-center">
                    <h2 id="menu-title" className="text-neutral dark:text-neutral-dark uppercase">
                        Menu
                    </h2>
                    <Button text="Close" icon={mdiClose} onClick={toggle} tabIndex={show ? 0 : -1} />
                </div>
                <ul className="space-y-4 py-16">
                    <NavLink href="/" title="Home" icon={mdiHomeOutline} prefetch />
                    <NavLink href="/tools" title="Tools" icon={mdiToolboxOutline} prefetch />
                    <NavLink href="/about" title="About" icon={mdiInformationOutline} prefetch />
                    <hr className="dark:border-t-slate-400" />
                    <NavLink href="/media" title="Media" icon={mdiTelevision} chevron={isLoggedIn ?? false} />
                    {hasPermission('media') && (
                        <>
                            <NavLink href="/media/movie" title="Movies" />
                            <NavLink href="/media/tv" title="TV" />
                            <NavLink href="/media/watchlist" title="Watchlist" />
                            <NavLink href="/media/search" title="Search" />
                        </>
                    )}
                    <NavLink href="/flights" title="Flights" icon={mdiAirplane} />
                    <NavLink href="/notes" title="Notes" icon={mdiNoteOutline} />
                    <NavLink href="/files" title="Files" icon={mdiFileOutline} />
                    <NavLink href="/ratings" title="Ratings" icon={mdiChartBoxOutline} />
                    <NavLink href="/admin" title="Admin" icon={mdiShieldLockOutline} chevron={isLoggedIn ?? false} />
                    {hasPermission('admin') && (
                        <>
                            <NavLink href="/admin/logs" title="Logs" />
                            <NavLink href="/admin/visits" title="Visits" />
                            <NavLink href="/admin/users" title="Users" />
                            <NavLink href="/finn" title="Finn" icon={mdiHomeSearchOutline} />
                        </>
                    )}
                    <hr className="dark:border-t-slate-400" />
                    {isLoggedIn ? (
                        <NavLink href="/logout" title="Logout" icon={mdiLogout} />
                    ) : (
                        <NavLink href="/login" title="Login" icon={mdiLogin} />
                    )}
                </ul>
            </nav>
            {show ? <div className="bg-slate-900 bg-opacity-50 fixed inset-0 z-30" onClick={toggle} tabIndex={-1} /> : null}
        </>
    );
};
