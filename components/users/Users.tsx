import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiAccountPlusOutline } from '@mdi/js';

import { DefaultState, User } from '../../interfaces';
import { formatDate } from '../../util/formatting';
import { getUsers } from '../../actions/admin';

import { UserModal } from './UserModal';
import { Loading } from '../page/Loading';

export const Users: FC = () => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [selected, setSelected] = useState<User>();

    const dispatch = useDispatch();
    const loading = useSelector<DefaultState, DefaultState['loading']>((state) => state.loading);
    const users = useSelector<DefaultState, User[]>((state) => state.admin.users);

    useEffect(() => {
        if (!users.length) {
            dispatch(getUsers());
        }
    }, [dispatch, users]);

    const edit = (user?: User): void => {
        setShowOverlay(true);
        setSelected(user);
    };

    const closeModal = (): void => {
        setShowOverlay(false);
        setSelected(undefined);
    };

    const renderRow = (user: User, idx: number) => (
        <tr key={`user${idx}`}>
            <td>
                <button className="button-blank text-left strong" onClick={(): void => edit(user)}>
                    {user.name}
                </button>
                <div>{user.email}</div>
            </td>
            <td>{user.roles.join(', ')}</td>
            <td>{formatDate(user.created)}</td>
            <td>{user.lastSeen ? formatDate(user.lastSeen) : 'Never'}</td>
        </tr>
    );

    return (
        <div className="wrapper min-height ptm">
            <Loading isLoading={loading} text="Loading users...">
                {users.length ? (
                    <table className="table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <button className="button-icon" onClick={(): void => edit()}>
                                        <Icon path={mdiAccountPlusOutline} size="24px" title="New User" />
                                    </button>
                                </th>
                                <th>Roles</th>
                                <th>Created</th>
                                <th>Last Seen</th>
                            </tr>
                        </thead>
                        <tbody>{users.map(renderRow)}</tbody>
                    </table>
                ) : (
                    <div className="text">No users found...</div>
                )}
            </Loading>
            {showOverlay ? <UserModal user={selected} close={closeModal} /> : null}
        </div>
    );
};
