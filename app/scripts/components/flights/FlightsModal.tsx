import React from 'react';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiContentCopy, mdiContentSaveOutline, mdiDeleteOutline, mdiSwapHorizontal } from '@mdi/js';

import { Flight } from '../../interfaces';

import { Modal, ModalContent, ModalFooter, ModalHeader } from '../page/Modal';
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

const FlightsModal: React.FC<FlightModalProps> = ({ form, invalid, save, swap, change, copy, remove, close }) => (
    <Modal close={close}>
        <ModalHeader>{`${form.id ? 'Edit' : 'New'} Flight`}</ModalHeader>
        <ModalContent>
            <form onSubmit={save} className="admin-flight-form">
                <fieldset>
                    <div className="form-line text-smaller">
                        <FlightsInput name="origin" value={form.origin} onChange={change} extraProps={{ maxLength: 3 }} />
                        <FlightsInput name="destination" value={form.destination} onChange={change} extraProps={{ maxLength: 3 }} />
                        <FlightsInput name="departure" type="datetime-local" value={form.departure} onChange={change} />
                        <FlightsInput name="arrival" type="datetime-local" value={form.arrival} onChange={change} />
                        <FlightsInput name="carrier" value={form.carrier} fraction="31%" onChange={change} extraProps={{ maxLength: 2 }} />
                        <FlightsInput
                            name="number"
                            type="number"
                            value={form.number}
                            fraction="31%"
                            onChange={change}
                            extraProps={{ min: 1, max: 9999 }}
                        />
                        <div className="form-element" style={{ width: '31%' }}>
                            <label htmlFor="form-cabin">Cabin</label>
                            <select
                                className="input input-small"
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
                        <FlightsInput
                            name="aircraft"
                            value={form.aircraft}
                            fraction="31%"
                            onChange={change}
                            extraProps={{ maxLength: 4 }}
                        />
                        <FlightsInput name="seat" value={form.seat} fraction="31%" onChange={change} extraProps={{ maxLength: 4 }} />
                        <FlightsInput name="reference" value={form.reference} fraction="31%" onChange={change} required />
                        <div className="form-element full-width">
                            <label htmlFor="form-info">Info</label>
                            <textarea
                                className="input-textarea man"
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
        </ModalContent>
        <ModalFooter>
            {form.id ? (
                <>
                    <button className="button-icon mrl" onClick={(): void => remove(form.id)}>
                        <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                    </button>
                    <button className="button-icon mrl" onClick={(): void => copy(form)}>
                        <Icon path={mdiContentCopy} size="26px" title="Copy" />
                    </button>
                </>
            ) : null}
            <button className="button-icon mrl" onClick={save}>
                <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
            </button>
            <button className="button-icon" onClick={swap}>
                <Icon path={mdiSwapHorizontal} size="28px" title="Swap airports" />
            </button>
            <button className="button-icon float-right" onClick={close}>
                <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
            </button>
        </ModalFooter>
    </Modal>
);

export default FlightsModal;
