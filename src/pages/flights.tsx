import type { NextPage } from 'next';
import { Auth } from '@/components/Auth';
import { Default } from '@/components/page/Default';
import { Flights } from '@/components/flights/Flights';

const FlightsPage: NextPage = () => (
    <Default title="Flights">
        <Auth role="private">
            <Flights />
        </Auth>
    </Default>
);

export default FlightsPage;
