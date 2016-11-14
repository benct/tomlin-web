/** Based on https://github.com/misterfresh/react-easy-transition **/
import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

export default class Transition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: (this.props.path === nextProps.path || (typeof this.props.path === 'undefined'))
        });
    }

    childDidLeave() {
        this.setState({
            visible: true
        });
    }

    render() {
        return (
            <ReactTransitionGroup transitionName="fade" className={this.props.className}
                                  component={this.props.component || "div"}>
                {this.state.visible &&
                <TransitionChild key={this.props.path} childDidLeave={this.childDidLeave.bind(this)} {...this.props}>
                    {this.props.children}
                </TransitionChild>}
            </ReactTransitionGroup>
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
        this.page.addEventListener("transitionend", (event) => {
            transitionsRemaining--;
            if (transitionsRemaining) return;
            callback();
        }, false);
    }

    componentWillLeave(callback) {
        let leaveStyle = this.props.leaveStyle ? this.props.leaveStyle : this.props.initialStyle;
        Object.assign(this.page.style, leaveStyle);
        let transitionsRemaining = this.props.transition.split(',').length;
        this.page.addEventListener("transitionend", (event) => {
            transitionsRemaining--;
            if (transitionsRemaining) return;
            callback();
            this.props.childDidLeave();
        }, false);
    }

    render() {
        return <div ref={(ref) => this.page = ref} style={this.props.initialStyle}>
            {this.props.children}
        </div>
    }
}