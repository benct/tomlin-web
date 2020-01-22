import React from 'react';
import Icon from '@mdi/react';
import { mdiFileQuestion } from '@mdi/js';

import { FileItem } from '../../interfaces';

interface FileListProps {
    content: FileItem[];
    focused: number | null;
    handleClick: (item: FileItem) => void;
    handleRename: (item: FileItem) => void;
    handleDelete: (item: FileItem) => void;
}

const cdnUrl = 'https://cdn.tomlin.no/icons/file';

const FileList: React.FC<FileListProps> = ({ content, focused, handleClick, handleRename, handleDelete }): React.ReactElement => {
    const renderItem = (item: FileItem, i: number): React.ReactElement => (
        <tr key={i}>
            <td>
                {item.icon ? (
                    <img className="file-icon" src={`${cdnUrl}/${item.type}.png`} alt={item.type} />
                ) : (
                    <Icon path={mdiFileQuestion} title="Unknown type" className="file-icon" />
                )}
            </td>
            <td className="file-name">
                <span onClick={(): void => handleClick(item)} className={i === focused ? 'focused' : ''} role="button" tabIndex={0}>
                    {item.short} {item.dir && <span>({item.files})</span>}
                </span>
                <span onClick={(): void => handleDelete(item)} className="file-info monospace float-right" role="button" tabIndex={0}>
                    [x]
                </span>
                <span onClick={(): void => handleRename(item)} className="file-info monospace float-right" role="button" tabIndex={0}>
                    [r]
                </span>
            </td>
            <td className="file-info monospace hide-lt600 text-right">
                <span>{item.size}</span>
            </td>
            <td className="file-info monospace hide-lt768">
                <span>{item.perms}</span>
            </td>
            <td className="file-info monospace hide-lt768">
                <span>{item.date}</span>
            </td>
        </tr>
    );

    return (
        <table className="file-table">
            <thead>
                <tr className="color-primary">
                    <th>&nbsp;</th>
                    <th className="text-left">Filename</th>
                    <th className="hide-lt600 text-right">Size</th>
                    <th className="hide-lt768">Permissions</th>
                    <th className="hide-lt768">Uploaded</th>
                </tr>
            </thead>
            <tbody>
                {content.length ? (
                    content.map(renderItem)
                ) : (
                    <tr>
                        <td colSpan={5} className="ptl">
                            This folder is empty...
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default React.memo(FileList);
