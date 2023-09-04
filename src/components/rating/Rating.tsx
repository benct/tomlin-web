import { FormEvent, useEffect, useState } from 'react';

import { useActiveRatings, useRatingActions } from '@/data/ratings';

import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';
import { RatingItem } from '@/interfaces';

type RatingProps = {
    user: string;
};

export const Rating = ({ user }: RatingProps) => {
    const { data, loading } = useActiveRatings();
    const { submitScore } = useRatingActions();

    const [step, setStep] = useState<number>();

    const [cat1, setCat1] = useState<number>();
    const [cat2, setCat2] = useState<number>();
    const [cat3, setCat3] = useState<number>();
    const [cat4, setCat4] = useState<number>();

    useEffect(() => {
        if (step != data?.step) {
            if (step) {
                alert('New item to rate!');
                setCat1(undefined);
                setCat2(undefined);
                setCat3(undefined);
                setCat4(undefined);
            }
            setStep(data?.step);
        }
    }, [step, data?.step]);

    if (!data) {
        return (
            <Box title="Rating" className="text-center">
                No active test running.
            </Box>
        );
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        submitScore({ id: data.item?.id, user, cat1, cat2, cat3, cat4 });
    };

    const renderSelect = (title: string, value: number | undefined, setValue: (val: number) => void) => (
        <div className="flex justify-between items-center gap-12 max-w-[256px] mx-auto">
            <span className="truncate">{title}</span>
            <select name={title} className="input pr-16" required value={value ?? ''} onChange={(e) => setValue(+e.target.value)}>
                <option value="">Select..</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
    );

    const renderForm = (item: RatingItem) => (
        <form onSubmit={handleSubmit}>
            <h3 className="flex justify-center items-center gap-12 text-secondary dark:text-secondary-dark text-16 uppercase">
                {item.title}
            </h3>
            {item.subtitle && <span className="text-12">{item.subtitle}</span>}
            <div className="space-y-32 my-64">
                {renderSelect(data.cat1, cat1, setCat1)}
                {data.cat2 && renderSelect(data.cat2, cat2, setCat2)}
                {data.cat3 && renderSelect(data.cat3, cat3, setCat3)}
                {data.cat4 && renderSelect(data.cat4, cat4, setCat4)}
            </div>
            <Button text="Submit" type="submit" className="px-16 py-12 mx-auto" />
        </form>
    );

    const userString = `Username: ${user.toUpperCase()}`;

    return (
        <Box title={data.title} className="text-center space-y-32 pb-32">
            <Loading isLoading={loading} text={userString}>
                <div className="italic">{userString}</div>
            </Loading>

            {data.step === 0 ? <div>Waiting for test to begin...</div> : data.item ? renderForm(data.item) : <div>DONE!</div>}
        </Box>
    );
};
