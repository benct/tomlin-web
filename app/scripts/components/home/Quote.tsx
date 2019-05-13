import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DefaultState, QuoteState } from '../../interfaces';
import actions from '../../actions/base.js';

interface QuoteProps {
    dispatch: Dispatch;
    text: string | null;
    author: string | null;
}

class Quote extends React.PureComponent<QuoteProps, QuoteState> {
    componentDidMount(): void {
        this.refreshQuote();
    }

    refreshQuote(): void {
        this.props.dispatch(actions.refreshQuote());
    }

    render(): React.ReactNode {
        return this.props.text ? (
            <div className="wrapper text-center pointer no-select" onClick={this.refreshQuote.bind(this)} role="button" tabIndex={0}>
                <div>{this.props.text}</div>
                <div>{this.props.author ? <i>- {this.props.author}</i> : null}</div>
                <img className="help-icon float-right" src={require('../../../images/icon/refresh.svg')} alt="Load new quote" />
            </div>
        ) : null;
    }
}

export default connect(
    (state: DefaultState): QuoteState => ({
        text: state.quote.text,
        author: state.quote.author,
        current: state.quote.current,
    })
)(Quote);
