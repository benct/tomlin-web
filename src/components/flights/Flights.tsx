import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { mdiAirplane, mdiBriefcaseEditOutline } from '@mdi/js';

import { formatDate } from '@/util/formatting';
import { useFlightActions, useFlights } from '@/data/flights';

import { Flight } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';
import { FlightsModal } from './FlightsModal';
import { FlightsGroup } from './FlightsGroup';

const required: string[] = ['origin', 'destination', 'departure', 'arrival', 'carrier', 'number', 'reference'];

export const Flights = () => {
    const [showGrouped, setShowGrouped] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);
    const [form, setForm] = useState<Flight>({});

    const { flights, loading } = useFlights();
    const { saveFlight, deleteFlight } = useFlightActions();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value, name } = event.target;
        const overrideArrival = name === 'departure' && !form.arrival ? { arrival: value } : {};

        setForm({ ...form, ...overrideArrival, [name]: value.trim() !== '' ? value.trim() : undefined });
    };

    const handleSwap = (): void => {
        setForm({ ...form, origin: form.destination, destination: form.origin });
    };

    const handleNew = (): void => {
        setForm({});
        setInvalid(false);
        setShowModal(true);
    };

    const handleEdit = (flight: Flight): void => {
        setForm(flight);
        setInvalid(false);
        setShowModal(true);
    };

    const handleCopy = (flight: Flight): void => {
        setForm({ ...flight, id: undefined });
        setInvalid(false);
        setShowModal(true);
    };

    const handleDelete = (id?: string): void => {
        if (id) {
            deleteFlight(+id);

            setForm({});
            setShowModal(false);
        }
    };

    const validateForm = (form: Flight): boolean =>
        form &&
        required.filter((key: string): boolean => {
            const value = form[key];
            return !value || value.trim() === '';
        }).length === 0;

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();

        if (validateForm(form)) {
            saveFlight(form);
            setInvalid(false);
        } else {
            setInvalid(true);
        }
    };

    const renderGrouped = () => (
        <table className="table-auto border-collapse w-full text-14">
            <thead>
                <tr className="text-left">
                    <th className="px-4">Departure</th>
                    <th className="px-4 hidden sm:table-cell">Return</th>
                    <th className="px-4">Trip</th>
                    <th className="px-4 text-right">
                        <Button text="New" icon={mdiAirplane} onClick={handleNew} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {flights.map((group, idx) => (
                    <FlightsGroup flights={group} edit={handleEdit} key={`flightGroup${idx}`} />
                ))}
            </tbody>
        </table>
    );

    const renderAll = () => (
        <table className="table-auto border-collapse w-full text-14">
            <thead>
                <tr className="text-left">
                    <th className="pl-4">Departure</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Flight</th>
                    <th className="hidden sm:table-cell">Type</th>
                    <th className="hidden sm:table-cell">Seat</th>
                    <th className="hidden md:table-cell">Reference</th>
                    <th className="pr-4 text-right">
                        <Button text="New" icon={mdiAirplane} onClick={handleNew} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {flights.flat().map((flight: Flight) => (
                    <tr className="odd:bg-slate-100 dark:odd:bg-slate-800" key={`flight${flight.id}`}>
                        <td className="pl-4 whitespace-nowrap">{formatDate(flight.departure)}</td>
                        <td>{flight.origin}</td>
                        <td>{flight.destination}</td>
                        <td>{`${flight.carrier} ${flight.number}`}</td>
                        <td className="hidden sm:table-cell">{flight.aircraft ?? '—'}</td>
                        <td className="hidden sm:table-cell">{flight.seat ?? '—'}</td>
                        <td className="hidden md:table-cell">{flight.reference ?? '—'}</td>
                        <td className="pr-4 text-right">
                            <Button text="Edit" icon={mdiBriefcaseEditOutline} size={0.85} onClick={(): void => handleEdit(flight)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderTitle = () => (
        <>
            <span>Flight</span>
            <Button
                text={`Display: ${showGrouped ? 'Grouped' : 'All'}`}
                onClick={(): void => setShowGrouped(!showGrouped)}
                className="sm:ml-16"
            />
        </>
    );

    return (
        <Box title={renderTitle()} className="min-h">
            <Loading isLoading={loading} text="Loading flights...">
                {flights.length ? showGrouped ? renderGrouped() : renderAll() : <div className="text-center">No flights...</div>}
            </Loading>
            {showModal && (
                <FlightsModal
                    form={form}
                    invalid={invalid}
                    save={handleSubmit}
                    swap={handleSwap}
                    copy={handleCopy}
                    change={handleChange}
                    remove={handleDelete}
                    close={(): void => setShowModal(false)}
                />
            )}
        </Box>
    );
};
