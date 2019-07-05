import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import Icon from '@mdi/react';
import { mdiMovieOutline, mdiTelevisionClassic } from '@mdi/js';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend,
    AreaSeries,
    LineMarkSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';

import { DefaultState, MediaStatsEntry, MediaStatsType } from '../../interfaces';

import mediaActions from '../../actions/media.js';

interface MediaStatsProps {
    movie: MediaStatsType;
    tv: MediaStatsType;
    isLoggedIn: boolean;
}

interface MediaGraphEntry {
    x: string;
    y: number;
}

class MediaStats extends React.PureComponent<MediaStatsProps & DispatchProp> {
    componentDidMount(): void {
        if (!this.props.movie.total) {
            this.props.dispatch(mediaActions.stats());
        }
    }

    static mapRatings(data?: MediaStatsEntry[]): MediaGraphEntry[] {
        return data
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                  (num: number): MediaGraphEntry => ({
                      x: `${num} +`,
                      y: (data.find((item: MediaStatsEntry): boolean => item.score === num) || { count: 0 }).count,
                  })
              )
            : [];
    }

    static mapYears(data?: MediaStatsEntry[]): MediaGraphEntry[] {
        return data ? data.map((item: MediaStatsEntry): MediaGraphEntry => ({ x: `${item.year}0`, y: item.count })) : [];
    }

    static renderLineChart(title: string, color: string, data: MediaGraphEntry[]): React.ReactElement {
        return (
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
    }

    static renderBarChart(title: string, color: string, data: MediaGraphEntry[]): React.ReactElement {
        return (
            <FlexibleWidthXYPlot xType="ordinal" height={250} animation={true}>
                <DiscreteColorLegend
                    style={{ position: 'absolute', left: '50px', top: '10px' }}
                    orientation="horizontal"
                    items={[{ title, color }]}
                />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries color={color} opacity={0.8} stroke="black" data={data} />
            </FlexibleWidthXYPlot>
        );
    }

    static renderStats(stats: MediaStatsType): React.ReactElement {
        return (
            <div className="text-small mbl" style={{ height: '60px' }}>
                Total <span className="strong prl">{stats.total || '-'}</span>
                Seen <span className="strong prl">{stats.seen || '-'}</span>
                Favourite <span className="strong">{stats.favourite || '-'}</span>
                {stats.episodes ? (
                    <div className="text-smaller mts">
                        Episodes <span className="strong prl">{stats.episodes || '-'}</span>
                        Seen <span className="strong prl">{stats.seen_episodes || '-'}</span>
                    </div>
                ) : null}
            </div>
        );
    }

    render(): React.ReactElement {
        return (
            <>
                <div className="text mbl">
                    Personal movie and TV-show watchlist.
                    {!this.props.isLoggedIn && <span className="no-wrap"> Login required.</span>}
                </div>
                <div className="media-stats text-center">
                    <div>
                        <div className="border-bottom pbs mam">
                            <Icon path={mdiMovieOutline} size={1} title="Movies" className="text-icon" />
                            <span className="valign-middle">Tracked Movies</span>
                        </div>
                        {MediaStats.renderStats(this.props.movie)}
                        {MediaStats.renderLineChart(
                            `Rating (avg: ${this.props.movie.rating || '-'})`,
                            '#006080',
                            MediaStats.mapRatings(this.props.movie.ratings)
                        )}
                        {MediaStats.renderBarChart('Release (decade)', '#006080', MediaStats.mapYears(this.props.movie.years))}
                    </div>
                    <div>
                        <div className="border-bottom pbs mam">
                            <Icon path={mdiTelevisionClassic} size={1} title="TV-Shows" className="text-icon" />
                            <span className="valign-middle">Tracked TV-Shows</span>
                        </div>
                        {MediaStats.renderStats(this.props.tv)}
                        {MediaStats.renderLineChart(
                            `Rating (avg: ${this.props.tv.rating || '-'})`,
                            '#008060',
                            MediaStats.mapRatings(this.props.tv.ratings)
                        )}
                        {MediaStats.renderBarChart('First aired (decade)', '#008060', MediaStats.mapYears(this.props.tv.years))}
                    </div>
                </div>
            </>
        );
    }
}

export default connect(
    (state: DefaultState): MediaStatsProps => ({
        movie: state.media.stats.movie,
        tv: state.media.stats.tv,
        isLoggedIn: state.auth.isLoggedIn,
    })
)(MediaStats);
