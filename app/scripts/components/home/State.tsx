import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiLoading } from '@mdi/js';

import { DefaultState, HomeState, ThunkDispatchProp } from '../../interfaces';
import { getHomeState } from '../../actions/base';

import {
    BathroomIcon,
    BedroomIcon,
    ComputerIcon,
    KitchenIcon,
    LivingRoomIcon,
    OfficeIcon,
    StateIconProps,
    StoreRoomIcon,
    TvIcon,
} from './StateIcons';
import Time from './Time';

type HomeStateProps = HomeState & Pick<DefaultState, 'loading'>;

const State: React.FC<HomeStateProps & ThunkDispatchProp> = props => {
    React.useEffect(() => {
        props.dispatch(getHomeState());
    }, []);

    const renderState = (Icon: React.FC<StateIconProps>, value?: number, text?: string, unit = '°C'): React.ReactElement => (
        <div className="home-state" data-tooltip={text}>
            <div className="text-right">
                <Icon className="valign-middle" alt={text} width={40} height={40} />
            </div>
            <div className="text-left">
                <span className="home-value">{value ? Number(value).toFixed(1) : '-'}</span>
                <span className="home-unit"> {unit}</span>
            </div>
        </div>
    );

    return (
        <div className="wrapper text-center no-select home-container">
            <div className="home-header">
                <div className="home-title color-primary">
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
                <div>
                    <span className="home-unit">Oslo</span>
                    <br />
                    <span className="home-value">
                        <Time locale="nb-NO" timeZone="Europe/Oslo" />
                    </span>
                </div>
                <div className="ptm">
                    <img
                        className="valign-middle phm"
                        src={require(`../../../images/icon/${props.day ? 'day' : 'night'}.svg`)}
                        alt="Outside temperature"
                        width={54}
                        height={54}
                    />
                    <div className="phm" data-tooltip="Outdoor temperature" style={{ display: 'inline-block' }}>
                        <span className="home-value home-large">{props.temperature.outside || '-'}</span>
                        <span className="home-unit"> &deg;C</span>
                    </div>
                </div>
            </div>
            <div className="home-sensors">
                {renderState(LivingRoomIcon, props.temperature.livingroom, 'Living room temperature')}
                {renderState(OfficeIcon, props.temperature.office, 'Office temperature')}
                {renderState(BedroomIcon, props.temperature.bedroom, 'Bedroom temperature')}
                {renderState(StoreRoomIcon, props.temperature.storeroom, 'Storage room temperature')}
                {renderState(KitchenIcon, props.temperature.kitchen, 'Kitchen temperature')}
                {renderState(ComputerIcon, props.consumption.pc, 'PC consumption [30d]', 'kWh')}
                {renderState(BathroomIcon, props.temperature.bathroom, 'Bathroom temperature')}
                {renderState(TvIcon, props.consumption.tv, 'TV/Sound consumption [30d]', 'kWh')}
            </div>
        </div>
    );
};

export default connect(
    (state: DefaultState): HomeStateProps => ({
        temperature: state.home.temperature,
        consumption: state.home.consumption,
        day: state.home.day,
        loading: state.loading,
    })
)(State);
