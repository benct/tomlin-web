import { FC, ReactElement, useRef } from 'react';
import { mdiDelete } from '@mdi/js';

import { formatDate } from '@/util/formatting';
import { useFinn } from '@/data/base';

import { FinnEntry } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';

export const Finn: FC = () => {
    const idInput = useRef<HTMLInputElement>(null);

    const { data, loading, add, remove } = useFinn();

    const handleSubmit = (): void => {
        if (idInput.current?.value?.length && Number.isFinite(+idInput.current.value)) {
            add(+idInput.current.value);
        }
    };

    const handleDelete = (id: string): void => {
        if (confirm('Are you sure you want to delete this entry?')) {
            remove(+id);
        }
    };

    const renderEntry = (id: string): ReactElement => (
        <table className="table-auto border-collapse mb-16 mx-auto" key={`finn${id}`}>
            <thead>
                <tr>
                    <th>
                        <a href={`https://finn.no/${id}`} rel="noreferrer nofollow" target="_blank">
                            {id}
                        </a>
                    </th>
                    <th className="text-right">
                        <Button text="Delete" title="Delete" icon={mdiDelete} onClick={() => handleDelete(id)} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.[id].map(
                    (entry: FinnEntry): ReactElement => (
                        <tr
                            className="border dark:border-slate-400 odd:bg-slate-100 dark:odd:bg-slate-800"
                            key={`finn${id}${entry.timestamp}`}>
                            <td className="py-8 px-16">{formatDate(entry.timestamp, 'MMM d - HH:mm')}</td>
                            <td className="py-8 px-16">{entry.price}</td>
                        </tr>
                    ),
                )}
            </tbody>
        </table>
    );

    return (
        <Box className="min-h">
            <div className="flex justify-center gap-16 items-center mb-32">
                <input type="number" placeholder="FINN-kode" className="input text-12" ref={idInput} />
                <Button text="Track" onClick={handleSubmit} />
            </div>
            <Loading isLoading={loading} text="Loading FINN data...">
                {data && Object.keys(data).length ? (
                    Object.keys(data)
                        .sort((a, b) => (b > a ? 1 : -1))
                        .map(renderEntry)
                ) : (
                    <div className="text-center">No data found...</div>
                )}
            </Loading>
        </Box>
    );
};
