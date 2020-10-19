import { ChangeEvent, FC, memo } from 'react';

interface FlightInputProps {
    name: string;
    type?: string;
    value?: string | null;
    required?: boolean;
    fraction?: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    extraProps?: Record<string, number>;
}

export const FlightsInput: FC<FlightInputProps> = memo(({ type, name, value, required, fraction, onChange, extraProps }) => (
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
));

FlightsInput.displayName = 'FlightsInput';
