import { FC } from 'react';
import { Icon } from '@mdi/react';
import { mdiInformationOutline, mdiLoading } from '@mdi/js';

import { useHomeState } from '../../data/base';
import { Time } from './Time';

export const State: FC = () => {
    const { data, loading } = useHomeState();

    return (
        <div className="wrapper text-center no-select">
            <div className="home-title color-primary pll">
                Home Status
                <span
                    className="valign-middle mlm"
                    data-tooltip="For security reasons, the indoor temperature readings are psuedo-random when not logged in."
                    data-tooltip-large="true">
                    <Icon
                        path={loading ? mdiLoading : mdiInformationOutline}
                        title={loading ? 'Loading' : 'Information'}
                        spin={loading}
                        size="16px"
                        description="For security reasons, the indoor temperature readings are psuedo-random when not logged in."
                        className="help-icon"
                        id="helpIcon"
                    />
                </span>
            </div>
            <div className="home-state">
                <div className="home-temp pts">
                    {data?.day !== undefined && (
                        <img
                            className="valign-middle prl"
                            src={`/images/icon/${data.day ? 'day' : 'night'}.svg`}
                            alt="Outside temperature"
                            width={54}
                            height={54}
                        />
                    )}
                    <div data-tooltip="Outdoor temperature" style={{ display: 'inline-block' }}>
                        <span className="home-value home-value-large">{data?.outside ?? '-'}</span>
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
                        <span className="home-value home-value-large">{data?.livingroom ?? '-'}</span>
                        <span className="home-unit"> &deg;C</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
