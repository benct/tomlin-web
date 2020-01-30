import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
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

import { DefaultState, MediaStatsEntry, MediaStatsType, ThunkDispatchProp } from '../../interfaces';
import { getStats } from '../../actions/media';

import Loading from '../page/Loading';

interface MediaStatsProps {
    movie: MediaStatsType;
    tv: MediaStatsType;
    loading: boolean;
    isLoggedIn: boolean;
}

interface MediaGraphEntry {
    x: string;
    y: number;
}

const MediaStats: React.FC<MediaStatsProps & ThunkDispatchProp> = props => {
    React.useEffect(() => {
        if (!props.movie.total) {
            props.dispatch(getStats());
        }
    }, []);

    const mapRatings = (data?: MediaStatsEntry[]): MediaGraphEntry[] =>
        data
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                  (num: number): MediaGraphEntry => ({
                      x: `${num} +`,
                      y: (data.find((item: MediaStatsEntry): boolean => item.score === num) ?? { count: 0 }).count,
                  })
              )
            : [];

    const mapYears = (data?: MediaStatsEntry[]): MediaGraphEntry[] =>
        data ? data.filter(item => item.year).map((item: MediaStatsEntry): MediaGraphEntry => ({ x: `${item.year}0`, y: item.count })) : [];

    const renderLineChart = (title: string, color: string, data: MediaGraphEntry[]): React.ReactElement => (
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
    );

    const renderBarChart = (title: string, color: string, data: MediaGraphEntry[]): React.ReactElement => (
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
    );

    const renderStats = (stats: MediaStatsType): React.ReactElement => (
        <div className="text-small mbl" style={{ height: '60px' }}>
            Total <span className="strong prl">{stats.total ?? '-'}</span>
            Seen <span className="strong prl">{stats.seen ?? '-'}</span>
            Favourite <span className="strong">{stats.favourite ?? '-'}</span>
            {stats.episodes ? (
                <div className="text-smaller mts">
                    Episodes <span className="strong prl">{stats.episodes ?? '-'}</span>
                    Seen <span className="strong prl">{stats.seen_episodes ?? '-'}</span>
                </div>
            ) : null}
        </div>
    );

    return (
        <>
            <div className="text mbl">
                Personal movie and TV-show watchlist.
                {!props.isLoggedIn && <span className="no-wrap"> Login required.</span>}
            </div>
            <Loading isLoading={props.loading} text="Loading stats...">
                <div className="media-stats text-center">
                    <div>
                        <div className="border-bottom pbs mam">
                            <Icon path={mdiMovieOutline} size={1} title="Movies" className="text-icon" />
                            <span className="valign-middle">Tracked Movies</span>
                        </div>
                        {renderStats(props.movie)}
                        {renderLineChart(`Rating (avg: ${props.movie.rating ?? '-'})`, '#006080', mapRatings(props.movie.ratings))}
                        {renderBarChart('Release (by decade)', '#006080', mapYears(props.movie.years))}
                    </div>
                    <div>
                        <div className="border-bottom pbs mam">
                            <Icon path={mdiTelevisionClassic} size={1} title="TV-Shows" className="text-icon" />
                            <span className="valign-middle">Tracked TV-Shows</span>
                        </div>
                        {renderStats(props.tv)}
                        {renderLineChart(`Rating (avg: ${props.tv.rating ?? '-'})`, '#008060', mapRatings(props.tv.ratings))}
                        {renderBarChart('First aired (by decade)', '#008060', mapYears(props.tv.years))}
                    </div>
                </div>
            </Loading>
        </>
    );
};

export default connect(
    (state: DefaultState): MediaStatsProps => ({
        movie: state.media.stats.movie,
        tv: state.media.stats.tv,
        loading: state.loading,
        isLoggedIn: state.auth.isLoggedIn,
    })
)(MediaStats);
