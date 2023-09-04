import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Icon } from '@mdi/react';

type ButtonProps = {
    text: string;
    icon?: string;
    size?: string | number;
    className?: string;
};

export const Button = ({ text, icon, size = 1, className = '', ...rest }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={`${icon ? 'button-icon' : 'button-text'} ${className}`} title={text} aria-label={text} {...rest}>
        {icon ? <Icon path={icon} size={size ?? 1} /> : text}
    </button>
);

export const LinkButton = ({ text, icon, size = 1, className = '', ...rest }: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
        target="_blank"
        rel="noreferrer"
        className={`${icon ? 'button-icon' : 'button-text'} ${className}`}
        title={text}
        aria-label={text}
        {...rest}>
        {icon ? <Icon path={icon} size={size} /> : text}
    </a>
);
