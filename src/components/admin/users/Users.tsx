import { useState } from 'react';
import { mdiAccountPlusOutline } from '@mdi/js';

import { formatDate } from '@/util/formatting';
import { useUsers } from '@/data/users';

import { User } from '@/interfaces';
import { Loading } from '@/components/page/Loading';
import { Button } from '@/components/page/Button';
import { Box } from '@/components/page/Box';
import { UserModal } from './UserModal';

export const Users = () => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>();

    const { users, loading } = useUsers();

    const edit = (user?: User): void => {
        setShowOverlay(true);
        setSelected(user?.email);
    };

    const closeModal = (): void => {
        setShowOverlay(false);
        setSelected(undefined);
    };

    const renderRow = (user: User, idx: number) => (
        <tr className="border dark:border-slate-400 odd:bg-slate-100 dark:odd:bg-slate-800" key={`user${idx}`}>
            <td className="py-8 px-16">
                <button className="text-secondary dark:text-secondary-dark font-bold" onClick={(): void => edit(user)}>
                    {user.name}
                    {user.enabled ? null : <span className="text-warn text-10 ml-8">(inactive)</span>}
                </button>
                <div className="text-12 truncate">{user.email}</div>
            </td>
            <td className="py-8 px-16 text-14 hidden sm:table-cell">
                {user.roles.map((role) => role.substring(role.indexOf('_') + 1)).join(', ')}
            </td>
            <td className="py-8 px-16 text-14 whitespace-nowrap">{formatDate(user.created)}</td>
            <td className="py-8 px-16 text-14 whitespace-nowrap">{user.lastSeen ? formatDate(user.lastSeen) : 'Never'}</td>
        </tr>
    );

    return (
        <Box title="Users" className="min-h">
            <Loading isLoading={loading} text="Loading users...">
                {users.length ? (
                    <table className="table-auto border-collapse w-full">
                        <thead className="text-left">
                            <tr>
                                <th className="px-16">
                                    <Button text="New User" icon={mdiAccountPlusOutline} onClick={(): void => edit()} />
                                </th>
                                <th className="px-16 hidden sm:table-cell">Roles</th>
                                <th className="px-16">Created</th>
                                <th className="px-16">Last Seen</th>
                            </tr>
                        </thead>
                        <tbody>{users.sort((a, b) => (a.created < b.created ? -1 : 1)).map(renderRow)}</tbody>
                    </table>
                ) : (
                    <div className="text-center">No users found...</div>
                )}
            </Loading>
            {showOverlay ? <UserModal user={users.find((user) => user.email === selected)} close={closeModal} /> : null}
        </Box>
    );
};
