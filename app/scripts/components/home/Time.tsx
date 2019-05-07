import React from 'react';

interface TimeProps {
    locale: string;
    timeZone: string;
}

interface TimeState {
    time: string;
}

export default class Time extends React.PureComponent<TimeProps, TimeState> {
    interval: number;

    constructor(props: TimeProps) {
        super(props);

        this.interval = 0;

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
