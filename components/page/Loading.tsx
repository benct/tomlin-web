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
        <div className={`text color-bg ${className ?? ''}`}>
            <Icon path={mdiLoading} size={1} title="Loading" spin={1} className="text-icon" id="loadingIcon" />
            <span className="valign-middle">{text ?? 'Loading...'}</span>
        </div>
    ) : (
        <>{children}</>
    );
