import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action } from 'redux';

import { DefaultState, ThunkDispatchProp } from '../../interfaces';
import actions from '../../actions/base';

import Countdown from './Countdown';
import State from './State';
import Quote from './Quote';

import '../../../styles/home.css';

type HomeProps = Pick<DefaultState, 'theme' | 'settings'> & ThunkDispatchProp;

const Changelog = React.lazy(() => import('./Changelog'));

const Home: React.FC<HomeProps> = ({ theme, settings, dispatch }): React.ReactElement => {
    const [showChangelog, setShowChangelog] = React.useState(false);

    return (
        <>
            <div className="wrapper text">
                <h2 className="home-title color-primary man mbm">Hello</h2>
                <p className="limit-width mvl">
                    This site is just a personal website project I doodle with from time to time. See more about me{' '}
                    <Link to="/about">here</Link> or follow the social media links at the bottom of the page.
                </p>
                <div className="home-info text-small">
                    Theme
                    <button className="input input-small" onClick={(): Action => dispatch(actions.toggleTheme())}>
                        {theme}
                    </button>
                </div>
                <div className="home-info text-small">
                    Version
                    <button className="input input-small" onClick={(): void => setShowChangelog(!showChangelog)}>
                        2.13.2
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
                    <Changelog close={(): void => setShowChangelog(false)} />
                </React.Suspense>
            )}
        </>
    );
};

export default connect((state: DefaultState) => ({ theme: state.theme, settings: state.settings }))(React.memo(Home));
