import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiLoading } from '@mdi/js';

import { DefaultState, HomeState, ThunkDispatchProp } from '../../interfaces';
import { getHomeState } from '../../actions/base';

import Time from './Time';

type HomeStateProps = HomeState & Pick<DefaultState, 'loading'>;

const State: React.FC<HomeStateProps & ThunkDispatchProp> = props => {
    React.useEffect(() => {
        props.dispatch(getHomeState());
    }, []);

    return (
        <div className="wrapper text-center no-select">
            <div className="home-title color-primary pll">
                Home Status
                <span
                    className="valign-middle mlm"
                    data-tooltip="For security reasons, the indoor temperature readings are psuedo-random when not logged in."
                    data-tooltip-large>
                    <Icon
                        path={props.loading ? mdiLoading : mdiInformationOutline}
                        title={props.loading ? 'Loading' : 'Information'}
                        spin={props.loading}
                        size="16px"
                        description="For security reasons, the indoor temperature readings are psuedo-random when not logged in."
                        className="help-icon"
                    />
                </span>
            </div>
            <div className="home-state">
                <div className="home-temp pts">
                    {props.day !== undefined && (
                        <img
                            className="valign-middle prl"
                            src={require(`../../../images/icon/${props.day ? 'day' : 'night'}.svg`)}
                            alt="Outside temperature"
                            width={54}
                            height={54}
                        />
                    )}
                    <div data-tooltip="Outdoor temperature" style={{ display: 'inline-block' }}>
                        <span className="home-value home-value-large">{props.outside ?? '-'}</span>
                        <span className="home-unit"> &deg;C</span>
                    </div>
                </div>
                <div className="home-time">
                    <span className="home-unit">Oslo</span>
                    <br />
                    <span className="home-value">
                        <Time locale="nb-NO" timeZone="Europe/Oslo" />
                    </span>
                </div>
                <div className="home-temp pts">
                    <img
                        className="valign-middle prl"
                        src={require(`../../../images/icon/home.svg`)}
                        alt="Indoor temperature"
                        width={54}
                        height={54}
                    />
                    <div data-tooltip="Indoor temperature" style={{ display: 'inline-block' }}>
                        <span className="home-value home-value-large">{props.livingroom ?? '-'}</span>
                        <span className="home-unit"> &deg;C</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state: DefaultState): HomeStateProps => ({
        livingroom: state.home.livingroom,
        outside: state.home.outside,
        day: state.home.day,
        loading: state.loading,
    })
)(State);
