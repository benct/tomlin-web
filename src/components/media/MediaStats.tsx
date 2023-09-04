import { Icon } from '@mdi/react';
import { mdiMovieOutline, mdiTelevisionClassic } from '@mdi/js';
import {
    AreaSeries,
    DiscreteColorLegend,
    FlexibleWidthXYPlot,
    HorizontalGridLines,
    LineMarkSeries,
    VerticalBarSeries,
    XAxis,
    YAxis,
} from 'react-vis';
import 'react-vis/dist/style.css';

import { useAppContext } from '@/data/context';
import { useMediaStats } from '@/data/media';

import { MediaStatsEntry, MediaStatsType } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Box } from '@/components/page/Box';

interface MediaGraphEntry {
    x: string;
    y: number;
}

export const MediaStats = () => {
    const { isLoggedIn } = useAppContext();
    const { stats, loading } = useMediaStats();

    const mapRatings = (data?: MediaStatsEntry[]): MediaGraphEntry[] =>
        data
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                  (num: number): MediaGraphEntry => ({
                      x: `${num} +`,
                      y: (data.find((item: MediaStatsEntry): boolean => item.score === num) ?? { count: 0 }).count,
                  }),
              )
            : [];

    const mapYears = (data?: MediaStatsEntry[]): MediaGraphEntry[] =>
        data
            ?.filter((item) => item.year)
            .sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
            .map((item: MediaStatsEntry): MediaGraphEntry => ({ x: `${item.year}0`, y: item.count })) ?? [];

    const renderLineChart = (title: string, color: string, data: MediaGraphEntry[]) => (
        <div style={{ height: '250px' }}>
            <FlexibleWidthXYPlot xType="ordinal" height={250} animation={true}>
                <DiscreteColorLegend
                    style={{ position: 'absolute', left: '50px', top: '10px' }}
                    orientation="horizontal"
                    items={[{ title, color }]}
                />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <AreaSeries curve="curveMonotoneX" color={color} opacity={0.25} stroke="transparent" data={data} />
                <LineMarkSeries curve="curveMonotoneX" stroke={color} strokeStyle="solid" size={3} data={data} />
            </FlexibleWidthXYPlot>
        </div>
    );

    const renderBarChart = (title: string, color: string, data: MediaGraphEntry[]) => (
        <div style={{ height: '250px' }}>
            <FlexibleWidthXYPlot xType="ordinal" height={250} animation={true}>
                <DiscreteColorLegend
                    style={{ position: 'absolute', left: '50px', top: '10px' }}
                    orientation="horizontal"
                    items={[{ title, color }]}
                />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries color={color} opacity={0.8} stroke="#aaa" data={data} />
            </FlexibleWidthXYPlot>
        </div>
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
            Seen&nbsp;<span className="font-bold text-14">{stats.seen_episodes ?? '-'}</span>
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
                            {renderLineChart(`Rating (avg: ${stats.movie?.rating ?? '-'})`, '#006080', mapRatings(stats.movie.ratings))}
                            {renderBarChart('Release (by decade)', '#006080', mapYears(stats.movie.years))}
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
                            {renderLineChart(`Rating (avg: ${stats.tv.rating ?? '-'})`, '#008060', mapRatings(stats.tv.ratings))}
                            {renderBarChart('First aired (by decade)', '#008060', mapYears(stats.tv.years))}
                        </div>
                    </div>
                ) : null}
            </Loading>
        </Box>
    );
};
