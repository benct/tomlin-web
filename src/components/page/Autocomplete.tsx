import { ChangeEvent, FocusEvent, InputHTMLAttributes, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import { query } from '@/util/api';
import { debounce } from '@/util/debounce';

export interface AutocompleteOption<D> {
    value: string;
    text: string;
    subText?: string;
    indent?: boolean;
    data: D;
}

interface AutocompleteProps<R, D> {
    path: string;
    label: string;
    defaultValue?: string;
    onSelectOption: (option: AutocompleteOption<D>) => void;
    mapResponse: (response: R) => AutocompleteOption<D>[];
    queryParams?: Record<string, any>;
    minLength?: number;
}

export const Autocomplete = <R, D>({
    path,
    label,
    defaultValue,
    onSelectOption,
    mapResponse,
    queryParams = {},
    minLength = 3,
    className = '',
    ...rest
}: AutocompleteProps<R, D> & InputHTMLAttributes<HTMLInputElement>) => {
    const [value, setValue] = useState<string>(defaultValue ?? '');
    const [search, setSearch] = useState<string | null>(null);
    const [hasFocus, setHasFocus] = useState<boolean>(false);

    const { data, error } = useSWR<R>(search ? [`${path}/${search}`, queryParams] : null, query, {
        revalidateOnFocus: false,
        errorRetryCount: 0,
    });

    useEffect(() => {
        if (defaultValue) setValue(defaultValue);
    }, [defaultValue]);

    const showList = hasFocus && search && search.length >= minLength && (data || error);
    const dataList = data ? mapResponse(data) : [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(debounce(setSearch, 300), []);

    const handleSelect = (option: AutocompleteOption<D>) => {
        setValue(option.value);
        setSearch(null);
        onSelectOption(option);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);

        if (event.target.value.length >= minLength) {
            debounceSearch(event.target.value);
            setHasFocus(true);
        } else {
            setSearch(null);
        }
    };

    const handleKeyboard = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && dataList.length) {
            handleSelect(dataList[0]);
        }
        if (event.key == 'Escape') {
            setValue(defaultValue ?? '');
            setSearch(null);
        }
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        event.target.select();
        setHasFocus(true);
    };

    const handleBlur = () => {
        setTimeout(() => setHasFocus(false), 100);
    };

    const renderOptions = (list: AutocompleteOption<D>[]) =>
        list.map((opt: AutocompleteOption<D>, idx: number) => (
            <li
                className={`truncate cursor-pointer p-6 hover:font-bold odd:bg-slate-100 dark:odd:bg-slate-800 ${
                    opt.indent ? 'pl-24' : ''
                }`}
                onClick={() => handleSelect(opt)}
                key={opt.value + idx}>
                <span className="text-secondary dark:text-secondary-dark">{opt.text}</span>
                {opt.subText ? <div className="text-12">{opt.subText}</div> : null}
            </li>
        ));

    return (
        <label className="label relative">
            {label}
            <input
                type="text"
                autoComplete="off"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyboard}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`input w-full ${className}`}
                {...rest}
            />
            {showList && (
                <ul className="absolute w-full z-10 mt-2 border-2 rounded-4 dark:border-slate-400 bg-light dark:bg-dark text-primary dark:text-primary-dark">
                    {error || !dataList?.length ? <li className="p-6">No results...</li> : renderOptions(dataList)}
                </ul>
            )}
        </label>
    );
};
