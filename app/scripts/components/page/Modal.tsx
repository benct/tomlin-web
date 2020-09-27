import React, { useEffect } from 'react';

interface ModalProps {
    children: React.ReactNode;
    close: () => void;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ close, className, children }) => {
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
            <div className={`wrapper overlay-modal shadow ${className}`}>{children}</div>
        </div>
    );
};

export default React.memo(Modal);
