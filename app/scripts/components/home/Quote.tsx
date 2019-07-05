import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import Icon from '@mdi/react';
import { mdiRefresh } from '@mdi/js';

import { DefaultState, QuoteState } from '../../interfaces';

import actions from '../../actions/base';

interface QuoteProps {
    text: string | null;
    author: string | null;
}

class Quote extends React.PureComponent<QuoteProps & DispatchProp, QuoteState> {
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
                <Icon path={mdiRefresh} size="16px" className="help-icon float-right" title="Show new quote" />
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
