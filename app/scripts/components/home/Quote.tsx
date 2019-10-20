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

const Quote: React.FC<QuoteProps & DispatchProp> = ({ text, author, dispatch }) => {
    const refreshQuote = (): void => {
        dispatch(actions.refreshQuote());
    };

    React.useEffect(() => {
        refreshQuote();
    }, []);

    return text ? (
        <div className="wrapper text-center pointer no-select" onClick={refreshQuote} role="button" tabIndex={0}>
            <div className="limit-width">{text}</div>
            <div>{author ? <i>- {author}</i> : null}</div>
            <Icon path={mdiRefresh} size="16px" className="help-icon float-right" title="Show new quote" />
        </div>
    ) : null;
};

export default connect(
    (state: DefaultState): QuoteState => ({
        text: state.quote.text,
        author: state.quote.author,
        current: state.quote.current,
    })
)(Quote);
