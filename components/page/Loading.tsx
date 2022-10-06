import { FC, ReactNode } from 'react';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';

interface LoadingProps {
    isLoading: boolean;
    text?: string;
    className?: string;
    children?: ReactNode;
}

export const Loading: FC<LoadingProps> = ({ isLoading, text, className, children }) =>
    isLoading ? (
        <div className={`text-primary dark:text-primary-dark flex justify-center gap-x-16 ${className ?? ''}`}>
            <Icon path={mdiLoading} size={1} title="Loading" spin={1} id="loading-icon" />
            <span className="italic">{text ?? 'Loading...'}</span>
        </div>
    ) : (
        <>{children}</>
    );
