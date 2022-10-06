import { FC } from 'react';
import { Icon } from '@mdi/react';

type ButtonProps = {
    text: string;
    title?: string;
    icon?: string;
    size?: string | number;
    className?: string;
    onClick?: () => void;
    href?: string;
};

export const Button: FC<ButtonProps> = ({ onClick, href, text, title, icon, size, className }) => {
    const conditional = icon
        ? 'p-2 rounded-8 hover:bg-neutral'
        : 'px-8 py-6 border dark:border-slate-400 hover:shadow rounded-4 text-12 font-bold uppercase';
    const classes = `text-primary dark:text-primary-dark dark:hover:bg-neutral-dark ${conditional} ${className ?? ''}`;

    const content = icon ? <Icon path={icon} size={size ?? 1} /> : text;

    return href ? (
        <a href={href} target="_blank" rel="noreferrer" className={classes} title={title} aria-label={text}>
            {content}
        </a>
    ) : (
        <button onClick={onClick} className={classes} title={title} aria-label={text}>
            {content}
        </button>
    );
};
