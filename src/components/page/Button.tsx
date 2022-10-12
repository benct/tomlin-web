import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import { Icon } from '@mdi/react';
import { button, buttonIcon } from '@/styles';

type ButtonProps = {
    text: string;
    icon?: string;
    size?: string | number;
    className?: string;
};

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ text, icon, size = 1, className = '', ...rest }) => (
    <button className={`${icon ? buttonIcon : button} ${className}`} title={text} aria-label={text} {...rest}>
        {icon ? <Icon path={icon} size={size ?? 1} /> : text}
    </button>
);

export const LinkButton: FC<ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>> = ({
    text,
    icon,
    size = 1,
    className = '',
    ...rest
}) => (
    <a target="_blank" rel="noreferrer" className={`${icon ? buttonIcon : button} ${className}`} title={text} aria-label={text} {...rest}>
        {icon ? <Icon path={icon} size={size} /> : text}
    </a>
);
