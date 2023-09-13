import { Icon } from '@mdi/react';
import { mdiMovieOutline, mdiTelevisionClassic } from '@mdi/js';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useAppContext } from '@/data/context';
import { useMediaStats } from '@/data/media';

import { MediaStatsEntry, MediaStatsType } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Box } from '@/components/page/Box';

export const MediaStats = () => {
    const { isLoggedIn } = useAppContext();
    const { stats, loading } = useMediaStats();

    const renderLineChart = (title: string, color: string, data?: MediaStatsEntry[]) => (
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data} margin={{ right: 32, top: 16 }}>
                <CartesianGrid strokeDasharray="3 5" opacity={0.5} />
                <XAxis dataKey="score" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip
                    formatter={(value) => [value, 'Total']}
                    labelFormatter={(label) => `${label} - ${label + 1}`}
                    contentStyle={{ fontSize: 10 }}
                />
                <Legend formatter={() => title} wrapperStyle={{ fontSize: 10, marginTop: 20 }} verticalAlign="top" />
                <Area type="monotone" dataKey="count" stroke={color} strokeWidth={1} fill={color} fillOpacity={0.3} />
            </AreaChart>
        </ResponsiveContainer>
    );

    const renderBarChart = (title: string, color: string, data: MediaStatsEntry[]) => (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ right: 32, top: 16 }}>
                <CartesianGrid strokeDasharray="3 5" opacity={0.5} vertical={false} />
                <XAxis dataKey="year" fontSize={10} interval={0} />
                <YAxis fontSize={10} />
                <Tooltip
                    formatter={(value) => [value, 'Total']}
                    labelFormatter={(label) => `${label} - ${label + 9}`}
                    contentStyle={{ fontSize: 10 }}
                />
                <Legend formatter={() => title} wrapperStyle={{ fontSize: 10, marginTop: 20 }} verticalAlign="top" />
                <Bar dataKey="count" stroke={color} strokeWidth={1} fill={color} fillOpacity={0.3} />
            </BarChart>
        </ResponsiveContainer>
    );

    const renderStats = (stats: MediaStatsType) => (
        <div className="flex justify-center items-center text-14 mb-8">
            Total&nbsp;<span className="font-bold text-16 pr-16">{stats.total ?? '-'}</span>
            Seen&nbsp;<span className="font-bold text-16 pr-16">{stats.seen ?? '-'}</span>
            Favourite&nbsp;<span className="font-bold text-16">{stats.favourite ?? '-'}</span>
        </div>
    );

    const renderEpisodeStats = (stats: MediaStatsType) => (
        <div className="flex justify-center items-center text-12">
            Episodes&nbsp;<span className="font-bold text-14 pr-16">{stats.episodes ?? '-'}</span>
            Seen&nbsp;<span className="font-bold text-14">{stats.episodesSeen ?? '-'}</span>
        </div>
    );

    return (
        <Box title="Media">
            <div className="text-center mb-16">
                Personal movie and TV watchlist and tracker.
                {!isLoggedIn && <span className="no-wrap"> Login required.</span>}
            </div>
            <Loading isLoading={loading} text="Loading stats...">
                {stats ? (
                    <div className="grid md:grid-cols-2 gap-16 text-center">
                        <div>
                            <div className="flex justify-center gap-8 border-b pb-8 m-12">
                                <Icon
                                    path={mdiMovieOutline}
                                    size={1}
                                    title="Movies"
                                    className="text-secondary dark:text-secondary-dark"
                                    id="movie-icon"
                                />
                                <span>Tracked Movies</span>
                            </div>
                            <div className="h-56">{renderStats(stats.movie)}</div>
                            {renderLineChart(`Rating (avg: ${stats.movie.rating.toFixed(1) ?? '-'})`, '#0284c7', stats.movie.ratings)}
                            {renderBarChart('Released (by decade)', '#0284c7', stats.movie.years)}
                        </div>
                        <div>
                            <div className="flex justify-center gap-8 border-b pb-8 m-12">
                                <Icon
                                    path={mdiTelevisionClassic}
                                    size={1}
                                    title="TV-Shows"
                                    className="text-secondary dark:text-secondary-dark"
                                    id="tv-icon"
                                />
                                <span>Tracked TV-Shows</span>
                            </div>
                            <div className="h-56">
                                {renderStats(stats.tv)}
                                {renderEpisodeStats(stats.tv)}
                            </div>
                            {renderLineChart(`Rating (avg: ${stats.tv.rating.toFixed(1) ?? '-'})`, '#16a34a', stats.tv.ratings)}
                            {renderBarChart('First aired (by decade)', '#16a34a', stats.tv.years)}
                        </div>
                    </div>
                ) : null}
            </Loading>
        </Box>
    );
};
