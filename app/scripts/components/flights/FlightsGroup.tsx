import React from 'react';
import Icon from '@mdi/react';
import { mdiBriefcaseEditOutline, mdiChevronDown, mdiChevronUp } from '@mdi/js';

import { Flight } from '../../interfaces';
import { formatDate } from '../../util/formatting';

interface FlightGroupProps {
    flights: Flight[];
    edit: (flight: Flight) => void;
}

const FlightsGroup: React.FC<FlightGroupProps> = ({ flights, edit }): React.ReactElement => {
    const [showFlights, setShowFlights] = React.useState<boolean>(false);

    const isSimple =
        flights.length === 1 ||
        (flights.length === 2 && flights[0].origin === flights[1].destination && flights[0].destination === flights[1].origin);

    const locations = isSimple
        ? `${flights[0].origin} - ${flights[0].destination}`
        : flights
              .flatMap((flight: Flight): string[] => [flight.origin ?? '', flight.destination ?? ''])
              .filter(
                  (location: string, idx: number, arr: string[]): boolean => location !== '' && (idx === 0 || arr[idx - 1] !== location)
              )
              .join(' - ');

    return (
        <>
            <tr onClick={(): void => setShowFlights(!showFlights)} role="button">
                <td className="no-wrap">{formatDate(flights[0].departure)}</td>
                <td className="no-wrap hide-lt600">{flights.length > 1 ? formatDate(flights[flights.length - 1].arrival) : '—'}</td>
                <td>{locations}</td>
                <td className="text-right">
                    <button className="button-icon pan">
                        <Icon path={showFlights ? mdiChevronUp : mdiChevronDown} size="20px" title="Show flights" />
                    </button>
                </td>
            </tr>
            {showFlights &&
                flights.map(
                    (flight: Flight): React.ReactElement => (
                        <tr key={`flight${flight.id}`} className="admin-flight-group">
                            <td className="no-wrap">{formatDate(flight.departure)}</td>
                            <td>
                                <div className="grid grid-col-2">
                                    <span>{flight.origin}</span>
                                    <span>{flight.destination}</span>
                                </div>
                            </td>
                            <td className="hide-lt600">
                                <div className="grid grid-col-3">
                                    <span>{`${flight.carrier} ${flight.number}`}</span>
                                    <span>{flight.aircraft ?? '—'}</span>
                                    <span>{flight.seat ?? '—'}</span>
                                </div>
                            </td>
                            <td className="text-right">
                                <button className="button-icon pan" onClick={(): void => edit(flight)}>
                                    <Icon path={mdiBriefcaseEditOutline} size="20px" title="Edit" />
                                </button>
                            </td>
                        </tr>
                    )
                )}
        </>
    );
};

export default FlightsGroup;
