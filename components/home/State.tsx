import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiInformationOutline, mdiLoading } from '@mdi/js';

import { DefaultState, HomeState } from '../../interfaces';
import { getHomeState } from '../../actions/base';

import { Time } from './Time';

export const State: FC = () => {
    const dispatch = useDispatch();
    const state = useSelector<DefaultState, HomeState & Pick<DefaultState, 'loading'>>((state) => ({
        ...state.home,
        loading: state.loading,
    }));

    useEffect(() => {
        dispatch(getHomeState());
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
                        path={state.loading ? mdiLoading : mdiInformationOutline}
                        title={state.loading ? 'Loading' : 'Information'}
                        spin={state.loading}
                        size="16px"
                        description="For security reasons, the indoor temperature readings are psuedo-random when not logged in."
                        className="help-icon"
                        id="helpIcon"
                    />
                </span>
            </div>
            <div className="home-state">
                <div className="home-temp pts">
                    {state.day !== undefined && (
                        <img
                            className="valign-middle prl"
                            src={`/images/icon/${state.day ? 'day' : 'night'}.svg`}
                            alt="Outside temperature"
                            width={54}
                            height={54}
                        />
                    )}
                    <div data-tooltip="Outdoor temperature" style={{ display: 'inline-block' }}>
                        <span className="home-value home-value-large">{state.outside ?? '-'}</span>
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
                    <img className="valign-middle prl" src={`/images/icon/home.svg`} alt="Indoor temperature" width={54} height={54} />
                    <div data-tooltip="Indoor temperature" style={{ display: 'inline-block' }}>
                        <span className="home-value home-value-large">{state.livingroom ?? '-'}</span>
                        <span className="home-unit"> &deg;C</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
