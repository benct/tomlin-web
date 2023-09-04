import { useState } from 'react';

import { formatDate } from '@/util/formatting';

import { MediaEpisodeEntry } from '@/interfaces';
import { SeenIcon } from './MediaIcons';

interface MediaEpisodeProps {
    episode: MediaEpisodeEntry;
    setSeenEpisode: (episodeId: number, set: boolean) => void;
}

export const MediaEpisode = ({ episode, setSeenEpisode }: MediaEpisodeProps) => {
    const [overview, setOverview] = useState<boolean>(false);

    const toggleOverview = (): void => {
        setOverview(!overview);
    };

    return (
        <>
            <span className="text-14 text-neutral dark:text-neutral-dark">{episode.episode}</span>
            <button className="text-14 text-left truncate" onClick={toggleOverview}>
                {episode.title}
            </button>
            <span className="text-14 text-right">{episode.release_date ? formatDate(episode.release_date, 'MMM do') : null}</span>
            <SeenIcon seen={episode.seen} setSeen={() => setSeenEpisode(episode.id, !episode.seen)} />
            {overview ? <div className="col-span-4 text-12">{episode.overview}</div> : null}
        </>
    );
};
