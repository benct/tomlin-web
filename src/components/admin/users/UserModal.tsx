import { FC, useRef, useState } from 'react';
import { mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { useUserActions } from '@/data/users';

import { User } from '@/interfaces';
import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';

interface UserModalProps {
    close: () => void;
    user?: User;
}

export const UserModal: FC<UserModalProps> = ({ user, close }) => {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const enabled = useRef<HTMLInputElement>(null);

    const [invalid, setInvalid] = useState(false);

    const { saveUser, deleteUser } = useUserActions();

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

    return (
        <Modal
            title={`${user ? 'Edit' : 'New'} User`}
            close={close}
            left={user ? <Button text="Delete" icon={mdiDeleteOutline} onClick={remove} /> : null}
            right={<Button text="Save" icon={mdiContentSaveOutline} onClick={save} />}
            className="space-y-16">
            {user ? (
                <div className="text-center font-bold">{user.email}</div>
            ) : (
                <input className="input mx-auto" type="text" maxLength={50} placeholder="Email" autoComplete="off" ref={email} />
            )}
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
                <div className="flex justify-center gap-8">
                    <input id="enabled" type="checkbox" ref={enabled} defaultChecked={user.enabled} />
                    <label htmlFor="enabled">Enabled</label>
                </div>
            ) : null}
            {invalid && <div className="text-14 text-warn text-center">Please fill the required fields!</div>}
        </Modal>
    );
};
