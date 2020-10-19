import { FC, memo, MouseEvent, ReactNode, useEffect } from 'react';

interface ModalProps {
    children: ReactNode;
    close: () => void;
    className?: string;
}

interface ModalElementProps {
    className?: string;
}

const ModalWrapper: FC<ModalProps> = ({ close, className, children }) => {
    useEffect(() => {
        document.body.classList.add('no-scroll');

        return (): void => document.body.classList.remove('no-scroll');
    }, []);

    const handleOutsideClick = (event: MouseEvent): void => {
        if (event.target === event.currentTarget) {
            close();
        }
    };

    return (
        <div className="overlay" onClick={handleOutsideClick} role="dialog">
            <div className={`wrapper overlay-modal shadow ${className ?? ''}`}>{children}</div>
        </div>
    );
};

export const ModalHeader: FC<ModalElementProps> = ({ children, className }) => (
    <div className={`overlay-modal-header color-primary strong ${className ?? ''}`}>{children}</div>
);

export const ModalContent: FC = ({ children }) => <div className="overlay-modal-content">{children}</div>;

export const ModalFooter: FC = ({ children }) => <div className="overlay-modal-footer">{children}</div>;

export const Modal = memo(ModalWrapper);
