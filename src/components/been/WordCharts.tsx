import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Icon } from '@mdi/react';
import { mdiEarth, mdiMapOutline } from '@mdi/js';

import { continents, countries, countryCodesInUN } from '@/util/geo';

import { BeenItem } from '@/interfaces';

const colors = ['#ef4444', '#8b5cf6', '#eab308', '#3b82f6', '#ec4899', '#06b6d4', '#f97316'];
const calculatePercent = (num: number, total: number): string => ((num * 100) / total).toFixed(1);

interface WorldChartsProps {
    data?: BeenItem[];
}

const WorldCharts = ({ data }: WorldChartsProps) => {
    const continentData = Object.keys(continents)
        .map((continent, idx) => {
            const countriesInContinent = countryCodesInUN.filter((code) => countries[code].continent === continent);
            const beenInContinent = data?.filter((item) => countriesInContinent.includes(item.country)) ?? [];
            return {
                continent: continents[continent],
                total: countriesInContinent.length,
                been: beenInContinent.length,
                percent: calculatePercent(beenInContinent.length, countriesInContinent.length),
                color: colors[idx],
            };
        })
        .filter((continent) => continent.been > 0);

    const totalBeen = data?.length ?? 0;
    const totalData = [
        { name: 'Been', value: totalBeen, percent: calculatePercent(totalBeen, countryCodesInUN.length), color: '#22c55e' },
        {
            name: 'Not been',
            value: countryCodesInUN.length - totalBeen,
            percent: calculatePercent(countryCodesInUN.length - totalBeen, countryCodesInUN.length),
            color: '#64748b',
        },
    ];

    return (
        <div className="grid md:grid-cols-2 mb-32">
            <div>
                <div className="flex justify-center items-center gap-8 my-8">
                    <Icon path={mdiEarth} size={1} title="World" className="text-secondary dark:text-secondary-dark" />
                    World
                </div>
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie
                            data={totalData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(val) => `${val.name}: ${val.value}`}
                            outerRadius={60}
                            dataKey="value">
                            {totalData.map((entry, idx) => (
                                <Cell key={`cell${idx}`} fill={entry.color} fontSize={12} />
                            ))}
                            <LabelList dataKey="percent" formatter={(val: string) => `${val}%`} fontSize={10} />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div>
                <div className="flex justify-center items-center gap-8 my-8">
                    <Icon path={mdiMapOutline} size={1} title="Continent" className="text-secondary dark:text-secondary-dark" />
                    Continent
                </div>
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie
                            data={continentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(val) => `${val.continent}: ${val.been}`}
                            outerRadius={60}
                            dataKey="been">
                            {continentData.map((entry, idx) => (
                                <Cell key={`cell${idx}`} fill={entry.color} fontSize={12} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WorldCharts;
