import React from 'react';
import PropTypes from 'prop-types';

export default class Modal extends React.PureComponent {
    componentDidMount() {
        document.body.classList.add('no-scroll');
    }

    componentWillUnmount() {
        document.body.classList.remove('no-scroll');
    }

    render() {
        return (
            <div className="overlay" onClick={event => (event.target === event.currentTarget ? this.props.close() : null)} role="dialog">
                <div className={`wrapper overlay-container shadow ${this.props.className}`}>{this.props.children}</div>
            </div>
        );
    }
}

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
    close: PropTypes.func.isRequired,
    className: PropTypes.string,
};
