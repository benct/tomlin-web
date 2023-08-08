import { FC, useRef, useState } from 'react';
import { mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';
import { useRatingActions } from '@/data/ratings';

import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';
import { Rating } from '@/interfaces';

interface RatingModalProps {
    close: () => void;
    rating?: Rating;
}

export const RatingModal: FC<RatingModalProps> = ({ rating, close }) => {
    const title = useRef<HTMLInputElement>(null);
    const cat1 = useRef<HTMLInputElement>(null);
    const cat2 = useRef<HTMLInputElement>(null);
    const cat3 = useRef<HTMLInputElement>(null);
    const cat4 = useRef<HTMLInputElement>(null);
    const active = useRef<HTMLInputElement>(null);
    const blind = useRef<HTMLInputElement>(null);

    const [invalid, setInvalid] = useState(false);

    const { saveRating, deleteRating } = useRatingActions();

    const save = (): void => {
        if (title.current?.value?.length && cat1.current?.value?.length) {
            saveRating({
                id: rating?.id,
                title: title.current?.value,
                cat1: cat1.current?.value,
                cat2: cat2.current?.value ?? null,
                cat3: cat3.current?.value ?? null,
                cat4: cat4.current?.value ?? null,
                active: active.current?.checked ?? true,
                blind: blind.current?.checked ?? false,
            });
            close();
        } else {
            setInvalid(true);
        }
    };

    const remove = (): void => {
        if (rating?.id) {
            deleteRating(rating.id);
            close();
        }
    };

    return (
        <Modal
            title={`${rating ? 'Edit' : 'New'} Rating`}
            close={close}
            left={rating ? <Button text="Delete" icon={mdiDeleteOutline} onClick={remove} /> : null}
            right={<Button text="Save" icon={mdiContentSaveOutline} onClick={save} />}
            className="space-y-16">
            <input
                className="input mx-auto"
                type="text"
                maxLength={64}
                placeholder="Title"
                autoComplete="off"
                ref={title}
                defaultValue={rating?.title}
            />
            <input
                className="input mx-auto"
                type="text"
                maxLength={48}
                placeholder="Category 1"
                autoComplete="off"
                ref={cat1}
                defaultValue={rating?.cat1}
            />
            <input
                className="input mx-auto"
                type="text"
                maxLength={48}
                placeholder="Category 2"
                autoComplete="off"
                ref={cat2}
                defaultValue={rating?.cat2}
            />
            <input
                className="input mx-auto"
                type="text"
                maxLength={48}
                placeholder="Category 3"
                autoComplete="off"
                ref={cat3}
                defaultValue={rating?.cat3}
            />
            <input
                className="input mx-auto"
                type="text"
                maxLength={48}
                placeholder="Category 4"
                autoComplete="off"
                ref={cat4}
                defaultValue={rating?.cat4}
            />
            <div className="flex justify-center gap-8">
                <input id="active" type="checkbox" ref={active} defaultChecked={rating?.active ?? true} />
                <label htmlFor="active">Active</label>
            </div>
            <div className="flex justify-center gap-8">
                <input id="blind" type="checkbox" ref={blind} defaultChecked={rating?.blind} />
                <label htmlFor="blind">Blind</label>
            </div>
            {invalid && <div className="text-14 text-warn text-center">Please fill the required fields!</div>}
        </Modal>
    );
};
