import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiRefresh } from '@mdi/js';

import { DefaultState, QuoteState } from '../../interfaces';

import actions from '../../actions/base';

export const Quote: FC = () => {
    const dispatch = useDispatch();
    const { text, author } = useSelector((state: DefaultState): QuoteState => ({ ...state.quote }));

    const refreshQuote = (): void => {
        dispatch(actions.refreshQuote());
    };

    useEffect(() => {
        refreshQuote();
    }, []);

    return text ? (
        <div className="wrapper text-center no-select" onClick={refreshQuote} role="button" tabIndex={0}>
            <div className="limit-width">{text}</div>
            <div>{author ? <i>- {author}</i> : null}</div>
            <Icon path={mdiRefresh} size="16px" className="help-icon float-right" title="Show new quote" id="refreshIcon" />
        </div>
    ) : null;
};
