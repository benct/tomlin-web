import React from 'react';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { Flight } from '../../interfaces';
import Modal from '../page/Modal';
import FlightsInput from './FlightsInput';

interface FlightModalProps {
    form: Flight;
    invalid: boolean;
    handleSubmit: (event: React.SyntheticEvent) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    close: () => void;
}

const FlightsModal: React.FC<FlightModalProps> = ({ form, invalid, handleSubmit, handleChange, close }): React.ReactElement => (
    <Modal close={close}>
        <form onSubmit={handleSubmit} className="overlay-modal-content admin-flight-form pure-form pure-form-stacked">
            <fieldset className="pan">
                <div className="pure-g">
                    <FlightsInput name="origin" value={form.origin} onChange={handleChange} extraProps={{ maxLength: 3 }} />
                    <FlightsInput name="destination" value={form.destination} onChange={handleChange} extraProps={{ maxLength: 3 }} />
                    <FlightsInput name="departure" type="datetime-local" value={form.departure} onChange={handleChange} />
                    <FlightsInput name="arrival" type="datetime-local" value={form.arrival} onChange={handleChange} />
                    <FlightsInput name="carrier" value={form.carrier} fraction={3} onChange={handleChange} extraProps={{ maxLength: 2 }} />
                    <FlightsInput
                        name="number"
                        type="number"
                        value={form.number}
                        fraction={3}
                        onChange={handleChange}
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
                            onChange={handleChange}
                            onBlur={handleChange}
                            defaultValue={form.cabin || 'economy'}>
                            <option value="economy">Economy</option>
                            <option value="premium_economy">Premium</option>
                            <option value="business">Business</option>
                            <option value="first">First</option>
                        </select>
                    </div>
                    <FlightsInput
                        name="aircraft"
                        value={form.aircraft}
                        fraction={3}
                        onChange={handleChange}
                        extraProps={{ maxLength: 4 }}
                    />
                    <FlightsInput name="seat" value={form.seat} fraction={3} onChange={handleChange} extraProps={{ maxLength: 4 }} />
                    <FlightsInput name="reference" value={form.reference} fraction={3} onChange={handleChange} />
                    <div className="pure-u-1">
                        <label htmlFor="form-info" className="text-smaller">
                            Info
                        </label>
                        <textarea
                            className="pure-u-1"
                            id="form-info"
                            name="info"
                            autoComplete="off"
                            onChange={handleChange}
                            defaultValue={form.info || undefined}
                        />
                    </div>
                </div>
            </fieldset>
        </form>
        <div className="border-top ptm">
            {form.id ? (
                <button className="button-icon mrm">
                    <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                </button>
            ) : null}
            <button className="button-icon" onClick={handleSubmit}>
                <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
            </button>
            {invalid && <span className="text error valign-middle">Please fill the required fields!</span>}
            <button className="button-icon float-right" onClick={close}>
                <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
            </button>
        </div>
    </Modal>
);

export default FlightsModal;
