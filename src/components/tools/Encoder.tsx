import { FC, FormEvent, useState } from 'react';

import { Box } from '@/components/page/Box';
import { Button } from '@/components/page/Button';
import { Modal } from '@/components/page/Modal';

export const Encoder: FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [type, setType] = useState<string>('base64encode');

    const encodeDecodeContent = (): string => {
        let result = '';
        if (type === 'base64encode') result = btoa(content);
        if (type === 'base64decode') result = atob(content);
        if (type === 'urlencode') result = encodeURIComponent(content);
        if (type === 'urldecode') result = decodeURIComponent(content);
        return result;
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setShowModal(true);
        setResult(encodeDecodeContent());
    };

    return (
        <Box title="Encoder / Decoder">
            <form className="flex flex-col sm:flex-row justify-center gap-16 p-16" onSubmit={handleSubmit}>
                <textarea
                    className="input w-full sm:w-256 h-96"
                    placeholder="URL, content, etc."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-16">
                    <select className="input text-14 truncate" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="base64encode">Base64-encode</option>
                        <option value="base64decode">Base64-decode</option>
                        <option value="urlencode">URL-encode</option>
                        <option value="urldecode">URL-decode</option>
                    </select>
                    <Button type="submit" text="Execute" title="Encode/decode content" className="w-full" />
                </div>
            </form>
            {showModal && (
                <Modal title="Result" right={null} close={() => setShowModal(false)} className="flex justify-center">
                    <textarea className="input w-full" rows={5} value={result} onChange={() => {}} readOnly />
                </Modal>
            )}
        </Box>
    );
};
