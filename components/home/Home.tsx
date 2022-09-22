import { FC, lazy, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { DefaultState } from '../../interfaces';
import actions from '../../actions/base';

import { Countdown } from './Countdown';
import { State } from './State';
import { Quote } from './Quote';

// import '../../styles/home.css';

const Changelog = lazy(() => import('./Changelog'));

export const Home: FC = () => {
    const dispatch = useDispatch();
    const [showChangelog, setShowChangelog] = useState(false);

    const { theme, settings } = useSelector<DefaultState, Pick<DefaultState, 'theme' | 'settings'>>((state) => ({
        theme: state.theme,
        settings: state.settings,
    }));

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
                    <button className="input input-small" onClick={() => dispatch(actions.toggleTheme())}>
                        {theme}
                    </button>
                </div>
                <div className="home-info text-small">
                    Version
                    <button className="input input-small" onClick={() => setShowChangelog(!showChangelog)}>
                        2.17.0
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
