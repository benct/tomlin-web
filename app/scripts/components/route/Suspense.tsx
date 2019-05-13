import React from 'react';

interface SuspenseProps {
    children: React.ReactNode;
}

const Suspense: React.FC<SuspenseProps> = ({ children }): React.ReactElement => (
    <React.Suspense fallback={<div className="wrapper text-center">Loading...</div>}>{children}</React.Suspense>
);

export default Suspense;
