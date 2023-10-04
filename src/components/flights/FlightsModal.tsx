import { ChangeEvent, SyntheticEvent } from 'react';
import { mdiContentCopy, mdiContentSaveOutline, mdiDeleteOutline, mdiSwapHorizontal } from '@mdi/js';

import { Flight, IataAirline, IataLocation } from '@/interfaces';
import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';
import { Autocomplete, AutocompleteOption } from '@/components/page/Autocomplete';

interface FlightModalProps {
    form: Flight;
    invalid: boolean;
    save: (event: SyntheticEvent) => void;
    swap: () => void;
    change: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    copy: (flight: Flight) => void;
    remove: (id?: string) => void;
    close: () => void;
}

const mapAutocompleteResponse = <T,>(response: AutocompleteOption<T>[]): AutocompleteOption<T>[] => response;

export const FlightsModal = ({ form, invalid, save, swap, change, copy, remove, close }: FlightModalProps) => (
    <Modal
        title={`${form.id ? 'Edit' : 'New'} Flight`}
        close={close}
        left={form.id ? <Button text="Delete" icon={mdiDeleteOutline} onClick={(): void => remove(form.id)} /> : null}
        right={
            <>
                <Button text="Swap airports" icon={mdiSwapHorizontal} onClick={swap} />
                {form.id ? <Button text="Copy" icon={mdiContentCopy} onClick={(): void => copy(form)} /> : null}
                <Button text="Save" icon={mdiContentSaveOutline} onClick={save} />
            </>
        }>
        <form onSubmit={save} className="space-y-16">
            <div className="grid grid-cols-2 gap-16">
                <Autocomplete
                    path="/iata/search/location"
                    label="Origin"
                    defaultValue={form.origin}
                    // @ts-ignore
                    onSelectOption={(opt) => change({ target: { value: opt.value, name: 'origin' } })}
                    mapResponse={mapAutocompleteResponse<IataLocation>}
                    required
                />
                <Autocomplete
                    path="/iata/search/location"
                    label="Destination"
                    defaultValue={form.destination}
                    // @ts-ignore
                    onSelectOption={(opt) => change({ target: { value: opt.value, name: 'destination' } })}
                    mapResponse={mapAutocompleteResponse<IataLocation>}
                    required
                />
                <label className="label">
                    Departure
                    <input
                        className="input w-full"
                        type="datetime-local"
                        name="departure"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.departure ?? ''}
                    />
                </label>
                <label className="label">
                    Arrival
                    <input
                        className="input w-full"
                        type="datetime-local"
                        name="arrival"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.arrival ?? ''}
                    />
                </label>
            </div>
            <div className="grid grid-cols-3 gap-16">
                <Autocomplete
                    path="/iata/search/airline"
                    label="Carrier"
                    defaultValue={form.carrier}
                    // @ts-ignore
                    onSelectOption={(opt) => change({ target: { value: opt.value, name: 'carrier' } })}
                    mapResponse={mapAutocompleteResponse<IataAirline>}
                    minLength={2}
                    required
                />
                <label className="label">
                    Number
                    <input
                        className="input w-full"
                        type="number"
                        name="number"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.number ?? ''}
                        min={1}
                        max={9999}
                    />
                </label>
                <label className="label">
                    Cabin
                    <select
                        className="input w-full text-14 pr-16"
                        name="cabin"
                        onChange={change}
                        onBlur={change}
                        defaultValue={form.cabin ?? 'economy'}>
                        <option value="economy">Economy</option>
                        <option value="premium_economy">Premium</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </select>
                </label>
                <label className="label">
                    Aircraft
                    <input
                        className="input w-full"
                        type="text"
                        name="aircraft"
                        autoComplete="off"
                        onChange={change}
                        value={form.aircraft ?? ''}
                        maxLength={4}
                    />
                </label>
                <label className="label">
                    Seat
                    <input
                        className="input w-full"
                        type="text"
                        name="seat"
                        autoComplete="off"
                        onChange={change}
                        value={form.seat ?? ''}
                        maxLength={4}
                    />
                </label>
                <label className="label">
                    Reference
                    <input
                        className="input w-full"
                        type="text"
                        name="reference"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.reference ?? ''}
                    />
                </label>
            </div>
            <label className="label">
                Info
                <textarea
                    className="input w-full"
                    name="info"
                    required
                    autoComplete="off"
                    rows={4}
                    onChange={change}
                    value={form.info ?? ''}
                />
            </label>
        </form>
        {invalid && <div className="text-center text-12 text-warn pt-16">Please fill the required fields!</div>}
    </Modal>
);
