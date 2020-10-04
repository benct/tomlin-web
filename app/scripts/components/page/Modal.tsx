import React, { memo, useEffect } from 'react';

interface ModalProps {
    children: React.ReactNode;
    close: () => void;
    className?: string;
}

interface ModalElementProps {
    className?: string;
}

const ModalWrapper: React.FC<ModalProps> = ({ close, className, children }) => {
    useEffect(() => {
        document.body.classList.add('no-scroll');

        return (): void => document.body.classList.remove('no-scroll');
    }, []);

    const handleOutsideClick = (event: React.MouseEvent): void => {
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

export const ModalHeader: React.FC<ModalElementProps> = ({ children, className }) => (
    <div className={`overlay-modal-header color-primary strong ${className ?? ''}`}>{children}</div>
);

export const ModalContent: React.FC = ({ children }) => <div className="overlay-modal-content">{children}</div>;

export const ModalFooter: React.FC = ({ children }) => <div className="overlay-modal-footer">{children}</div>;

export const Modal = memo(ModalWrapper);
