import { Fragment, ReactElement, useRef } from 'react';
import { mdiDeleteOutline, mdiMinus, mdiPlus } from '@mdi/js';

import { countries } from '@/util/geo';
import { formatThousands } from '@/util/formatting';
import { useAdminActions, useAdminStats, useBeen, useSettings } from '@/data/admin';

import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';

export const Admin = () => {
    const { stats, loading: loadingStats } = useAdminStats();
    const { settings, loading: loadingSettings } = useSettings();
    const { been, loading: loadingBeen } = useBeen();
    const { saveSetting, clearLogs, updateIata, updateMedia, addCountry, removeCountry, incrementCountry, decrementCountry, backup } =
        useAdminActions();

    const updateMovieCount = useRef<HTMLSelectElement>(null);
    const updateTvCount = useRef<HTMLSelectElement>(null);
    const countdownTarget = useRef<HTMLInputElement>(null);
    const countdownIcon = useRef<HTMLSelectElement>(null);
    const countryList = useRef<HTMLSelectElement>(null);

    const formatStat = (key: string): string => (stats?.[key] !== undefined ? formatThousands(stats[key]) : '-');

    const getCount = (field: HTMLSelectElement | null): string | undefined => (field ? field.value : undefined);

    const renderOptions = (values: (number | string)[]): ReactElement[] =>
        values.map((opt, idx) => (
            <option key={`ctrlOpt${idx}`} value={opt}>
                {opt}
            </option>
        ));

    const beenCountries = been?.sort((a, b) => (b.name < a.name ? 1 : -1)) ?? [];
    const beenCountryCodes = beenCountries.map((item) => item.country) ?? [];
    const availableCountries = Object.keys(countries)
        .filter((code) => !beenCountryCodes.includes(code))
        .map((code) => ({ code, name: countries[code].name, isUN: countries[code].memberOf === 'UN' }))
        .sort((a, b) => (b.name < a.name ? 1 : -1));

    return (
        <>
            <Box title="Administration" className="grid grid-cols-2 sm:grid-cols-4 gap-x-16 gap-y-8 text-center text-14" border="border-b">
                <Loading isLoading={loadingStats} text="Loading stats..." className="col-span-2 sm:col-span-4">
                    <div>
                        Movies: {formatStat('movie')}
                        <br />
                        TV: {formatStat('tv')}
                    </div>
                    <div>
                        Seasons: {formatStat('season')}
                        <br />
                        Episodes: {formatStat('episode')}
                    </div>
                    <div>
                        Airlines: {formatStat('airline')}
                        <br />
                        Locations: {formatStat('location')}
                    </div>
                    <div>
                        Logs: {formatStat('log')}
                        <br />
                        Visits: {formatStat('visit')}
                    </div>
                </Loading>
            </Box>
            <Box title="Settings" border="border-b" className="grid grid-cols-admin gap-12 items-center">
                <Loading isLoading={loadingSettings} text="Loading settings..." className="col-span-3">
                    <span className="truncate">Countdown icon</span>
                    <select className="input text-12 pr-16" defaultValue={settings?.countdownIcon} ref={countdownIcon}>
                        <option value="none">None</option>
                        <option value="birthday">Birthday</option>
                        <option value="christmas">Christmas</option>
                        <option value="newyear">New Year</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="wedding">Wedding</option>
                    </select>
                    <Button text="Set" onClick={() => saveSetting('countdownIcon', countdownIcon.current?.value)} />
                    <span className="truncate">Countdown target date</span>
                    <input className="input text-12" type="datetime-local" defaultValue={settings?.countdownTarget} ref={countdownTarget} />
                    <Button text="Set" onClick={() => saveSetting('countdownTarget', countdownTarget.current?.value)} />
                </Loading>
            </Box>
            <Box title="Tasks" border="border-b" className="grid grid-cols-admin gap-12 items-center">
                <span className="truncate">Update number of stored movies</span>
                <select className="input text-12 pr-16" defaultValue="50" ref={updateMovieCount}>
                    {renderOptions([10, 50, 100, 250, 500, 'all'])}
                </select>
                <Button text="Run" onClick={() => updateMedia('movie', getCount(updateMovieCount.current))} />
                <span className="truncate">Update number of stored tv-shows</span>
                <select className="input text-12 pr-16" defaultValue="10" ref={updateTvCount}>
                    {renderOptions([5, 10, 50, 100, 'all'])}
                </select>
                <Button text="Run" onClick={() => updateMedia('tv', getCount(updateTvCount.current))} />
                <span className="truncate">Update IATA airline entries</span>
                <span />
                <Button text="Run" onClick={() => updateIata('airlines')} />
                <span className="truncate">Update IATA location entries</span>
                <span />
                <Button text="Run" onClick={() => updateIata('locations')} />
                <span className="truncate">Clear all log messages</span>
                <span />
                <Button text="Clear" onClick={() => clearLogs()} />
                <span className="truncate">Run database backup</span>
                <span />
                <Button text="Backup" onClick={() => backup()} />
            </Box>
            <Box title="Been" className="grid grid-cols-admin gap-12 items-center">
                <Loading isLoading={loadingBeen} text="Loading data..." className="col-span-3">
                    <span className="truncate">Add new country</span>
                    <select className="input text-12 pr-16 max-w-narrow" ref={countryList}>
                        {availableCountries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                                {country.isUN ? null : '*'}
                            </option>
                        ))}
                    </select>
                    <Button text="Add" onClick={() => addCountry(countryList.current?.value)} />
                    <div className="col-span-3" />
                    {beenCountries?.map((item) =>
                        item.country === 'NO' ? (
                            <span key={item.country} className="col-span-3">
                                {item.name}
                            </span>
                        ) : (
                            <Fragment key={item.country}>
                                <span className="truncate">
                                    {item.name} ({item.visited})
                                </span>
                                <div className="col-span-2 flex justify-end items-center gap-12">
                                    <Button text="Increment" icon={mdiPlus} onClick={() => incrementCountry(item.country)} />
                                    <Button text="Decrement" icon={mdiMinus} onClick={() => decrementCountry(item.country)} />
                                    <Button text="Remove" icon={mdiDeleteOutline} onClick={() => removeCountry(item.country)} />
                                </div>
                            </Fragment>
                        ),
                    )}
                </Loading>
            </Box>
        </>
    );
};
