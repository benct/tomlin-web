import type { NextPage } from 'next';
import { FormEvent, useRef, useState } from 'react';
import { mdiPlayCircleOutline, mdiRestart, mdiStopCircleOutline } from '@mdi/js';

import { post } from '@/util/api';
import { Standalone } from '@/components/page/Standalone';
import { Box } from '@/components/page/Box';
import { Button } from '@/components/page/Button';

const GCPPage: NextPage = () => {
    const passRef = useRef<HTMLInputElement>(null);
    const [show, setShow] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [response, setResponse] = useState<string>();

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        if (passRef.current?.value === 'verystrongpassword') {
            setError(false);
            setShow(true);
        } else {
            setError(true);
            setShow(false);
        }
    };

    const handleAction = (action: String): void => {
        setResponse(undefined);
        setError(false);
        post(`/database/${action}`)
            .then((res) => setResponse(JSON.stringify(res)))
            .catch(() => setError(true));
    };

    return (
        <Standalone title="GCP">
            <div className="flex place-content-center place-items-center h-screen">
                {show ? (
                    <div>
                        <div className="flex items-center space-x-32 mb-16">
                            <Button text="Start" icon={mdiPlayCircleOutline} size={3} onClick={() => handleAction('start')} />
                            <Button text="Stop" icon={mdiStopCircleOutline} size={3} onClick={() => handleAction('stop')} />
                            <Button text="Restart" icon={mdiRestart} size={2} onClick={() => handleAction('restart')} />
                        </div>
                        {response && (
                            <div className="bg-slate-900 bg-opacity-50 fixed inset-0 flex place-content-center place-items-center z-20">
                                <pre className="text-left text-12 overflow-auto border max-h-[90%] max-w-[90%] p-8 bg-light dark:bg-dark">
                                    {response}
                                </pre>
                            </div>
                        )}
                        {error && <pre className="text-warn text-center">Unsuccessful request...</pre>}
                    </div>
                ) : (
                    <Box title="Login" className="max-w-max" border="border rounded-8">
                        <form onSubmit={handleSubmit} className="space-y-16">
                            <input type="password" ref={passRef} placeholder="******" aria-label="Password" className="input mx-auto" />
                            <input type="submit" value="Enter" aria-label="Enter" className="input mx-auto" />
                            {error && <p className="text-center text-warn">Incorrect password!</p>}
                        </form>
                    </Box>
                )}
            </div>
        </Standalone>
    );
};

export default GCPPage;
