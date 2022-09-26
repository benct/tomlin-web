import { FC, ReactElement, SyntheticEvent, useRef } from 'react';
import { Icon } from '@mdi/react';
import { mdiDelete } from '@mdi/js';

import { formatDate } from '../../util/formatting';
import { useFinn } from '../../data/base';

import { Loading } from '../page/Loading';
import { FinnEntry } from '../../interfaces';

export const Finn: FC = () => {
    const idInput = useRef<HTMLInputElement>(null);

    const { data, loading, add, remove } = useFinn();

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();

        if (idInput.current && idInput.current.value.length && Number.isFinite(+idInput.current.value)) {
            add(+idInput.current.value);
        }
    };

    const handleDelete = (id: string): void => {
        if (confirm('Are you sure you want to delete this entry?')) {
            remove(+id);
        }
    };

    const renderEntry = (id: string): ReactElement => (
        <table className="table-striped mbm" key={`finn${id}`}>
            <thead>
                <tr className="text-smaller">
                    <th>
                        <a href={`https://finn.no/${id}`} rel="noopener noreferrer nofollow" target="_blank">
                            {id}
                        </a>
                    </th>
                    <th className="text-right">
                        <button className="button-icon" onClick={() => handleDelete(id)}>
                            <Icon path={mdiDelete} size="24px" title="Delete" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.[id].map(
                    (entry: FinnEntry): ReactElement => (
                        <tr key={`finn${id}${entry.timestamp}`}>
                            <td className="no-wrap">{formatDate(entry.timestamp, 'MMM d - HH:mm')}</td>
                            <td className="no-wrap">{entry.price}</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );

    return (
        <div className="wrapper min-height">
            <div className="text-small text-center mbl pbm">
                <span>FINNkode&nbsp;</span>
                <input type="number" className="input input-small mrm" ref={idInput} />
                <button className="input input-small" onClick={handleSubmit}>
                    Track
                </button>
            </div>
            <Loading isLoading={loading} text="Loading FINN data...">
                {data && Object.keys(data).length ? (
                    Object.keys(data)
                        .sort((a, b) => (b > a ? 1 : -1))
                        .map(renderEntry)
                ) : (
                    <div className="text">No data found...</div>
                )}
            </Loading>
        </div>
    );
};
