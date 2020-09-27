import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

import { DefaultState, FinnEntry, FinnState } from '../../interfaces';

import { formatDate } from '../../util/formatting';
import { deleteFinnId, getFinnData, storeFinnId } from '../../actions/base';

import Loading from '../page/Loading';

const Finn: React.FC = () => {
    const idInput = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const { data, loading } = useSelector<DefaultState, { data: FinnState } & Pick<DefaultState, 'loading'>>((state) => ({
        data: state.finn,
        loading: state.loading,
    }));

    useEffect(() => {
        if (!data.length) {
            dispatch(getFinnData());
        }
    }, []);

    const handleSubmit = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (idInput.current && idInput.current.value.length && Number.isFinite(+idInput.current.value)) {
            dispatch(storeFinnId(+idInput.current.value));
        }
    };

    const handleDelete = (id: string): void => {
        if (confirm('Are you sure you want to delete this entry?')) {
            dispatch(deleteFinnId(+id));
        }
    };

    const renderEntry = (id: string): React.ReactElement => (
        <table className="table-striped text-small mbm" style={{ width: '100%' }} key={`finn${id}`}>
            <thead>
                <tr className="text-smaller">
                    <th>
                        <a href={`https://finn.no/${id}`} rel="noopener noreferrer nofollow" target="_blank">
                            {id}
                        </a>
                    </th>
                    <th className="text-right">
                        <button className="button-icon pan" onClick={() => handleDelete(id)}>
                            <Icon path={mdiDelete} size="24px" title="Delete" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data[id].map(
                    (entry: FinnEntry): React.ReactElement => (
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
            <div className="text-center mbl">
                <input type="number" className="input input-small mrm" ref={idInput} />
                <button className="input input-small" onClick={handleSubmit}>
                    Track
                </button>
            </div>
            <Loading isLoading={loading} text="Loading FINN data...">
                {Object.keys(data).length ? (
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

export default Finn;
