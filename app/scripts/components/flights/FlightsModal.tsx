import React from 'react';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiContentCopy, mdiContentSaveOutline, mdiDeleteOutline, mdiSwapHorizontal } from '@mdi/js';

import { Flight } from '../../interfaces';

import Modal from '../page/Modal';
import FlightsInput from './FlightsInput';

interface FlightModalProps {
    form: Flight;
    invalid: boolean;
    save: (event: React.SyntheticEvent) => void;
    swap: () => void;
    change: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    copy: (flight: Flight) => void;
    remove: (id?: string) => void;
    close: () => void;
}

const FlightsModal: React.FC<FlightModalProps> = ({ form, invalid, save, swap, change, copy, remove, close }): React.ReactElement => (
    <Modal close={close}>
        <form onSubmit={save} className="overlay-modal-content admin-flight-form pure-form pure-form-stacked">
            <fieldset className="pan">
                <div className="pure-g text-smaller">
                    <FlightsInput name="origin" value={form.origin} onChange={change} required extraProps={{ maxLength: 3 }} />
                    <FlightsInput name="destination" value={form.destination} onChange={change} required extraProps={{ maxLength: 3 }} />
                    <FlightsInput name="departure" type="datetime-local" value={form.departure} onChange={change} required />
                    <FlightsInput name="arrival" type="datetime-local" value={form.arrival} onChange={change} required />
                    <FlightsInput
                        name="carrier"
                        value={form.carrier}
                        fraction={3}
                        onChange={change}
                        required
                        extraProps={{ maxLength: 2 }}
                    />
                    <FlightsInput
                        name="number"
                        type="number"
                        value={form.number}
                        fraction={3}
                        onChange={change}
                        required
                        extraProps={{ min: 1, max: 9999 }}
                    />
                    <div className="pure-u-1-3">
                        <label htmlFor="form-cabin">Cabin</label>
                        <select
                            className="pure-u-23-24"
                            id="form-cabin"
                            name="cabin"
                            autoComplete="off"
                            onChange={change}
                            onBlur={change}
                            defaultValue={form.cabin ?? 'economy'}>
                            <option value="economy">Economy</option>
                            <option value="premium_economy">Premium</option>
                            <option value="business">Business</option>
                            <option value="first">First</option>
                        </select>
                    </div>
                    <FlightsInput name="aircraft" value={form.aircraft} fraction={3} onChange={change} extraProps={{ maxLength: 4 }} />
                    <FlightsInput name="seat" value={form.seat} fraction={3} onChange={change} extraProps={{ maxLength: 4 }} />
                    <FlightsInput name="reference" value={form.reference} fraction={3} onChange={change} required />
                    <div className="pure-u-1">
                        <label htmlFor="form-info">Info</label>
                        <textarea
                            className="pure-u-1"
                            id="form-info"
                            name="info"
                            autoComplete="off"
                            rows={4}
                            onChange={change}
                            defaultValue={form.info ?? undefined}
                        />
                    </div>
                </div>
                {invalid && <div className="text text-small error pts">Please fill the required fields!</div>}
            </fieldset>
        </form>
        <div className="border-top ptm">
            {form.id ? (
                <>
                    <button className="button-icon mrm" onClick={(): void => remove(form.id)}>
                        <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                    </button>
                    <button className="button-icon mrm" onClick={(): void => copy(form)}>
                        <Icon path={mdiContentCopy} size="26px" title="Copy" />
                    </button>
                </>
            ) : null}
            <button className="button-icon mrm" onClick={save}>
                <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
            </button>
            <button className="button-icon" onClick={swap}>
                <Icon path={mdiSwapHorizontal} size="28px" title="Swap airports" />
            </button>
            <button className="button-icon float-right" onClick={close}>
                <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
            </button>
        </div>
    </Modal>
);

export default FlightsModal;
