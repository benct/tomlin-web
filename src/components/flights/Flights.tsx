import { ChangeEvent, FC, ReactElement, SyntheticEvent, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiAirplane, mdiBriefcaseEditOutline } from '@mdi/js';

import { formatDate } from '@/util/formatting';
import { useFlightActions, useFlights } from '@/data/flights';

import { Flight } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { FlightsModal } from './FlightsModal';
import { FlightsGroup } from './FlightsGroup';

const required: string[] = ['origin', 'destination', 'departure', 'arrival', 'carrier', 'number', 'reference'];

export const Flights: FC = () => {
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

    const renderGrouped = (): ReactElement => (
        <table className="table-striped">
            <thead>
                <tr className="text-smaller">
                    <th>Departure</th>
                    <th className="hide-lt600">Return</th>
                    <th>Trip</th>
                    <th className="text-right">
                        <button className="button-icon" onClick={handleNew}>
                            <Icon path={mdiAirplane} size="24px" title="New" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {flights.map(
                    (group, idx): ReactElement => (
                        <FlightsGroup flights={group} edit={handleEdit} key={`flightGroup${idx}`} />
                    )
                )}
            </tbody>
        </table>
    );

    const renderAll = (): ReactElement => (
        <table className="table-striped">
            <thead>
                <tr className="text-smaller">
                    <th>Departure</th>
                    <th>From</th>
                    <th>To</th>
                    <th className="hide-lt480">Flight</th>
                    <th className="hide-lt480">Type</th>
                    <th className="hide-lt600">Seat</th>
                    <th className="hide-lt768">Reference</th>
                    <th className="text-right">
                        <button className="button-icon" onClick={handleNew}>
                            <Icon path={mdiAirplane} size="24px" title="New" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {flights.flat().map(
                    (flight: Flight): ReactElement => (
                        <tr key={`flight${flight.id}`}>
                            <td className="no-wrap">{formatDate(flight.departure)}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td className="hide-lt480">{`${flight.carrier} ${flight.number}`}</td>
                            <td className="hide-lt480">{flight.aircraft ?? '—'}</td>
                            <td className="hide-lt600">{flight.seat ?? '—'}</td>
                            <td className="hide-lt768">{flight.reference ?? '—'}</td>
                            <td className="text-right">
                                <button className="button-icon" onClick={(): void => handleEdit(flight)}>
                                    <Icon path={mdiBriefcaseEditOutline} size="20px" title="Edit" />
                                </button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );

    return (
        <div className="wrapper min-height ptm">
            <div className="text-center mbm">
                <button className="input input-small" onClick={(): void => setShowGrouped(!showGrouped)}>
                    Display: {showGrouped ? 'Grouped' : 'All'}
                </button>
            </div>
            <Loading isLoading={loading} text="Loading flights...">
                {flights.length ? showGrouped ? renderGrouped() : renderAll() : <div className="text">No flights...</div>}
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
        </div>
    );
};
