import { DataItem, WorldMap as SvgWorldMap } from 'react-svg-worldmap';
import { BeenItem } from '@/interfaces';

interface WorldMapProps {
    data?: BeenItem[];
}

export const WorldMap = ({ data }: WorldMapProps) => {
    const unsure = ['GB', 'SE', 'DK', 'ES'];

    const formatVisits = (country: string, visits: number): string | number =>
        country === 'NO' ? 'Home' : unsure.includes(country) ? `${visits}+` : visits;

    const mapData: DataItem<string>[] =
        data?.map((item) => ({ country: item.country.toLowerCase(), value: `(${formatVisits(item.country, item.visited)})` })) ?? [];

    return (
        <>
            <SvgWorldMap color="#22c55e" borderColor="black" size="xl" frame frameColor="lightgray" richInteraction data={mapData} />
            <div className="text-10 text-neutral dark:text-neutral-dark mt-4">
                Double click to zoom. Hover countries for more info. Times visited in parenthesis.
            </div>
        </>
    );
};

export default WorldMap;
