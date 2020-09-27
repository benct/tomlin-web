import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { MediaEpisodeEntry, MediaSeasonEntry } from '../../interfaces';

import { formatDate, formatGradientHSL } from '../../util/formatting';
import { seenEpisode, seenEpisodes } from '../../actions/media';

import { SeenIcon } from './MediaIcons';

interface MediaSeasonProps {
    data: MediaSeasonEntry;
}

const MediaSeason: React.FC<MediaSeasonProps> = ({ data }) => {
    const [showEpisodes, setShowEpisodes] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const [overview, setOverview] = useState<string>();

    const dispatch = useDispatch();

    const toggleEpisodes = (): void => {
        setShowEpisodes(!showEpisodes);
    };

    const showOverview = (title?: string, overview?: string): void => {
        setTitle(title);
        setOverview(overview);
    };

    const renderEpisodes = (): React.ReactElement[] =>
        data.episodes.map(
            (episode): React.ReactElement => (
                <React.Fragment key={`episode${episode.id}`}>
                    <span className="text-small pll">{episode.episode}</span>
                    <button
                        className="button-blank text-small text-left truncate"
                        onClick={() => showOverview(episode.title, episode.overview)}>
                        {episode.title}
                    </button>
                    <span className="text-small text-right">
                        {episode.release_date ? formatDate(episode.release_date, 'MMM do') : null}
                    </span>
                    <SeenIcon
                        seen={episode.seen}
                        setSeen={() => dispatch(seenEpisode({ id: episode.id, set: !episode.seen }))}
                        size="22px"
                        className="mrm"
                    />
                </React.Fragment>
            )
        );

    const episodesSeen = data.episodes.filter((ep: MediaEpisodeEntry): boolean => ep.seen).length;
    const episodesTotal = data.episodes.length;

    return (
        <>
            <span className="pts">
                <button
                    className="input input-small float-right"
                    style={{ color: formatGradientHSL(episodesSeen, episodesTotal) }}
                    onClick={toggleEpisodes}>
                    {episodesSeen}/{episodesTotal}
                </button>
                {episodesSeen === 0 ? (
                    <button className="input input-small float-right mrm" onClick={() => dispatch(seenEpisodes(data.id))}>
                        Mark all
                    </button>
                ) : null}
                <span className="text-small prl">{data.season}</span>
                <button className="button-blank border-bottom" onClick={toggleEpisodes}>
                    {data.title}
                </button>
                <span className="text-small plm">{formatDate(data.release_date, '(MMM do, YYY)')}</span>
            </span>
            {showEpisodes ? (
                <div className="media-overlay-episodes">
                    {renderEpisodes()}
                    {overview ? (
                        <div className="media-overlay-episode-overview shadow" role="dialog" onClick={() => showOverview()}>
                            <span>{title}</span>
                            <span className="text-small">{overview}</span>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );
};

export default MediaSeason;
