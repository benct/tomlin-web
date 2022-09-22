import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '@mdi/react';
import { mdiCloseCircleOutline, mdiContentSaveOutline, mdiDeleteOutline } from '@mdi/js';

import { User } from '../../interfaces';
import { deleteUser, saveUser } from '../../actions/admin';

import { Modal, ModalContent, ModalFooter, ModalHeader } from '../page/Modal';

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
    const dispatch = useDispatch();

    const save = (): void => {
        if (email.current && email.current.value.length && name.current && name.current.value.length) {
            dispatch(saveUser(email.current.value, name.current.value, password.current?.value ?? null, enabled.current?.checked ?? true));
            close();
        } else {
            setInvalid(true);
        }
    };

    const remove = (): void => {
        if (user?.email) {
            dispatch(deleteUser(user.email));
            close();
        }
    };

    return (
        <Modal close={close}>
            <ModalHeader>{`${user ? 'Edit' : 'New'} User`}</ModalHeader>
            <ModalContent>
                {user ? (
                    <div className="text-center strong mvm">{user.email}</div>
                ) : (
                    <input className="input full-width" type="text" maxLength={50} placeholder="Email" autoComplete="off" ref={email} />
                )}
                <input
                    className="input full-width"
                    type="text"
                    maxLength={50}
                    placeholder="Name"
                    autoComplete="off"
                    required
                    ref={name}
                    defaultValue={user?.name}
                />
                <input
                    className="input full-width"
                    type="password"
                    maxLength={50}
                    placeholder="Password"
                    autoComplete="off"
                    ref={password}
                />
                {user ? (
                    <div className="switch mal">
                        <input id="enabled" className="switch-input" type="checkbox" ref={enabled} defaultChecked={user.enabled} />
                        <label htmlFor="enabled" className="switch-label">
                            Enabled
                        </label>
                    </div>
                ) : null}
                {invalid && <div className="text text-small error pts">Please fill the required fields!</div>}
            </ModalContent>
            <ModalFooter>
                {user ? (
                    <button className="button-icon mrl" onClick={remove}>
                        <Icon path={mdiDeleteOutline} size="28px" title="Delete" />
                    </button>
                ) : null}
                <button className="button-icon" onClick={save}>
                    <Icon path={mdiContentSaveOutline} size="28px" title="Save" />
                </button>
                <button className="button-icon float-right" onClick={close}>
                    <Icon path={mdiCloseCircleOutline} size="28px" title="Cancel" />
                </button>
            </ModalFooter>
        </Modal>
    );
};
