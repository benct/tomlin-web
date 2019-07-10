import React from 'react';

interface ModalProps {
    children: React.ReactNode;
    close: () => void;
    className?: string;
}

export default class Modal extends React.PureComponent<ModalProps> {
    componentDidMount(): void {
        document.body.classList.add('no-scroll');
    }

    componentWillUnmount(): void {
        document.body.classList.remove('no-scroll');
    }

    handleOutsideClick(event: React.MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.props.close();
        }
    }

    render(): React.ReactElement {
        return (
            <div className="overlay" onClick={this.handleOutsideClick.bind(this)} role="dialog">
                <div className={`wrapper overlay-modal shadow ${this.props.className}`}>{this.props.children}</div>
            </div>
        );
    }
}
