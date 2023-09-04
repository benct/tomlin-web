import { mdiPageNextOutline, mdiPagePreviousOutline } from '@mdi/js';

import { useRatingActions, useRatingResults } from '@/data/ratings';

import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';
import { Loading } from '@/components/page/Loading';
import { Rating } from '@/interfaces';

interface RatingResultModalProps {
    rating: Rating;
    close: () => void;
}

export const RatingResultModal = ({ rating, close }: RatingResultModalProps) => {
    const { results, loading } = useRatingResults(rating.id);
    const { changeStep } = useRatingActions();

    return (
        <Modal
            title={rating.title}
            left={<Button text="Previous" icon={mdiPagePreviousOutline} onClick={() => changeStep('prev')} />}
            center={<Loading isLoading={loading}>Step: {rating.step}</Loading>}
            right={<Button text="Next" icon={mdiPageNextOutline} onClick={() => changeStep('next')} />}
            close={close}>
            <table className="table-auto border-collapse w-full text-left">
                <thead>
                    <tr>
                        <th className="px-8">Item</th>
                        <th className="px-8">Results</th>
                        <th className="text-right px-8">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, idx) => (
                        <tr
                            className="border dark:border-slate-400 odd:bg-slate-100 dark:odd:bg-slate-800 text-center"
                            key={`ratingResult${idx}`}>
                            <td className="text-left py-4 px-8">
                                {item.title}
                                {item.subtitle && <div className="text-12">{item.subtitle}</div>}
                                <div className="text-12">Answers: {item.answers}</div>
                            </td>
                            <td className="text-left text-14 py-4 px-8">
                                <div>
                                    <span className="text-12 text-neutral pr-12">{rating.cat1}:</span>
                                    <span className="text-10">avg</span> {item.avg1} <span className="text-10">sum</span> {item.sum1}
                                </div>
                                {rating.cat2 && (
                                    <div>
                                        <span className="text-12 text-neutral pr-12">{rating.cat2}:</span>
                                        <span className="text-10">avg</span> {item.avg2} <span className="text-10">sum</span> {item.sum2}
                                    </div>
                                )}
                                {rating.cat3 && (
                                    <div>
                                        <span className="text-12 text-neutral pr-12">{rating.cat3}:</span>
                                        <span className="text-10">avg</span> {item.avg3} <span className="text-10">sum</span> {item.sum3}
                                    </div>
                                )}
                                {rating.cat4 && (
                                    <div>
                                        <span className="text-12 text-neutral pr-12">{rating.cat4}:</span>
                                        <span className="text-10">avg</span> {item.avg4} <span className="text-10">sum</span> {item.sum4}
                                    </div>
                                )}
                            </td>
                            <td className="text-right font-bold py-4 px-8">{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Modal>
    );
};
