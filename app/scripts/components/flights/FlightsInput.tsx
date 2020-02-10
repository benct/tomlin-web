import React from 'react';

interface FlightInputProps {
    name: string;
    type?: string;
    value?: string | null;
    required?: boolean;
    fraction?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    extraProps?: object;
}

const FlightsInput: React.FC<FlightInputProps> = ({ type, name, value, required, fraction, onChange, extraProps }): React.ReactElement => (
    <div className="form-element" style={{ width: fraction ?? '48%' }}>
        <label htmlFor={`form-${name}`} className="text-smaller capitalize">
            {name}
        </label>
        <input
            className="input input-small"
            type={type ?? 'text'}
            name={name}
            id={`form-${name}`}
            required={required}
            autoComplete="off"
            onChange={onChange}
            value={value ?? ''}
            {...extraProps}
        />
    </div>
);

export default React.memo(FlightsInput);
