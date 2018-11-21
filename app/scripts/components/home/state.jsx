import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions/base.js';

import Time from './time.jsx';

class State extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(actions.getHomeState());
    }

    static renderState(id, value, text, unit) {
        return (
            <div className="home-state mhl mvm" data-tooltip={text}>
                <img className="valign-middle" src={require(`../../../images/icon/${id}.svg`)} alt={text} width={48} height={48} />
                <div className="mlm">
                    <span className="home-value">{value || '?'}</span>
                    <span className="home-unit"> {unit}</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="wrapper text-center no-select color-primary home-container">
                <div>
                    <div className="home-title">Home Status</div>
                    <div className="pbl">
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
                        <div className="home-state" data-tooltip="Outdoor temperature">
                            <span className="home-value home-large">{this.props.temperature.outside || '?'}</span>
                            <span className="home-unit"> &deg;C</span>
                        </div>
                    </div>
                </div>
                <div>
                    {State.renderState('livingroom', this.props.temperature.livingroom, 'Living room temperature', '°C')}
                    {State.renderState('bedroom', this.props.temperature.bedroom, 'Bedroom temperature', '°C')}
                    <br />
                    {State.renderState('kitchen', this.props.temperature.kitchen, 'Kitchen temperature', '°C')}
                    {State.renderState('bathroom', this.props.temperature.bathroom, 'Bathroom temperature', '°C')}
                    <br />
                    {State.renderState('tv', this.props.consumption.tv, 'PC power consumption [30d]', 'kWh')}
                    {State.renderState('pc', this.props.consumption.pc, 'TV power consumption [30d]', 'kWh')}
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
