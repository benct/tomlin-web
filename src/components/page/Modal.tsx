import { MouseEvent, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Button } from '@/components/page/Button';
import { mdiClose } from '@mdi/js';

interface ModalProps {
    title: string;
    right?: ReactNode; // footer right
    center?: ReactNode; // footer center
    left?: ReactNode; // footer left
    close: () => void;
    className?: string;
}

export const Modal = ({ title, left, center, right, close, className = '', children }: PropsWithChildren<ModalProps>) => {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return (): void => document.body.classList.remove('overflow-hidden');
    }, []);

    const handleOutsideClick = (event: MouseEvent): void => {
        if (event.target === event.currentTarget) {
            close();
        }
    };

    return (
        <div
            className="bg-slate-900 bg-opacity-50 fixed inset-0 flex sm:place-content-center sm:place-items-center items-end z-20"
            onClick={handleOutsideClick}>
            <div
                className="bg-light dark:bg-dark mx-0 sm:mx-16 flex flex-col overflow-hidden outline-none transition pt-16 sm:pt-32 pb-16 sm:pb-32 rounded-t-8 sm:rounded-b-8 w-full max-w-narrow max-h-[80%]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-header"
                tabIndex={-1}>
                <div className="flex justify-between items-center px-16 sm:px-32 pb-16">
                    <h3 id="modal-header" className="text-secondary dark:text-secondary-dark font-bold">
                        {title}
                    </h3>
                    <Button text="Close" icon={mdiClose} onClick={close} />
                </div>
                <div className={`overflow-y-auto overflow-x-hidden px-16 sm:px-32 py-4 relative ${className}`}>{children}</div>
                <div className="flex gap-24 px-16 sm:px-32 pt-16 justify-between items-center">
                    <div className="flex gap-24">{left}</div>
                    <div className="flex gap-24">{center}</div>
                    <div className="flex gap-24">{right}</div>
                </div>
            </div>
        </div>
    );
};
