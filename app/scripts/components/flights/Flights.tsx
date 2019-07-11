import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAirplane, mdiBriefcaseEditOutline } from '@mdi/js';

import { DefaultState, Flight } from '../../interfaces';
import { formatDate } from '../../util/formatting';
import adminActions from '../../actions/admin';

import FlightsModal from './FlightsModal';

interface FlightState {
    showModal: boolean;
    invalid: boolean;
    form: Flight;
}

interface FlightProps {
    flights: Flight[];
}

const required: string[] = ['origin', 'destination', 'departure', 'arrival', 'carrier', 'number'];

class Flights extends React.PureComponent<FlightProps & DispatchProp, FlightState> {
    constructor(props: FlightProps & DispatchProp) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
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

    static renderFlight(flight: Flight): React.ReactElement {
        return (
            <tr key={`flight${flight.id}`}>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{formatDate(flight.departure)}</td>
                <td>{`${flight.carrier} ${flight.number}`}</td>
                <td>{flight.aircraft || '—'}</td>
                <td>{flight.seat || '—'}</td>
                <td>{flight.reference || '—'}</td>
                <td className="text-right">
                    <button className="button-icon pan">
                        <Icon path={mdiBriefcaseEditOutline} size="20px" title="Edit" />
                    </button>
                </td>
            </tr>
        );
    }

    render(): React.ReactElement[] | React.ReactElement {
        return (
            <>
                <div className="text-right">
                    <button className="button-icon mrm" onClick={this.toggleModal}>
                        <Icon path={mdiAirplane} size="28px" title="New" />
                    </button>
                </div>
                {this.props.flights.length ? (
                    <table className="pure-table pure-table-horizontal pure-table-striped text-small" style={{ width: '100%' }}>
                        <tbody>{this.props.flights.map(Flights.renderFlight)}</tbody>
                    </table>
                ) : (
                    <span>No flights...</span>
                )}
                {this.state.showModal && (
                    <FlightsModal
                        form={this.state.form}
                        invalid={this.state.invalid}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        close={this.toggleModal}
                    />
                )}
            </>
        );
    }
}

export default connect((state: DefaultState): FlightProps => ({ flights: state.admin.flights }))(Flights);
