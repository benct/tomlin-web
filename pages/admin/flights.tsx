import type { NextPage } from 'next';
import { NavigationAdmin } from '../../components/page/Navigation';
import { Auth } from '../../components/Auth';
import { Flights } from '../../components/flights/Flights';

const FlightsPage: NextPage = () => (
    <Auth>
        <NavigationAdmin />
        <Flights />
    </Auth>
);

export default FlightsPage;
