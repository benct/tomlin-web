import { useRef, useState } from 'react';
import { mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { useRoles, useUserActions } from '@/data/users';

import { User } from '@/interfaces';
import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';
import { Loading } from '@/components/page/Loading';

interface UserModalProps {
    close: () => void;
    user?: User;
}

export const UserModal = ({ user, close }: UserModalProps) => {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const enabled = useRef<HTMLInputElement>(null);

    const [invalid, setInvalid] = useState(false);

    const { roles, loading } = useRoles();
    const { saveUser, deleteUser, addRole, deleteRole } = useUserActions();

    const save = (): void => {
        if ((user?.email || email.current?.value?.length) && name.current?.value?.length) {
            saveUser(
                user?.email ?? email.current?.value ?? 'TmpUserName',
                name.current.value,
                password.current?.value ?? null,
                enabled.current?.checked ?? true,
            );
            close();
        } else {
            setInvalid(true);
        }
    };

    const remove = (): void => {
        if (user?.email) {
            deleteUser(user.email);
            close();
        }
    };

    const toggleRole = (role: string) => {
        if (!user) return;

        if (user.roles.includes(role)) {
            deleteRole(user.email, role);
        } else {
            addRole(user.email, role);
        }
    };

    return (
        <Modal
            title={user ? user.email : 'New User'}
            close={close}
            left={user ? <Button text="Delete" icon={mdiDeleteOutline} onClick={remove} /> : null}
            right={<Button text="Save" icon={mdiContentSaveOutline} onClick={save} />}
            className="space-y-16">
            {!user && <input className="input mx-auto" type="text" maxLength={50} placeholder="Email" autoComplete="off" ref={email} />}
            <input
                className="input mx-auto"
                type="text"
                maxLength={50}
                placeholder="Name"
                autoComplete="off"
                ref={name}
                defaultValue={user?.name}
            />
            <input className="input mx-auto" type="password" maxLength={50} placeholder="Password" autoComplete="off" ref={password} />
            {user ? (
                <>
                    <div className="flex justify-center gap-8 py-16">
                        <input id="enabled" type="checkbox" ref={enabled} defaultChecked={user.enabled} />
                        <label htmlFor="enabled">Enabled</label>
                    </div>
                    <Loading isLoading={loading}>
                        <h4 className="text-secondary dark:text-secondary-dark text-center">Roles</h4>
                        <div className="flex flex-wrap justify-center items-center gap-8 pb-16">
                            {roles.map((role) => (
                                <Button
                                    key={role}
                                    text={role.substring(role.indexOf('_') + 1)}
                                    onClick={() => toggleRole(role)}
                                    active={user.roles.includes(role)}
                                />
                            ))}
                        </div>
                    </Loading>
                </>
            ) : null}
            {invalid && <div className="text-14 text-warn text-center">Please fill the required fields!</div>}
        </Modal>
    );
};
