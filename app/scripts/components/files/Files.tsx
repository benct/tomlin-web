import React from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiCloseCircleOutline, mdiCloudUploadOutline, mdiFolderPlusOutline, mdiFolderSyncOutline, mdiFolderUploadOutline } from '@mdi/js';

import { DefaultState, FileItem, FilePreview, ThunkDispatchProp } from '../../interfaces';
import fileActions, { changeDirectory, createDirectory, open, refresh, remove, rename, upload } from '../../actions/files';

import FileList from './FileList';

const PARENT_DIR = '..';

interface FilesProps {
    cwd: string;
    content: FileItem[];
    focused: number | null;
    preview: FilePreview | null;
    uploading: boolean;
}

class Files extends React.Component<FilesProps & ThunkDispatchProp> {
    fileInput: React.RefObject<HTMLInputElement>;
    fileLabel: React.RefObject<HTMLLabelElement>;

    constructor(props: FilesProps & ThunkDispatchProp) {
        super(props);

        this.fileInput = React.createRef();
        this.fileLabel = React.createRef();

        this.handleKeyboard = this.handleKeyboard.bind(this);
    }

    componentDidMount(): void {
        this.props.dispatch(refresh());

        document.addEventListener('keyup', this.handleKeyboard, false);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keyup', this.handleKeyboard, false);
    }

    handleClick(item: FileItem): void {
        if (item.dir) {
            this.props.dispatch(changeDirectory(item.name));
        } else if (item.preview) {
            this.previewFile(item);
        } else {
            this.forceDownload(item);
        }
    }

    handleKeyboard(event: KeyboardEvent): void {
        event.preventDefault();

        switch (event.keyCode) {
            case 8: // backspace
                this.props.dispatch(changeDirectory(PARENT_DIR));
                break;
            case 13: // enter
                if (this.props.focused !== null) {
                    this.handleClick(this.props.content[this.props.focused]);
                }
                break;
            case 27: // escape
                this.closePreview();
                break;
            case 38: // up
                if (this.props.focused === null) {
                    this.props.dispatch(fileActions.setFocus(0));
                } else if (this.props.focused > 0) {
                    this.props.dispatch(fileActions.setFocus(this.props.focused - 1));
                }
                break;
            case 40: // down
                if (this.props.focused === null) {
                    this.props.dispatch(fileActions.setFocus(0));
                } else if (this.props.focused < this.props.content.length - 1) {
                    this.props.dispatch(fileActions.setFocus(this.props.focused + 1));
                }
                break;
        }
    }

    handleUpload(): void {
        const files = this.fileInput.current && this.fileInput.current.files;
        if (!files || !files.length) {
            return;
        }

        const formData = new FormData();
        for (const key in files) {
            if (Object.prototype.hasOwnProperty.call(files, key) && files[key] instanceof File) {
                formData.append(key, files[key]);
            }
        }

        this.props.dispatch(upload(formData));

        if (this.fileInput.current && this.fileLabel.current) {
            this.fileInput.current.value = '';
            this.fileLabel.current.innerHTML = 'Choose a file';
        }
    }

    handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (this.fileLabel.current) {
            if (this.fileInput.current && this.fileInput.current.files && this.fileInput.current.files.length > 1) {
                this.fileLabel.current.innerHTML = `${this.fileInput.current.files.length} files selected`;
            } else if (event.target.value) {
                this.fileLabel.current.innerHTML = event.target.value.split('\\').pop() || '1 file selected';
            } else {
                this.fileLabel.current.innerHTML = 'Choose a file';
            }
        }
    }

    forceDownload(item: FileItem): void {
        window.setTimeout((): Window | null => window.open(item.href), 100);
    }

    previewFile(item: FileItem): void {
        if ('jpg|jpeg|png|bmp|gif|svg|ico|pdf'.indexOf(item.type) >= 0) {
            this.props.dispatch(fileActions.setPreview({ src: item.href, image: true }));
        } else {
            this.props.dispatch(open(item));
        }
    }

    closePreview(): void {
        this.props.dispatch(fileActions.setPreview(null));
    }

    render(): React.ReactElement {
        return (
            <>
                <div className="file-table-header">
                    <button
                        className="button-icon"
                        onClick={(): void => this.props.dispatch(changeDirectory(PARENT_DIR))}
                        disabled={this.props.cwd === ''}>
                        <Icon path={mdiFolderUploadOutline} size="28px" title="Parent directory" />
                    </button>
                    <div className="text-right">
                        <button className="button-icon mrm" onClick={(): Promise<void> => this.props.dispatch(createDirectory())}>
                            <Icon path={mdiFolderPlusOutline} size="28px" title="New directory" />
                        </button>
                        <button className="button-icon" onClick={(): Promise<void> => this.props.dispatch(refresh())}>
                            <Icon path={mdiFolderSyncOutline} size="28px" title="Refresh content" />
                        </button>
                    </div>
                </div>
                <FileList
                    content={this.props.content}
                    focused={this.props.focused}
                    handleClick={this.handleClick.bind(this)}
                    handleRename={(item: FileItem): Promise<void> => this.props.dispatch(rename(item))}
                    handleDelete={(item: FileItem): Promise<void> => this.props.dispatch(remove(item))}
                />
                <div className="text-center">
                    <label htmlFor="file" className="color-primary pointer">
                        <input
                            className="input input-file"
                            type="file"
                            name="files[]"
                            id="file"
                            aria-label="Add files"
                            onChange={this.handleFileChange.bind(this)}
                            ref={this.fileInput}
                            disabled={this.props.uploading}
                            multiple
                        />
                        <Icon path={mdiCloudUploadOutline} size="20px" title="Upload" />
                        <span className="mlm" ref={this.fileLabel}>
                            Choose a file
                        </span>
                    </label>
                    <br />
                    <button className="input text-small mtl" onClick={this.handleUpload.bind(this)} disabled={this.props.uploading}>
                        {this.props.uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>

                {this.props.preview ? (
                    <div className="overlay">
                        <button className="button-blank" onClick={this.closePreview.bind(this)}>
                            <Icon path={mdiCloseCircleOutline} className="file-close" title="Close" color="white" />
                        </button>
                        {this.props.preview.image ? (
                            <img className="overlay-image" src={this.props.preview.src} alt="Preview" />
                        ) : (
                            <pre className="overlay-preview">{this.props.preview.content}</pre>
                        )}
                    </div>
                ) : null}
            </>
        );
    }
}

export default connect(
    (state: DefaultState): FilesProps => ({
        cwd: state.files.cwd,
        content: state.files.content,
        focused: state.files.focused,
        preview: state.files.preview,
        uploading: state.files.uploading,
    })
)(Files);
