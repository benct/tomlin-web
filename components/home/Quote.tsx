import { FC, useEffect, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiRefresh } from '@mdi/js';

import { quotes } from '../../util/quotes';
import { QuoteState } from '../../interfaces';

export const Quote: FC = () => {
    const [quote, setQuote] = useState<QuoteState>({
        text: null,
        author: null,
        current: Math.floor(Math.random() * quotes.length),
    });

    const refreshQuote = (): void => {
        setQuote({
            text: quotes[quote.current][0],
            author: quotes[quote.current].length > 1 ? quotes[quote.current][1] : null,
            current: quote.current === quotes.length - 1 ? 0 : quote.current + 1,
        });
    };

    useEffect(() => {
        refreshQuote();
    }, []);

    return quote.text ? (
        <div className="wrapper text-center no-select" onClick={refreshQuote} role="button" tabIndex={0}>
            <div className="limit-width">{quote.text}</div>
            <div>{quote.author ? <i>- {quote.author}</i> : null}</div>
            <Icon path={mdiRefresh} size="16px" className="help-icon float-right" title="Show new quote" id="refreshIcon" />
        </div>
    ) : null;
};
