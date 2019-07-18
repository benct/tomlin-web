import React from 'react';
import Icon from '@mdi/react';
import { mdiBriefcaseEditOutline, mdiChevronDown, mdiChevronUp } from '@mdi/js';

import { Flight } from '../../interfaces';
import { formatDate } from '../../util/formatting';

interface FlightGroupState {
    showFlights: boolean;
}

interface FlightGroupProps {
    flights: Flight[];
    edit: (flight: Flight) => void;
}

export default class FlightsGroup extends React.PureComponent<FlightGroupProps, FlightGroupState> {
    constructor(props: FlightGroupProps) {
        super(props);

        this.state = {
            showFlights: false,
        };
    }

    toggleFlights(): void {
        this.setState({ showFlights: !this.state.showFlights });
    }

    render(): React.ReactElement {
        const isSimple =
            this.props.flights.length === 1 ||
            (this.props.flights.length === 2 &&
                this.props.flights[0].origin === this.props.flights[1].destination &&
                this.props.flights[0].destination === this.props.flights[1].origin);

        const locations = isSimple
            ? `${this.props.flights[0].origin} - ${this.props.flights[0].destination}`
            : this.props.flights
                  .flatMap((flight: Flight): string[] => [flight.origin || '', flight.destination || ''])
                  .filter(
                      (location: string, idx: number, arr: string[]): boolean => location !== '' && (idx === 0 || arr[idx - 1] !== location)
                  )
                  .join(' - ');

        return (
            <>
                <tr className="mtm pointer" onClick={this.toggleFlights.bind(this)} role="button">
                    <td className="no-wrap">{formatDate(this.props.flights[0].departure)}</td>
                    <td className="no-wrap hide-lt600">
                        {this.props.flights.length > 1 ? formatDate(this.props.flights[this.props.flights.length - 1].arrival) : '—'}
                    </td>
                    <td>{locations}</td>
                    <td className="text-right">
                        <button className="button-icon pan">
                            <Icon path={this.state.showFlights ? mdiChevronUp : mdiChevronDown} size="20px" title="Show flights" />
                        </button>
                    </td>
                </tr>
                {this.state.showFlights &&
                    this.props.flights.map(
                        (flight: Flight): React.ReactElement => (
                            <tr key={`flight${flight.id}`} className="admin-flight-group">
                                <td className="no-wrap">{formatDate(flight.departure)}</td>
                                <td>
                                    <div className="grid-auto">
                                        <span>{flight.origin}</span>
                                        <span>{flight.destination}</span>
                                    </div>
                                </td>
                                <td className="hide-lt600">
                                    <div className="grid-auto">
                                        <span>{`${flight.carrier} ${flight.number}`}</span>
                                        <span>{flight.aircraft || '—'}</span>
                                        <span>{flight.seat || '—'}</span>
                                    </div>
                                </td>
                                <td className="text-right">
                                    <button className="button-icon pan" onClick={(): void => this.props.edit(flight)}>
                                        <Icon path={mdiBriefcaseEditOutline} size="20px" title="Edit" />
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
            </>
        );
    }
}
