import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../actions/base.js';

import { RefreshIcon } from '../page/icons.jsx';

class Quote extends React.PureComponent {
    componentDidMount() {
        this.refreshQuote();
    }

    refreshQuote() {
        this.props.dispatch(actions.refreshQuote());
    }

    render() {
        return this.props.text ? (
            <div className="wrapper text-center pointer no-select" onClick={this.refreshQuote.bind(this)} role="button" tabIndex="0">
                <div>{this.props.text}</div>
                <div>{this.props.author ? <i>- {this.props.author}</i> : null}</div>
                <RefreshIcon className="right-icon" fill="#ddd" />
            </div>
        ) : null;
    }
}

Quote.propTypes = {
    dispatch: PropTypes.func.isRequired,
    text: PropTypes.string,
    author: PropTypes.string,
};

export default connect(state => ({
    text: state.quote.text,
    author: state.quote.author,
}))(Quote);
