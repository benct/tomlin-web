import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

class Stats extends React.PureComponent {
    componentDidMount() {
        if (!this.props.stats.movie.total) {
            this.props.dispatch(mediaActions.stats());
        }
    }

    static mapRatings(data) {
        return data
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
                  x: `${num} +`,
                  y: (data.find(item => item.score === num) || { count: 0 }).count,
              }))
            : [];
    }

    static mapYears(data) {
        return data ? data.map(item => ({ x: `${item.year}0`, y: item.count })) : [];
    }

    static renderLineChart(title, color, data) {
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

    static renderBarChart(title, color, data) {
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

    static renderStats(stats) {
        return (
            <div className="text-small mbl">
                Total <span className="strong prl">{stats.total || '-'}</span>
                Seen <span className="strong prl">{stats.seen || '-'}</span>
                Favourite <span className="strong">{stats.favourite || '-'}</span>
            </div>
        );
    }

    render() {
        return (
            <>
                <div className="text mbl">
                    Personal movie and TV-show watchlist.
                    {!this.props.isLoggedIn && <span className="no-wrap"> Login required.</span>}
                </div>
                <div className="media-stats text-center">
                    <div>
                        <div className="border-bottom pbs mam">Tracked Movies</div>
                        {Stats.renderStats(this.props.stats.movie)}
                        {Stats.renderLineChart(
                            `Rating (avg: ${this.props.stats.movie.rating || '-'})`,
                            '#006080',
                            Stats.mapRatings(this.props.stats.movie.ratings)
                        )}
                        {Stats.renderBarChart('Release (decade)', '#006080', Stats.mapYears(this.props.stats.movie.years))}
                    </div>
                    <div>
                        <div className="border-bottom pbs mam">Tracked TV-Shows</div>
                        {Stats.renderStats(this.props.stats.tv)}
                        {Stats.renderLineChart(
                            `Rating (avg: ${this.props.stats.tv.rating || '-'})`,
                            '#008060',
                            Stats.mapRatings(this.props.stats.tv.ratings)
                        )}
                        {Stats.renderBarChart('First aired (decade)', '#008060', Stats.mapYears(this.props.stats.tv.years))}
                    </div>
                </div>
            </>
        );
    }
}

Stats.propTypes = {
    dispatch: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(state => ({
    stats: state.media.stats,
    isLoggedIn: state.isLoggedIn,
}))(Stats);
