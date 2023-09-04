import { useState } from 'react';
import Link from 'next/link';

import { formatThousands } from '@/util/formatting';
import { useAppContext } from '@/data/context';
import { useQRatorItem } from '@/data/qrator';

import { Loading } from '@/components/page/Loading';
import { Box } from '@/components/page/Box';
import { Button } from '@/components/page/Button';

export const QRatorItem = ({ id }: { id: number }) => {
    const { hasPermission } = useAppContext();
    const { data, loading, saveItem, deleteItem } = useQRatorItem(id);

    const [editing, setEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(data?.title ?? '');
    const [author, setAuthor] = useState<string>(data?.author ?? '');
    const [value, setValue] = useState<string>(data?.value ?? '');
    const [description, setDescription] = useState<string>(data?.description ?? '');

    const handleSave = () => {
        saveItem(id, { title, author, value, description });
        setEditing(false);
    };

    return (
        <Box className="grid sm:grid-cols-2 items-center gap-16 min-h">
            <Loading isLoading={loading}>
                {data ? (
                    <>
                        <div className="sm:col-span-2 mx-auto">
                            <img src={`https://storage.googleapis.com/tomlin-cdn/qrator/art/${data.id}.${data.ext}`} alt={data.title} />
                        </div>
                        <div className="grid grid-cols-auto-1fr gap-x-16 gap-y-8 items-center">
                            <span className="text-neutral dark:text-neutral">Title:</span>
                            {editing ? (
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
                            ) : (
                                <span>{data.title ?? 'No title'}</span>
                            )}
                            <span className="text-neutral dark:text-neutral">Author:</span>
                            {editing ? (
                                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="input" />
                            ) : (
                                <span>{data.author ?? 'Unknown'}</span>
                            )}
                            <span className="text-neutral dark:text-neutral">Value:</span>
                            {editing ? (
                                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="input" />
                            ) : (
                                <span>{data.value ? `${formatThousands(data.value)},-` : 'Unknown'}</span>
                            )}
                            <span className="text-neutral dark:text-neutral">Description:</span>
                            {editing ? (
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="input" />
                            ) : (
                                <span>{data.description ?? '-'}</span>
                            )}
                            <div className="col-span-2 flex items-center justify-center sm:justify-start gap-16 py-16">
                                {editing ? (
                                    <>
                                        <Button text="Cancel" onClick={() => setEditing(false)} />
                                        <Button text="Save" onClick={() => handleSave()} />
                                    </>
                                ) : (
                                    <>
                                        <Link href="/qrator" className="button-text" title="Back">
                                            Back
                                        </Link>
                                        {hasPermission('qrator') && (
                                            <>
                                                <Button text="Edit" onClick={() => setEditing(true)} />
                                                <Button text="Delete" onClick={() => deleteItem(id)} />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="mx-auto sm:ml-auto">
                            <img src={`https://storage.googleapis.com/tomlin-cdn/qrator/qr/${data.id}.png`} alt="QR code" />
                        </div>
                    </>
                ) : (
                    <div>Could not load data...</div>
                )}
            </Loading>
        </Box>
    );
};
