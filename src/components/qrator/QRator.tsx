import { useRef } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/data/context';
import { useQRator } from '@/data/qrator';

import { Box } from '@/components/page/Box';
import { Button } from '@/components/page/Button';
import { Loading } from '@/components/page/Loading';

export const QRator = () => {
    const fileInput = useRef<HTMLInputElement>(null);
    const { hasPermission } = useAppContext();
    const { data, loading, uploading, upload } = useQRator();

    const handleUpload = (): void => {
        const files = fileInput.current?.files ?? [];
        if (!files.length) {
            return;
        }

        const formData = new FormData();
        for (const key in files) {
            if (Object.prototype.hasOwnProperty.call(files, key) && files[key] instanceof File) {
                formData.append('files', files[key]);
            }
        }
        upload(formData);
    };

    return (
        <>
            <Box className="flex flex-wrap justify-center items-center gap-16">
                <Loading isLoading={loading}>
                    {data?.map((item) => (
                        <Link href={`/qrator/${item.id}`} key={`qrItem${item.id}`} className="border p-8 w-128 h-128">
                            <img src={`https://storage.googleapis.com/tomlin-cdn/qrator/art/${item.id}.${item.ext}`} alt={item.title} />
                        </Link>
                    ))}
                </Loading>
            </Box>
            {hasPermission('qrator') && (
                <Box className="space-y-16 pb-32">
                    <input
                        className="input mx-auto"
                        type="file"
                        name="files[]"
                        id="file"
                        aria-label="Upload files"
                        ref={fileInput}
                        disabled={uploading}
                        multiple
                    />
                    <Button text={uploading ? 'Uploading...' : 'Upload'} onClick={handleUpload} disabled={uploading} className="mx-auto" />
                </Box>
            )}
        </>
    );
};
