import React from 'react';
import { connect, DispatchProp } from 'react-redux';
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

import mediaActions from '../../actions/media.js';
import { DefaultState, MediaStats as MediaStatsObject, MediaStatsEntry, MediaStatsType } from '../../interfaces';

interface MediaStatsProps {
    stats: MediaStatsObject;
    isLoggedIn: boolean;
}

interface MediaGraphEntry {
    x: string;
    y: number;
}

class MediaStats extends React.PureComponent<MediaStatsProps & DispatchProp> {
    componentDidMount(): void {
        if (!this.props.stats.movie.total) {
            this.props.dispatch(mediaActions.stats());
        }
    }

    static mapRatings(data: MediaStatsEntry[]): MediaGraphEntry[] {
        return data
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                  (num: number): MediaGraphEntry => ({
                      x: `${num} +`,
                      y: (data.find((item: MediaStatsEntry): boolean => item.score === num) || { count: 0 }).count,
                  })
              )
            : [];
    }

    static mapYears(data: MediaStatsEntry[]): MediaGraphEntry[] {
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
                        <div className="border-bottom pbs mam">Tracked Movies</div>
                        {MediaStats.renderStats(this.props.stats.movie)}
                        {MediaStats.renderLineChart(
                            `Rating (avg: ${this.props.stats.movie.rating || '-'})`,
                            '#006080',
                            MediaStats.mapRatings(this.props.stats.movie.ratings)
                        )}
                        {MediaStats.renderBarChart('Release (decade)', '#006080', MediaStats.mapYears(this.props.stats.movie.years))}
                    </div>
                    <div>
                        <div className="border-bottom pbs mam">Tracked TV-Shows</div>
                        {MediaStats.renderStats(this.props.stats.tv)}
                        {MediaStats.renderLineChart(
                            `Rating (avg: ${this.props.stats.tv.rating || '-'})`,
                            '#008060',
                            MediaStats.mapRatings(this.props.stats.tv.ratings)
                        )}
                        {MediaStats.renderBarChart('First aired (decade)', '#008060', MediaStats.mapYears(this.props.stats.tv.years))}
                    </div>
                </div>
            </>
        );
    }
}

export default connect(
    (state: DefaultState): MediaStatsProps => ({
        stats: state.media.stats,
        isLoggedIn: state.isLoggedIn,
    })
)(MediaStats);
