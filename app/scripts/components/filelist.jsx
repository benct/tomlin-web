import React from 'react';

export default function Filelist({ content, handleClick }) {
    const renderItem = (item, i) => {
        return (
            <tr key={i}>
                <td><img className="fileicon" src={require('../../images/file/' + item.icon)}/></td>
                <td className="filename"><span onClick={() => handleClick(item)}>{item.short}</span></td>
                <td className="fileinfo monospace hide-lt480 rightify"><span>{item.size}</span></td>
                <td className="fileinfo monospace hide-lt768"><span>{item.perms}</span></td>
                <td className="fileinfo monospace hide-lt600"><span>{item.date}</span></td>
            </tr>
        );
    };

    return (
        <table className="filesystem">
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th className="leftify">Filename</th>
                <th className="hide-lt480">Size</th>
                <th className="hide-lt768">Permissions</th>
                <th className="hide-lt600">Uploaded</th>
            </tr>
            </thead>
            <tbody>
            {content.length ? content.map((item, i) => renderItem(item, i)) : (<tr><td>Empty</td></tr>)}
            </tbody>
        </table>
    );
}