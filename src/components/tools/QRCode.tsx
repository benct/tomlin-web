import { FormEvent, useState } from 'react';
import Image from 'next/image';

import { Box } from '@/components/page/Box';
import { Button } from '@/components/page/Button';
import { Modal } from '@/components/page/Modal';

export const QRCode = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const [size, setSize] = useState<number>(250);

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <Box title="QR Code Generator" border="border-b">
            <form className="flex flex-col sm:flex-row justify-center gap-16 p-16" onSubmit={handleSubmit}>
                <input
                    className="input w-full sm:w-256"
                    placeholder="URL, content, etc."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="grid grid-cols-2 gap-16">
                    <select className="input text-14 truncate" value={size} onChange={(e) => setSize(+e.target.value)} required>
                        <option value="100">100 px</option>
                        <option value="250">250 px</option>
                        <option value="500">500 px</option>
                    </select>
                    <Button type="submit" text="Create" title="Generate QR code" />
                </div>
            </form>
            {showModal && (
                <Modal title="QR Code" right={null} close={() => setShowModal(false)} className="flex justify-center">
                    <Image
                        src={`https://api.tomlin.no/qr?content=${content}&size=${size}`}
                        alt="Generated QR code"
                        width={size}
                        height={size}
                    />
                </Modal>
            )}
        </Box>
    );
};
