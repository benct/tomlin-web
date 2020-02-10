import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAirplane, mdiBriefcaseEditOutline } from '@mdi/js';

import { DefaultState, Flight, ThunkDispatchProp } from '../../interfaces';

import { formatDate } from '../../util/formatting';
import { deleteFlight, getFlights, saveFlight } from '../../actions/admin';

import FlightsModal from './FlightsModal';
import FlightsGroup from './FlightsGroup';

interface FlightProps {
    flights: Flight[][];
    isLoggedIn: boolean;
}

const required: string[] = ['origin', 'destination', 'departure', 'arrival', 'carrier', 'number', 'reference'];

const Flights: React.FC<FlightProps & ThunkDispatchProp> = ({ flights, isLoggedIn, dispatch }) => {
    const [showGrouped, setShowGrouped] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [invalid, setInvalid] = React.useState<boolean>(false);
    const [form, setForm] = React.useState<Flight>({});

    React.useEffect(() => {
        if (!flights.length) {
            dispatch(getFlights());
        }
    }, [isLoggedIn]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { value, name } = event.target;
        const overrideArrival = name === 'departure' && !form.arrival ? { arrival: value } : {};

        setForm({ ...form, ...overrideArrival, [name]: value.trim() !== '' ? value.trim() : undefined });
    };

    const handleSwap = (): void => {
        setForm({ ...form, origin: form.destination, destination: form.origin });
    };

    const handleNew = (): void => {
        setForm(form.id ? {} : form);
        setShowModal(true);
    };

    const handleEdit = (flight: Flight): void => {
        setForm(flight);
        setShowModal(true);
    };

    const handleCopy = (flight: Flight): void => {
        setForm({ ...flight, id: undefined });
        setShowModal(true);
    };

    const handleDelete = (id?: string): void => {
        if (id) {
            dispatch(deleteFlight(+id));

            setForm({});
            setShowModal(false);
        }
    };

    const validateForm = (form: Flight): boolean =>
        form && required.filter((key: string): boolean => form[key]?.trim() === '').length === 0;

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (validateForm(form)) {
            dispatch(saveFlight(form));
            setInvalid(false);
        } else {
            setInvalid(true);
        }
    };

    const renderGrouped = (): React.ReactElement => (
        <table className="table-striped text-small" style={{ width: '100%' }}>
            <thead>
                <tr className="text-smaller">
                    <th>Departure</th>
                    <th className="hide-lt600">Return</th>
                    <th>Trip</th>
                    <th className="text-right">
                        <button className="button-icon pan" onClick={handleNew}>
                            <Icon path={mdiAirplane} size="24px" title="New" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {flights.map(
                    (group, idx): React.ReactElement => (
                        <FlightsGroup flights={group} edit={handleEdit} key={`flightGroup${idx}`} />
                    )
                )}
            </tbody>
        </table>
    );

    const renderAll = (): React.ReactElement => (
        <table className="table-striped text-small" style={{ width: '100%' }}>
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
                        <button className="button-icon pan" onClick={handleNew}>
                            <Icon path={mdiAirplane} size="24px" title="New" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {flights.flat().map(
                    (flight: Flight): React.ReactElement => (
                        <tr key={`flight${flight.id}`}>
                            <td className="no-wrap">{formatDate(flight.departure)}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td className="hide-lt480">{`${flight.carrier} ${flight.number}`}</td>
                            <td className="hide-lt480">{flight.aircraft ?? '—'}</td>
                            <td className="hide-lt600">{flight.seat ?? '—'}</td>
                            <td className="hide-lt768">{flight.reference ?? '—'}</td>
                            <td className="text-right">
                                <button className="button-icon pan" onClick={(): void => handleEdit(flight)}>
                                    <Icon path={mdiBriefcaseEditOutline} size="20px" title="Edit" />
                                </button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );

    return flights.length ? (
        <>
            <div className="text-center mbm">
                <button className="input input-small" onClick={(): void => setShowGrouped(!showGrouped)}>
                    Display: {showGrouped ? 'Grouped' : 'All'}
                </button>
            </div>
            {showGrouped ? renderGrouped() : renderAll()}
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
        </>
    ) : (
        <div className="text">No flights...</div>
    );
};

export default connect((state: DefaultState): FlightProps => ({ flights: state.admin.flights, isLoggedIn: state.auth.isLoggedIn }))(
    Flights
);
