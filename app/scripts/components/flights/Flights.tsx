import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAirplane, mdiBriefcaseEditOutline } from '@mdi/js';

import { DefaultState, Flight } from '../../interfaces';
import { formatDate } from '../../util/formatting';
import adminActions from '../../actions/admin';

import FlightsModal from './FlightsModal';
import FlightsGroup from './FlightsGroup';

interface FlightState {
    showGrouped: boolean;
    showModal: boolean;
    invalid: boolean;
    form: Flight;
}

interface FlightProps {
    flights: Flight[][];
}

const required: string[] = ['origin', 'destination', 'departure', 'arrival', 'carrier', 'number', 'reference'];

class Flights extends React.PureComponent<FlightProps & DispatchProp, FlightState> {
    constructor(props: FlightProps & DispatchProp) {
        super(props);

        this.state = {
            showGrouped: true,
            showModal: false,
            invalid: false,
            form: {},
        };
    }

    componentDidMount(): void {
        if (!this.props.flights.length) {
            this.props.dispatch(adminActions.getFlights());
        }
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        const { value, name } = event.target;
        this.setState({
            form: { ...this.state.form, [name]: value.trim() !== '' ? value : undefined },
        });
    }

    handleEdit(flight: Flight): void {
        this.setState({ form: flight, showModal: true });
    }

    handleCopy(flight: Flight): void {
        this.setState({ form: { ...flight, id: undefined }, showModal: true });
    }

    handleDelete(id?: string): void {
        this.props.dispatch(adminActions.deleteFlight(id));

        this.setState({ form: {}, showModal: false });
    }

    handleSubmit(event: React.SyntheticEvent): void {
        event.preventDefault();

        const formData = this.state.form;

        if (this.validateForm(formData)) {
            this.props.dispatch(adminActions.saveFlight(formData));
            this.setState({ invalid: false });
        } else {
            this.setState({ invalid: true });
        }
    }

    toggleGrouped(): void {
        this.setState({ showGrouped: !this.state.showGrouped });
    }

    toggleModal(): void {
        this.setState({ showModal: !this.state.showModal });
    }

    validateForm(form: Flight): boolean {
        return (
            form &&
            required.filter((key: string): boolean => {
                const value = form[key];
                return !value || value.trim() === '';
            }).length === 0
        );
    }

    renderGrouped(): React.ReactElement {
        return (
            <table className="pure-table pure-table-horizontal pure-table-striped text-small" style={{ width: '100%' }}>
                <thead>
                    <tr className="text-smaller">
                        <th>Departure</th>
                        <th className="hide-lt600">Return</th>
                        <th>Trip</th>
                        <th className="text-right">
                            <button className="button-icon pan" onClick={this.toggleModal.bind(this)}>
                                <Icon path={mdiAirplane} size="24px" title="New" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.flights.map(
                        (group, idx): React.ReactElement => (
                            <FlightsGroup flights={group} edit={this.handleEdit.bind(this)} key={`flightGroup${idx}`} />
                        )
                    )}
                </tbody>
            </table>
        );
    }

    renderAll(): React.ReactElement {
        return (
            <table className="pure-table pure-table-horizontal pure-table-striped text-small" style={{ width: '100%' }}>
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
                            <button className="button-icon pan" onClick={this.toggleModal.bind(this)}>
                                <Icon path={mdiAirplane} size="24px" title="New" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.flights.flat().map(
                        (flight: Flight): React.ReactElement => (
                            <tr key={`flight${flight.id}`}>
                                <td className="no-wrap">{formatDate(flight.departure)}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td className="hide-lt480">{`${flight.carrier} ${flight.number}`}</td>
                                <td className="hide-lt480">{flight.aircraft || '—'}</td>
                                <td className="hide-lt600">{flight.seat || '—'}</td>
                                <td className="hide-lt768">{flight.reference || '—'}</td>
                                <td className="text-right">
                                    <button className="button-icon pan" onClick={this.handleEdit.bind(this, flight)}>
                                        <Icon path={mdiBriefcaseEditOutline} size="20px" title="Edit" />
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        );
    }

    render(): React.ReactElement {
        return this.props.flights.length ? (
            <>
                <div className="text-center mbm">
                    <button className="input input-small" onClick={this.toggleGrouped.bind(this)}>
                        Display: {this.state.showGrouped ? 'Grouped' : 'All'}
                    </button>
                </div>
                {this.state.showGrouped ? this.renderGrouped() : this.renderAll()}
                {this.state.showModal && (
                    <FlightsModal
                        form={this.state.form}
                        invalid={this.state.invalid}
                        save={this.handleSubmit.bind(this)}
                        copy={this.handleCopy.bind(this)}
                        change={this.handleChange.bind(this)}
                        remove={this.handleDelete.bind(this)}
                        close={this.toggleModal.bind(this)}
                    />
                )}
            </>
        ) : (
            <div className="text">No flights...</div>
        );
    }
}

export default connect((state: DefaultState): FlightProps => ({ flights: state.admin.flights }))(Flights);
