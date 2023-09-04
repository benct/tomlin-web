import { PropsWithChildren } from 'react';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';

interface LoadingProps {
    isLoading: boolean;
    text?: string;
    className?: string;
}

export const Loading = ({ isLoading, text, className, children }: PropsWithChildren<LoadingProps>) =>
    isLoading ? (
        <div className={`flex justify-center items-center gap-x-16 py-16 ${className ?? ''}`}>
            <Icon path={mdiLoading} size={1} title="Loading" spin={1} id="loading-icon" />
            <span className="italic">{text ?? 'Loading...'}</span>
        </div>
    ) : (
        <>{children}</>
    );
