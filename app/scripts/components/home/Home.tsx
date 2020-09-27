import React, { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { DefaultState } from '../../interfaces';
import actions from '../../actions/base';

import Countdown from './Countdown';
import State from './State';
import Quote from './Quote';

import '../../../styles/home.css';

const Changelog = lazy(() => import('./Changelog'));

const Home: React.FC = () => {
    const [showChangelog, setShowChangelog] = useState(false);

    const dispatch = useDispatch();
    const { theme, settings } = useSelector<DefaultState, Pick<DefaultState, 'theme' | 'settings'>>((state) => ({
        theme: state.theme,
        settings: state.settings,
    }));

    return (
        <>
            <div className="wrapper text">
                <h2 className="home-title color-primary man mbm">Hello</h2>
                <p className="limit-width mvl">
                    This site is just a personal website project I doodle with from time to time. See more in the{' '}
                    <Link to="/about">about section</Link> or follow the social media links at the bottom of the page.
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
                        2.15.0
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
                <React.Suspense fallback={null}>
                    <Changelog close={() => setShowChangelog(false)} />
                </React.Suspense>
            )}
        </>
    );
};

export default React.memo(Home);
