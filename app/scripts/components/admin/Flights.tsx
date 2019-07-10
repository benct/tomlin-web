import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAirplane, mdiBriefcaseEditOutline, mdiCloseCircleOutline, mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { DefaultState } from '../../interfaces';
import adminActions from '../../actions/admin';

import Modal from '../page/Modal';

interface FlightState {
    showModal: boolean;
    invalid: boolean;
    form: FlightForm;
}

interface FlightForm {
    [key: string]: string | null;
}

interface FlightProps {
    flights: any[];
}

interface FlightInputProps {
    name: string;
    type?: string;
    value?: string | null;
    fraction?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    extraProps?: object;
}

const required: string[] = ['origin', 'destination', 'departure', 'arrival', 'carrier', 'number'];

const FlightsInput: React.FC<FlightInputProps> = ({ type, name, value, fraction, onChange, extraProps }): React.ReactElement => (
    <div className={`pure-u-1-${fraction || 2}`}>
        <label htmlFor={`form-${name}`} className="text-smaller capitalize">
            {name}
        </label>
        <input
            className={`pure-u-23-24 text-small${type === 'datetime-local' ? 'er' : ''}`}
            type={type || 'text'}
            name={name}
            id={`form-${name}`}
            autoComplete="off"
            onChange={onChange}
            defaultValue={value || undefined}
            {...extraProps}
        />
    </div>
);

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
            form: { ...this.state.form, [name]: value.trim() !== '' ? value : null },
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

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    validateForm(form: FlightForm): boolean {
        return (
            form &&
            required.filter((key: string): boolean => {
                const value = form[key];
                return !value || value.trim() === '';
            }).length === 0
        );
    }

    renderModal(): React.ReactElement {
        return (
            <Modal close={this.toggleModal}>
                <form onSubmit={this.handleSubmit} className="overlay-modal-content admin-flight-form pure-form pure-form-stacked">
                    <fieldset className="pan">
                        <div className="pure-g">
                            <FlightsInput
                                name="origin"
                                value={this.state.form.origin}
                                onChange={this.handleChange}
                                extraProps={{ maxLength: 3 }}
                            />
                            <FlightsInput
                                name="destination"
                                value={this.state.form.destination}
                                onChange={this.handleChange}
                                extraProps={{ maxLength: 3 }}
                            />
                            <FlightsInput
                                name="departure"
                                type="datetime-local"
                                value={this.state.form.departure}
                                onChange={this.handleChange}
                            />
                            <FlightsInput
                                name="arrival"
                                type="datetime-local"
                                value={this.state.form.arrival}
                                onChange={this.handleChange}
                            />
                            <FlightsInput
                                name="carrier"
                                value={this.state.form.carrier}
                                fraction={3}
                                onChange={this.handleChange}
                                extraProps={{ maxLength: 2 }}
                            />
                            <FlightsInput
                                name="number"
                                type="number"
                                value={this.state.form.number}
                                fraction={3}
                                onChange={this.handleChange}
                                extraProps={{ min: 1, max: 9999 }}
                            />
                            <div className="pure-u-1-3">
                                <label htmlFor="form-cabin" className="text-smaller">
                                    Cabin
                                </label>
                                <select
                                    className="pure-u-23-24 text-small"
                                    id="form-cabin"
                                    name="cabin"
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.form.cabin || 'economy'}>
                                    <option value="economy">Economy</option>
                                    <option value="premium_economy">Premium</option>
                                    <option value="business">Business</option>
                                    <option value="first">First</option>
                                </select>
                            </div>
                            <FlightsInput
                                name="aircraft"
                                value={this.state.form.aircraft}
                                fraction={3}
                                onChange={this.handleChange}
                                extraProps={{ maxLength: 4 }}
                            />
                            <FlightsInput
                                name="seat"
                                value={this.state.form.seat}
                                fraction={3}
                                onChange={this.handleChange}
                                extraProps={{ maxLength: 4 }}
                            />
                            <FlightsInput name="reference" value={this.state.form.reference} fraction={3} onChange={this.handleChange} />
                            <div className="pure-u-1">
                                <label htmlFor="form-info" className="text-smaller">
                                    Info
                                </label>
                                <textarea
                                    className="pure-u-1"
                                    id="form-info"
                                    name="info"
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.form.info || undefined}
                                />
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div className="border-top ptm">
                    {this.props.flights.length ? (
                        <button className="button-icon mrm">
                            <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                        </button>
                    ) : null}
                    <button className="button-icon" onClick={this.handleSubmit}>
                        <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
                    </button>
                    {this.state.invalid && <span className="text error valign-middle">Please fill the required fields!</span>}
                    <button className="button-icon float-right" onClick={this.toggleModal}>
                        <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
                    </button>
                </div>
            </Modal>
        );
    }

    static renderFlight(flight: any): React.ReactElement {
        return (
            <tr key={`flight${flight.id}`}>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.departure.substr(0, 10)}</td>
                <td>{`${flight.carrier} ${flight.number}`}</td>
                <td>{flight.aircraft}</td>
                <td>{flight.seat}</td>
                <td>{flight.reference}</td>
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
                {this.state.showModal && this.renderModal()}
            </>
        );
    }
}

export default connect((state: DefaultState): FlightProps => ({ flights: state.admin.flights }))(Flights);
