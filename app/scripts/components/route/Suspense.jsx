import React from 'react';
import PropTypes from 'prop-types';

export default function Suspense({ children }) {
    return <React.Suspense fallback={<div className="wrapper text-center">Loading...</div>}>{children}</React.Suspense>;
}

Suspense.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};
