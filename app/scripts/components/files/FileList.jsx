import React from 'react';
import PropTypes from 'prop-types';

function FileList({ content, focused, handleClick, handleRename, handleDelete }) {
    const renderItem = (item, i) => {
        return (
            <tr key={i}>
                <td>
                    <img className="file-icon" src={require(`../../../images/file/${item.icon}`)} alt={item.icon} />
                </td>
                <td className="file-name">
                    <span onClick={() => handleClick(item)} className={i === focused ? 'focused' : ''} role="button" tabIndex="0">
                        {item.short}
                    </span>
                    <span onClick={() => handleDelete(item)} className="file-info monospace float-right" role="button" tabIndex="0">
                        [x]
                    </span>
                    <span onClick={() => handleRename(item)} className="file-info monospace float-right" role="button" tabIndex="0">
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
    };

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
                    content.map((item, i) => renderItem(item, i))
                ) : (
                    <tr>
                        <td colSpan="5">This folder is empty...</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

FileList.propTypes = {
    content: PropTypes.array.isRequired,
    focused: PropTypes.number,
    handleClick: PropTypes.func.isRequired,
    handleRename: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default React.memo(FileList);
