import React from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

interface LoadingProps {
    isLoading: boolean;
    text?: string;
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, text, className, children }): React.ReactElement =>
    isLoading ? (
        <div className={`text color-bg ${className ?? ''}`}>
            <Icon path={mdiLoading} size={1} title="Loading" spin={1} className="text-icon" />
            <span className="valign-middle">{text ?? 'Loading...'}</span>
        </div>
    ) : (
        <>{children}</>
    );

export default Loading;
