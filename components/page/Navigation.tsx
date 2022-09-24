import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';

import { useAppContext } from '../../data/context';

interface NavigationProps {
    type?: string;
    data?: NavigationItem[];
}

export interface NavigationItem {
    text: string;
    path: string;
    exact?: boolean;
    hide?: boolean;
}

export const Navigation: FC<NavigationProps> = ({ type, data }) => {
    const { isLoggedIn } = useAppContext();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const menu = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about' },
        { text: 'Media', path: '/media' },
        { text: 'Admin', path: '/admin' },
        { text: 'Logout', path: '/logout', hide: !isLoggedIn },
        { text: 'Login', path: '/login', hide: !!isLoggedIn },
    ];

    const createLink = (item: NavigationItem, idx: number): ReactNode =>
        item.hide ? null : (
            <li key={`menuList${idx}`}>
                <Link href={item.path}>{item.text}</Link>
            </li>
        );

    switch (type) {
        case 'simple':
            return (
                <nav className="menu-top hide-lt480">
                    <ul className="no-select menu menu-simple">{menu.map(createLink)}</ul>
                </nav>
            );
        case 'sub':
            return (
                <nav className="color-bg pvl">
                    <ul className="no-select menu menu-simple menu-sub">{data?.map(createLink)}</ul>
                </nav>
            );
        case 'full':
        default:
            return (
                <>
                    <nav
                        className="menu-wrap"
                        style={{ left: showMenu ? '0px' : '100%' }}
                        onClick={(): void => setShowMenu(!showMenu)}
                        role="dialog">
                        <ul className="no-select menu menu-full" style={{ opacity: showMenu ? 1 : 0 }}>
                            {menu.map(createLink)}
                        </ul>
                    </nav>
                    <button className="menu-overlay button-blank hide-gt480" aria-label="Menu" onClick={() => setShowMenu(!showMenu)}>
                        &nbsp;
                    </button>
                </>
            );
    }
};

export const NavigationMedia: FC = () => (
    <Navigation
        type="sub"
        data={[
            { text: 'Movies', path: '/media/movie' },
            { text: 'TV-Shows', path: '/media/tv' },
            { text: 'Watchlist', path: '/media/watchlist' },
            { text: 'Search', path: '/media/search' },
        ]}
    />
);

export const NavigationAdmin: FC = () => (
    <Navigation
        type="sub"
        data={[
            { text: 'Logs', path: '/admin/logs' },
            { text: 'Visits', path: '/admin/visits' },
            { text: 'Users', path: '/admin/users' },
            { text: 'Flights', path: '/admin/flights' },
            { text: 'Notes', path: '/admin/notes' },
            { text: 'Files', path: '/admin/files' },
        ]}
    />
);
