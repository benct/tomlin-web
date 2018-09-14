/** Based on https://github.com/misterfresh/react-easy-transition **/
import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';

export default class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
        this.setState({
            visible: this.props.path === nextProps.path || typeof this.props.path === 'undefined',
        });
    }

    childDidLeave() {
        this.setState({ visible: true });
    }

    render() {
        return (
            <TransitionGroup transitionName="fade" className={this.props.className} component={this.props.component || 'div'}>
                {this.state.visible && (
                    <TransitionChild key={this.props.path} childDidLeave={this.childDidLeave.bind(this)} {...this.props}>
                        {this.props.children}
                    </TransitionChild>
                )}
            </TransitionGroup>
        );
    }
}

class TransitionChild extends React.Component {
    componentWillAppear(callback) {
        this.componentFadeIn(callback);
    }

    componentWillEnter(callback) {
        this.componentFadeIn(callback);
    }

    componentFadeIn(callback) {
        Object.assign(this.page.style, this.props.initialStyle);
        Object.keys(this.props.initialStyle).forEach(property => window.getComputedStyle(this.page)[property]);
        this.page.style.transition = this.props.transition;
        Object.assign(this.page.style, this.props.finalStyle);
        let transitionsRemaining = this.props.transition.split(',').length;
        this.page.addEventListener(
            'transitionend',
            () => {
                transitionsRemaining--;
                if (transitionsRemaining) return;
                callback();
            },
            false
        );
    }

    componentWillLeave(callback) {
        let leaveStyle = this.props.leaveStyle ? this.props.leaveStyle : this.props.initialStyle;
        Object.assign(this.page.style, leaveStyle);
        let transitionsRemaining = this.props.transition.split(',').length;
        this.page.addEventListener(
            'transitionend',
            () => {
                transitionsRemaining--;
                if (transitionsRemaining) return;
                callback();
                this.props.childDidLeave();
            },
            false
        );
    }

    render() {
        return (
            <div ref={ref => (this.page = ref)} style={this.props.initialStyle}>
                {this.props.children}
            </div>
        );
    }
}

Transition.propTypes = {
    path: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    transition: PropTypes.string.isRequired,
    initialStyle: PropTypes.object.isRequired,
    finalStyle: PropTypes.object.isRequired,
    component: PropTypes.string,
    children: PropTypes.object,
};

TransitionChild.propTypes = {
    transition: PropTypes.string.isRequired,
    initialStyle: PropTypes.object.isRequired,
    leaveStyle: PropTypes.object,
    finalStyle: PropTypes.object.isRequired,
    childDidLeave: PropTypes.func.isRequired,
    children: PropTypes.object,
};
