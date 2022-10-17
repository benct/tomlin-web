import { FC, ReactElement } from 'react';
import Image from 'next/image';
import { Icon } from '@mdi/react';
import { mdiDeleteOutline, mdiFileQuestion, mdiFolderOutline, mdiRenameBox } from '@mdi/js';

import { FileItem } from '@/interfaces';
import { Button } from '@/components/page/Button';

interface FileListProps {
    content: FileItem[];
    focused: number | null;
    handleClick: (item: FileItem) => void;
    handleRename: (item: FileItem) => void;
    handleDelete: (item: FileItem) => void;
}

export const FileList: FC<FileListProps> = ({ content, focused, handleClick, handleRename, handleDelete }) => {
    const renderItem = (item: FileItem, i: number): ReactElement => (
        <tr key={i}>
            <td className="text-secondary dark:text-secondary-dark">
                {item.isDir ? (
                    <Icon path={mdiFolderOutline} title="Directory" size={1} />
                ) : item.ext ? (
                    <Image src={`/images/file/${item.ext}.png`} alt={item.ext} width={24} height={24} />
                ) : (
                    <Icon path={mdiFileQuestion} title="Unknown" size={1} />
                )}
            </td>
            <td>
                <button
                    onClick={(): void => handleClick(item)}
                    className={i === focused ? 'text-secondary dark:text-secondary-dark' : undefined}>
                    {item.short} {item.isDir && item.files && <span className="text-12">({item.files})</span>}
                </button>
            </td>
            <td className="font-mono hidden sm:table-cell text-right text-12 text-neutral dark:text-neutral-dark">{item.size}</td>
            <td className="font-mono hidden md:table-cell text-right text-12 text-neutral dark:text-neutral-dark">
                {item.modified ?? '-'}
            </td>
            <td className="text-right items-center">
                <Button text="Rename" icon={mdiRenameBox} onClick={(): void => handleRename(item)} className="inline-block" />
                <Button text="Delete" icon={mdiDeleteOutline} onClick={(): void => handleDelete(item)} className="inline-block" />
            </td>
        </tr>
    );

    return (
        <table className="table-auto w-full text-left">
            <thead>
                <tr className="">
                    <th>&nbsp;</th>
                    <th className="text-left">Filename</th>
                    <th className="hidden sm:table-cell text-right">Size</th>
                    <th className="hidden md:table-cell text-right">Uploaded</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {content.length ? (
                    content.map(renderItem)
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center italic pt-16">
                            This folder is empty...
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
