import { FC, forwardRef } from 'react';
import Link from 'next/link';
import { Icon } from '@mdi/react';
import {
    mdiAirplane,
    mdiChevronDown,
    mdiClose,
    mdiFileOutline,
    mdiHomeOutline,
    mdiInformationOutline,
    mdiLogin,
    mdiLogout,
    mdiNoteOutline,
    mdiShieldLockOutline,
    mdiTelevision,
} from '@mdi/js';

import { useAppContext } from '../../data/context';
import { Button } from './Button';

interface NavigationProps {
    show: boolean;
    toggle: () => void;
}

export interface NavigationLinkProps {
    title: string;
    icon?: string;
    chevron?: boolean;
    href?: string;
    onClick?: () => void;
}

export const Navigation: FC<NavigationProps> = ({ show, toggle }) => {
    const { isLoggedIn } = useAppContext();

    const NavLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(({ onClick, href, title, icon, chevron }, ref) => (
        <a
            ref={ref}
            href={href}
            onClick={onClick}
            tabIndex={show ? 0 : -1}
            className="flex gap-16 p-8 rounded-8 hover:bg-neutral dark:hover:bg-neutral-dark">
            {icon ? <Icon path={icon} size={1} className="text-neutral dark:text-neutral-dark" /> : <span className="w-24" />}
            <span className="flex-1 text-primary dark:text-primary-dark">{title}</span>
            {chevron ? <Icon path={mdiChevronDown} size={1} className="text-neutral dark:text-neutral-dark" /> : null}
        </a>
    ));
    NavLink.displayName = 'NavLink';

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
                    <li>
                        <Link href="/" passHref>
                            <NavLink title="Home" icon={mdiHomeOutline} />
                        </Link>
                        <Link href="/about" passHref>
                            <NavLink title="About" icon={mdiInformationOutline} />
                        </Link>
                        <Link href="/media" passHref>
                            <NavLink title="Media" icon={mdiTelevision} chevron />
                        </Link>
                        <Link href="/media/movie" passHref>
                            <NavLink title="Movies" />
                        </Link>
                        <Link href="/media/tv" passHref>
                            <NavLink title="TV" />
                        </Link>
                        <Link href="/media/watchlist" passHref>
                            <NavLink title="Watchlist" />
                        </Link>
                        <Link href="/media/search" passHref>
                            <NavLink title="Search" />
                        </Link>
                        <Link href="/admin/flights" passHref>
                            <NavLink title="Flights" icon={mdiAirplane} />
                        </Link>
                        <Link href="/admin/notes" passHref>
                            <NavLink title="Notes" icon={mdiNoteOutline} />
                        </Link>
                        <Link href="/admin/files" passHref>
                            <NavLink title="Files" icon={mdiFileOutline} />
                        </Link>
                        <Link href="/admin" passHref>
                            <NavLink title="Admin" icon={mdiShieldLockOutline} chevron={isLoggedIn ?? false} />
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link href="/admin/logs" passHref>
                                    <NavLink title="Logs" />
                                </Link>
                                <Link href="/admin/visits" passHref>
                                    <NavLink title="Visits" />
                                </Link>
                                <Link href="/admin/users" passHref>
                                    <NavLink title="Users" />
                                </Link>
                                <Link href="/logout" passHref>
                                    <NavLink title="Logout" icon={mdiLogout} />
                                </Link>
                            </>
                        ) : (
                            <Link href="/login" passHref>
                                <NavLink title="Login" icon={mdiLogin} />
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
            {show ? <div className="bg-slate-900 bg-opacity-50 fixed inset-0 z-30" onClick={toggle} tabIndex={-1} /> : null}
        </>
    );
};
