import { ChangeEvent, SyntheticEvent } from 'react';
import { mdiContentCopy, mdiContentSaveOutline, mdiDeleteOutline, mdiSwapHorizontal } from '@mdi/js';

import { Flight } from '@/interfaces';
import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';

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
                <label className="label">
                    Origin
                    <input
                        className="input w-full"
                        type="text"
                        name="origin"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.origin}
                        maxLength={3}
                    />
                </label>
                <label className="label">
                    Destination
                    <input
                        className="input w-full"
                        type="text"
                        name="destination"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.destination}
                        maxLength={3}
                    />
                </label>
                <label className="label">
                    Departure
                    <input
                        className="input w-full"
                        type="datetime-local"
                        name="departure"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.departure}
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
                        value={form.arrival}
                    />
                </label>
            </div>
            <div className="grid grid-cols-3 gap-16">
                <label className="label">
                    Carrier
                    <input
                        className="input w-full"
                        type="text"
                        name="carrier"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.carrier}
                        maxLength={2}
                    />
                </label>
                <label className="label">
                    Number
                    <input
                        className="input w-full"
                        type="number"
                        name="number"
                        required
                        autoComplete="off"
                        onChange={change}
                        value={form.number}
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
                        value={form.aircraft}
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
                        value={form.seat}
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
                        value={form.reference}
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
                    value={form.info ?? undefined}
                />
            </label>
        </form>
        {invalid && <div className="text-center text-12 text-warn pt-16">Please fill the required fields!</div>}
    </Modal>
);
