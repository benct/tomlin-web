import React from 'react';

import Links from './links.jsx';
import Notes from './notes.jsx';

export default function Finn() {
    return (
        <>
            <Links file="finn" />
            <hr />
            <Notes file="finn" />
        </>
    );
}
