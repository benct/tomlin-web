import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import { Icon } from '@mdi/react';

type ButtonProps = {
    text: string;
    icon?: string;
    size?: string | number;
    className?: string;
};

const iconClassNames = 'p-2 rounded-8 hover:bg-neutral';
const textClassNames = 'px-8 py-6 border dark:border-slate-400 hover:shadow rounded-4 text-12 font-bold uppercase';
const commonClassNames = 'text-primary dark:text-primary-dark dark:hover:bg-neutral-dark';

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ text, icon, size = 1, className = '', ...rest }) => (
    <button className={`${commonClassNames} ${icon ? iconClassNames : textClassNames} ${className}`} aria-label={text} {...rest}>
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
    <a
        target="_blank"
        rel="noreferrer"
        className={`${commonClassNames} ${icon ? iconClassNames : textClassNames} ${className}`}
        aria-label={text}
        {...rest}>
        {icon ? <Icon path={icon} size={size} /> : text}
    </a>
);
