import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions/base.js';

import Time from './time.tsx';

class State extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(actions.getHomeState());
    }

    static renderState(id, value, text, unit = '°C') {
        return (
            <div className="home-state" data-tooltip={text}>
                <div className="text-right">
                    <img className="valign-middle" src={require(`../../../images/icon/${id}.svg`)} alt={text} width={40} height={40} />
                </div>
                <div className="text-left">
                    <span className="home-value">{value ? Number(value).toFixed(1) : '-'}</span>
                    <span className="home-unit"> {unit}</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="wrapper text-center no-select color-primary home-container">
                <div className="home-header">
                    <div className="home-title">
                        Home Status
                        <span
                            className="valign-middle mlm"
                            data-tooltip="For security reasons, the indoor temperature readings are psuedo-random when not logged in."
                            data-tooltip-large>
                            <img className="help-icon" src={require(`../../../images/icon/info.svg`)} alt="Information" />
                        </span>
                    </div>
                    <div className="">
                        <span className="home-unit">Oslo</span>
                        <br />
                        <span className="home-value">
                            <Time locale="nb-NO" timeZone="Europe/Oslo" />
                        </span>
                    </div>
                    <div className="ptm">
                        <img
                            className="valign-middle phm"
                            src={require(`../../../images/icon/${this.props.day ? 'day' : 'night'}.svg`)}
                            alt="Outside temperature"
                            width={54}
                            height={54}
                        />
                        <div className="phm" data-tooltip="Outdoor temperature" style={{ display: 'inline-block' }}>
                            <span className="home-value home-large">{this.props.temperature.outside || '-'}</span>
                            <span className="home-unit"> &deg;C</span>
                        </div>
                    </div>
                </div>
                <div className="home-sensors">
                    {State.renderState('livingroom', this.props.temperature.livingroom, 'Living room temperature')}
                    {State.renderState('office', this.props.temperature.office, 'Office temperature')}
                    {State.renderState('bedroom', this.props.temperature.bedroom, 'Bedroom temperature')}
                    {State.renderState('storeroom', this.props.temperature.storeroom, 'Storage room temperature')}
                    {State.renderState('kitchen', this.props.temperature.kitchen, 'Kitchen temperature')}
                    {State.renderState('computer', this.props.consumption.pc, 'PC consumption [30d]', 'kWh')}
                    {State.renderState('bathroom', this.props.temperature.bathroom, 'Bathroom temperature')}
                    {State.renderState('tv', this.props.consumption.tv, 'TV/Sound consumption [30d]', 'kWh')}
                </div>
            </div>
        );
    }
}

State.propTypes = {
    dispatch: PropTypes.func.isRequired,
    temperature: PropTypes.object.isRequired,
    consumption: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    day: PropTypes.bool.isRequired,
};

export default connect(state => ({
    temperature: state.home.temperature,
    consumption: state.home.consumption,
    network: state.home.network,
    day: state.home.day,
}))(State);
