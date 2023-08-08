import { FC, useState } from 'react';
import { mdiChartBoxOutline, mdiListBoxOutline, mdiViewGridPlusOutline } from '@mdi/js';

import { formatDate } from '@/util/formatting';
import { useRatings } from '@/data/ratings';

import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';
import { RatingModal } from './RatingModal';
import { RatingResultModal } from './RatingResultModal';
import { RatingItemModal } from './RatingItemModal';
import { Rating } from '@/interfaces';

export const Ratings: FC = () => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [showItems, setShowItems] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>();

    const { ratings, loading } = useRatings();

    const items = (rating: Rating): void => {
        setShowItems(true);
        setSelected(rating.id);
    };

    const results = (rating: Rating): void => {
        setShowResults(true);
        setSelected(rating.id);
    };

    const edit = (rating?: Rating): void => {
        setShowOverlay(true);
        setSelected(rating?.id);
    };

    const closeModal = (): void => {
        setShowItems(false);
        setShowResults(false);
        setShowOverlay(false);
        setSelected(undefined);
    };

    const selectedRating = selected ? ratings.find((rating) => rating.id === selected) : undefined;

    const renderRow = (rating: Rating, idx: number) => (
        <tr className="border dark:border-slate-400 odd:bg-slate-100 dark:odd:bg-slate-800" key={`rating${idx}`}>
            <td className="py-8 px-16">
                <button className="text-secondary dark:text-secondary-dark font-bold" onClick={(): void => edit(rating)}>
                    {rating.title}
                </button>
                <div className={`text-12 text-${rating.active ? 'good' : 'warn'}`}>{rating.active ? 'Active' : 'Inactive'}</div>
            </td>
            <td className="py-8 px-16 text-14">{rating.step}</td>
            <td className="py-8 px-16 text-14">{rating.blind ? 'Yes' : 'No'}</td>
            <td className="py-8 px-16 text-14 hidden sm:table-cell whitespace-nowrap">{formatDate(rating.updated)}</td>
            <td className="py-8 px-16 text-14 whitespace-nowrap w-min">
                <div className="flex gap-12 justify-end items-center">
                    <Button text="Items" icon={mdiListBoxOutline} onClick={(): void => items(rating)} />
                    <Button text="Results" icon={mdiChartBoxOutline} onClick={(): void => results(rating)} />
                </div>
            </td>
        </tr>
    );

    return (
        <Box title="Ratings" className="min-h">
            <Loading isLoading={loading} text="Loading ratings...">
                {ratings.length ? (
                    <table className="table-auto border-collapse w-full">
                        <thead className="text-left">
                            <tr>
                                <th className="px-16">
                                    <Button text="New Rating" icon={mdiViewGridPlusOutline} onClick={(): void => edit()} />
                                </th>
                                <th className="px-16">Step</th>
                                <th className="px-16">Blind</th>
                                <th className="px-16 hidden sm:table-cell">Updated</th>
                                <th className="px-16"></th>
                            </tr>
                        </thead>
                        <tbody>{ratings.sort((a, b) => (a.updated < b.updated ? -1 : 1)).map(renderRow)}</tbody>
                    </table>
                ) : (
                    <div className="text-center">No ratings found...</div>
                )}
            </Loading>
            {showOverlay ? <RatingModal rating={selectedRating} close={closeModal} /> : null}
            {showResults && selectedRating ? <RatingResultModal rating={selectedRating} close={closeModal} /> : null}
            {showItems && selectedRating ? <RatingItemModal rating={selectedRating} close={closeModal} /> : null}
        </Box>
    );
};
