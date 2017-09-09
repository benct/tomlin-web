import React from 'react';

export default function FileList({ content, focused, handleClick }) {
    const renderItem = (item, i) => {
        return (
            <tr key={i}>
                <td><img className="file-icon" src={require('../../images/file/' + item.icon)}/></td>
                <td className="file-name">
                    <span onClick={() => handleClick(item)} className={i === focused ? 'focused' : ''}>{item.short}</span>
                </td>
                <td className="file-info monospace hide-lt600 rightify"><span>{item.size}</span></td>
                <td className="file-info monospace hide-lt768"><span>{item.perms}</span></td>
                <td className="file-info monospace hide-lt768"><span>{item.date}</span></td>
            </tr>
        );
    };

    return (
        <table className="file-table">
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th className="leftify">Filename</th>
                <th className="hide-lt600">Size</th>
                <th className="hide-lt768">Permissions</th>
                <th className="hide-lt768">Uploaded</th>
            </tr>
            </thead>
            <tbody>
            {content.length ? content.map((item, i) => renderItem(item, i)) : (<tr><td colSpan="5">This folder is empty...</td></tr>)}
            </tbody>
        </table>
    );
}