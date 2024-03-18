import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';

import { Standalone } from '@/components/page/Standalone';
import { Box } from '@/components/page/Box';
import { Rating } from '@/components/rating/Rating';

const storageKey = 'rating-user-id';

const RatingPage: NextPage = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState<string | null>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const storedUser = window.localStorage.getItem(storageKey);
        if (storedUser) {
            setUser(storedUser);
        }
    }, [setUser]);

    const handleSubmit = () => {
        if (userRef.current?.value && userRef.current.value.length >= 3 && /^[a-zA-Z]+$/.test(userRef.current.value)) {
            setError(false);
            window.localStorage.setItem(storageKey, userRef.current.value.toLowerCase());
            setUser(userRef.current.value.toLowerCase());
        } else {
            setError(true);
        }
    };

    return (
        <Standalone title="Rating">
            {user ? (
                <Rating user={user} />
            ) : (
                <Box title="Enter username" className="space-y-16 min-h">
                    <input type="text" ref={userRef} aria-label="Username" className="input mx-auto" maxLength={16} />
                    <input type="submit" value="Submit" aria-label="Submit" className="input mx-auto" onClick={handleSubmit} />
                    {error && <p className="text-center text-warn">Minimum 3 characters, A-Z!</p>}
                </Box>
            )}
        </Standalone>
    );
};

export default RatingPage;
