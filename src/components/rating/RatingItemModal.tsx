import { useState } from 'react';
import { mdiContentSaveOutline, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js';

import { useRatingActions, useRatingItems } from '@/data/ratings';

import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';
import { Loading } from '@/components/page/Loading';
import { Rating, RatingItem } from '@/interfaces';

interface RatingItemModalProps {
    rating: Rating;
    close: () => void;
}

export const RatingItemModal = ({ rating, close }: RatingItemModalProps) => {
    const { items, loading } = useRatingItems(rating.id);
    const { saveRatingItem, deleteRatingItem } = useRatingActions();

    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [editing, setEditing] = useState<number>();

    const edit = (item: RatingItem): void => {
        setEditing(item.id);
        setTitle(item.title);
        setSubtitle(item.subtitle ?? '');
    };

    const save = () => {
        saveRatingItem(rating.id, { id: editing, ratingId: rating.id, title, subtitle: subtitle || undefined });
        setEditing(undefined);
        setTitle('');
        setSubtitle('');
    };
    const remove = (id: number) => {
        deleteRatingItem(rating.id, id);
    };

    return (
        <Modal title={rating.title} right={<Loading isLoading={loading}>Total: {items.length}</Loading>} close={close}>
            <table className="table-auto border-collapse w-full text-left">
                <thead>
                    <tr>
                        <th className="px-8">Title</th>
                        <th className="px-8">Sub</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr
                            className="border dark:border-slate-400 odd:bg-slate-100 dark:odd:bg-slate-800 text-center"
                            key={`ratingItem${idx}`}>
                            <td className="text-left py-4 px-8">{item.title}</td>
                            <td className="text-left text-14 py-4 px-8">{item.subtitle}</td>
                            <td className="text-right py-4 px-8">
                                <div className="flex gap-12 justify-end items-center">
                                    <Button text="Edit" icon={mdiPencilOutline} onClick={() => edit(item)} />
                                    <Button text="Delete" icon={mdiDeleteOutline} onClick={() => remove(item.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr className="border dark:border-slate-400 odd:bg-slate-100 dark:odd:bg-slate-800 text-center">
                        <td className="text-left py-4 px-8">
                            <input
                                className="input"
                                type="text"
                                maxLength={64}
                                placeholder="Add new item..."
                                autoComplete="off"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </td>
                        <td className="text-left py-4 px-8">
                            <input
                                className="input"
                                type="text"
                                maxLength={124}
                                autoComplete="off"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                            />
                        </td>
                        <td className="text-right py-4 px-8">
                            <Button text="Save" icon={mdiContentSaveOutline} onClick={save} className="ml-auto" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </Modal>
    );
};
