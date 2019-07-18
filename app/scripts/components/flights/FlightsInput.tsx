import React from 'react';

interface FlightInputProps {
    name: string;
    type?: string;
    value?: string | null;
    required?: boolean;
    fraction?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    extraProps?: object;
}

const FlightsInput: React.FC<FlightInputProps> = ({ type, name, value, required, fraction, onChange, extraProps }): React.ReactElement => (
    <div className={`pure-u-1-${fraction || 2}`}>
        <label htmlFor={`form-${name}`} className="text-smaller capitalize">
            {name}
        </label>
        <input
            className="pure-u-23-24"
            type={type || 'text'}
            name={name}
            id={`form-${name}`}
            required={required}
            autoComplete="off"
            onChange={onChange}
            defaultValue={value || undefined}
            {...extraProps}
        />
    </div>
);

export default FlightsInput;
