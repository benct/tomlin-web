import React from 'react';
import PropTypes from 'prop-types';

export default class Time extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            time: new Date().toLocaleTimeString(props.locale, { timeZone: props.timeZone }),
        };
    }

    componentDidMount() {
        this.tick();
        this.interval = window.setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    tick() {
        this.setState({ time: new Date().toLocaleTimeString(this.props.locale, { timeZone: this.props.timeZone }) });
    }

    render() {
        return <>{this.state.time}</>;
    }
}

Time.propTypes = {
    locale: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired,
};
