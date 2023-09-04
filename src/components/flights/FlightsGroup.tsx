import { useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiBriefcaseEditOutline, mdiChevronDown, mdiChevronUp } from '@mdi/js';

import { formatDate } from '@/util/formatting';
import { Flight } from '@/interfaces';
import { Button } from '@/components/page/Button';

interface FlightGroupProps {
    flights: Flight[];
    edit: (flight: Flight) => void;
}

export const FlightsGroup = ({ flights, edit }: FlightGroupProps) => {
    const [showFlights, setShowFlights] = useState<boolean>(false);

    const isSimple =
        flights.length === 1 ||
        (flights.length === 2 && flights[0].origin === flights[1].destination && flights[0].destination === flights[1].origin);

    const locations = isSimple
        ? `${flights[0].origin} - ${flights[0].destination}`
        : flights
              .flatMap((flight: Flight): string[] => [flight.origin ?? '', flight.destination ?? ''])
              .filter(
                  (location: string, idx: number, arr: string[]): boolean => location !== '' && (idx === 0 || arr[idx - 1] !== location),
              )
              .join(' - ');

    return (
        <>
            <tr className="odd:bg-slate-100 dark:odd:bg-slate-800" onClick={(): void => setShowFlights(!showFlights)} role="button">
                <td className="p-4 whitespace-nowrap">{formatDate(flights[0].departure)}</td>
                <td className="p-4 whitespace-nowrap hidden sm:table-cell">
                    {flights.length > 1 ? formatDate(flights[flights.length - 1].arrival) : '—'}
                </td>
                <td className="p-4">{locations}</td>
                <td className="p-4 text-center">
                    <Icon path={showFlights ? mdiChevronUp : mdiChevronDown} size="20px" title="Show flights" className="inline" />
                </td>
            </tr>
            {showFlights &&
                flights.map((flight: Flight) => (
                    <tr key={`flight${flight.id}`} className="border-x-2 border-sky-500">
                        <td className="p-4 whitespace-nowrap">{formatDate(flight.departure)}</td>
                        <td className="p-4">
                            {flight.origin} - {flight.destination}
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                            <div className="grid grid-cols-3">
                                <span>{`${flight.carrier} ${flight.number}`}</span>
                                <span>{flight.aircraft ?? '—'}</span>
                                <span>{flight.seat ?? '—'}</span>
                            </div>
                        </td>
                        <td className="pr-4 text-right">
                            <Button text="Edit" icon={mdiBriefcaseEditOutline} size={0.85} onClick={(): void => edit(flight)} />
                        </td>
                    </tr>
                ))}
        </>
    );
};
