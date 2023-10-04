import { useState } from 'react';

import { formatDate } from '@/util/formatting';

import { IataAirline, IataLocation } from '@/interfaces';
import { Box } from '@/components/page/Box';
import { Modal } from '@/components/page/Modal';
import { Autocomplete, AutocompleteOption } from '@/components/page/Autocomplete';

const mapAutocompleteResponse = <T,>(response: AutocompleteOption<T>[]): AutocompleteOption<T>[] => response;

export const IataSearch = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<Partial<IataLocation & IataAirline>>();
    const [airlineOnly, setAirlineOnly] = useState<boolean>(true);
    const [airportOnly, setAirportOnly] = useState<boolean>(true);
    const [matchIdentifier, setMatchIdentifier] = useState<boolean>(false);

    const handleSelect = (opt: AutocompleteOption<IataLocation | IataAirline>): void => {
        setShowModal(true);
        setSelected(opt.data);
    };

    return (
        <Box title="IATA / ICAO Search" border="border-t" className="max-w-sm mx-auto space-y-16">
            <Autocomplete
                path="/iata/search/location"
                label="Locations"
                onSelectOption={handleSelect}
                mapResponse={mapAutocompleteResponse<any>}
                queryParams={{ airportOnly, matchIdentifier }}
                minLength={3}
                placeholder={`Enter location identifier${matchIdentifier ? '' : ', name, area or country'}...`}
                className="h-40"
            />
            <label className="flex gap-8 items-center cursor-pointer">
                <input type="checkbox" checked={airportOnly} onChange={() => setAirportOnly(!airportOnly)} />
                <span className="select-none text-14 truncate">Search airport and city locations only (exclude railway, bus, etc..)</span>
            </label>
            <label className="flex gap-8 items-center cursor-pointer pb-16">
                <input type="checkbox" checked={matchIdentifier} onChange={() => setMatchIdentifier(!matchIdentifier)} />
                <span className="select-none text-14 truncate">Match on identifier only (IATA/ICAO codes)</span>
            </label>
            <Autocomplete
                path="/iata/search/airline"
                label="Airlines"
                onSelectOption={handleSelect}
                mapResponse={mapAutocompleteResponse<any>}
                queryParams={{ airlineOnly }}
                minLength={2}
                placeholder="Enter airline identifier or name..."
                className="h-40"
            />
            <label className="flex gap-8 items-center cursor-pointer pb-16">
                <input type="checkbox" checked={airlineOnly} onChange={() => setAirlineOnly(!airlineOnly)} />
                <span className="select-none text-14 truncate">Search airlines only (exclude airline alliances, GDS, etc..)</span>
            </label>
            <div className="text-12 text-neutral dark:text-neutral-dark">
                Location and airline data are based on public point of reference data and best known information available, curated by the
                Open Travel Data (OPTD) project.
                <br />
                <br />
                Disclaimer: This site is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the
                International Air Transport Association (IATA), the International Civil Aviation Organization (ICAO), or any of their
                subsidiaries or affiliates.
            </div>
            {showModal && selected && (
                <Modal
                    title={`${selected.name}${selected.alias ? ` (${selected.alias})` : ''}`}
                    close={() => setShowModal(false)}
                    className="grid grid-cols-auto-1fr gap-8">
                    <span className="text-neutral dark:text-neutral-dark">IATA</span>
                    <span>{selected.iataCode}</span>
                    {selected.icaoCode && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">ICAO</span>
                            <span>{selected.icaoCode}</span>
                        </>
                    )}
                    <span className="text-neutral dark:text-neutral-dark">Type</span>
                    <span>
                        {selected.typeName}
                        {!selected.typeName?.includes('metropol') ? `, ${selected.operational ? 'Operational' : 'Ceased operations'}` : ''}
                    </span>
                    {selected.cityName && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">City</span>
                            <span>
                                {selected.cityName.replaceAll('=', ' / ')} ({selected.cityCode})
                                {selected.area ? `, ${selected.area} (${selected.areaCode})` : null}
                            </span>
                        </>
                    )}
                    {selected.country && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">Country</span>
                            <span>
                                {selected.country} ({selected.countryCode}), {selected.continent}
                            </span>
                        </>
                    )}
                    {selected.latitude && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">Position</span>
                            <span>
                                {selected.latitude}, {selected.longitude}
                            </span>
                        </>
                    )}
                    {selected.timezone && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">Timezone</span>
                            <span>{selected.timezone}</span>
                        </>
                    )}
                    {selected.started && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">Started</span>
                            <span>{formatDate(selected.started)}</span>
                        </>
                    )}
                    {selected.ended && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">Ended</span>
                            <span>{formatDate(selected.ended)}</span>
                        </>
                    )}
                    {selected.wiki && (
                        <>
                            <span className="text-neutral dark:text-neutral-dark">Wiki</span>
                            <a
                                href={selected.wiki}
                                target="_blank"
                                rel="noreferrer external"
                                className="text-secondary dark:text-secondary-dark truncate">
                                {selected.wiki}
                            </a>
                        </>
                    )}
                </Modal>
            )}
        </Box>
    );
};
