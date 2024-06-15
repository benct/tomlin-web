import { useState } from 'react';
import { mdiDeleteOutline } from '@mdi/js';

import { formatDate } from '@/util/formatting';

import { Button } from '@/components/page/Button';
import { SeenIcon } from './MediaIcons';
import { MediaEpisodeEntry } from '@/interfaces';

interface MediaEpisodeProps {
    episode: MediaEpisodeEntry;
    setSeenEpisode: (episodeId: number, set: boolean) => void;
    removeEpisode: (episodeId: number) => void;
}

export const MediaEpisode = ({ episode, setSeenEpisode, removeEpisode }: MediaEpisodeProps) => {
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
            {overview ? (
                <div className="col-span-4 text-12 flex items-center gap-2">
                    {episode.overview}
                    <Button text="Delete" icon={mdiDeleteOutline} onClick={() => removeEpisode(episode.id)} />
                </div>
            ) : null}
        </>
    );
};
