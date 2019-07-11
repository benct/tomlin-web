import React from 'react';

interface FlightInputProps {
    name: string;
    type?: string;
    value?: string | null;
    fraction?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    extraProps?: object;
}

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

export default FlightsInput;
