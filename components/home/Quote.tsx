import { FC, useEffect, useState } from 'react';
import { mdiRefresh } from '@mdi/js';

import { quotes } from '../../util/quotes';
import { QuoteState } from '../../interfaces';
import { Box } from '../page/Box';
import { Button } from '../page/Button';

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
        <Box>
            <div className="text-center select-none max-w-narrow mx-auto" onClick={refreshQuote} role="button" tabIndex={0}>
                <div className="limit-width">{quote.text}</div>
                <div>{quote.author ? <i>- {quote.author}</i> : null}</div>
            </div>
            <Button text="Refresh" title="Show new quote" icon={mdiRefresh} size="18px" className="float-right" onClick={refreshQuote} />
        </Box>
    ) : null;
};
