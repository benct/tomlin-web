import { FC, lazy, Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

import { Countdown } from './Countdown';
import { State } from './State';
import { Quote } from './Quote';
import { useAppContext } from '../../data/context';

// import '../../styles/home.css';

const Changelog = lazy(() => import('./Changelog'));

export const Home: FC = () => {
    const [showChangelog, setShowChangelog] = useState(false);
    const [theme, setTheme] = useState('default');

    const { settings } = useAppContext();

    useEffect(() => {
        setTheme(window.localStorage.getItem('theme') ?? 'default');
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'default' ? 'midnight' : 'default';
        document.body.classList.remove('default', 'midnight');
        document.body.classList.add(nextTheme);
        window.localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    };

    return (
        <>
            <div className="wrapper text">
                <h2 className="home-title color-primary man mbm">Hello..</h2>
                <p className="limit-width mvl">
                    This site is just a personal website project I doodle with from time to time. See more in the{' '}
                    <Link href="/about">about section</Link> or follow the social media links at the bottom of the page.
                </p>
                <div className="home-info text-small">
                    Theme
                    <button className="input input-small" onClick={() => toggleTheme()}>
                        {theme}
                    </button>
                </div>
                <div className="home-info text-small">
                    Version
                    <button className="input input-small" onClick={() => setShowChangelog(!showChangelog)}>
                        3.0.0
                    </button>
                </div>
            </div>
            <hr />
            <State />
            <hr />
            <Countdown title="Countdown to something..." timestamp={settings.countdownTarget} icon={settings.countdownIcon} />
            <hr />
            <Quote />
            {showChangelog && (
                <Suspense fallback={null}>
                    <Changelog close={() => setShowChangelog(false)} />
                </Suspense>
            )}
        </>
    );
};
