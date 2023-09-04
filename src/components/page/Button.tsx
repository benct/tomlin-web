import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Icon } from '@mdi/react';

type ButtonProps = {
    text: string;
    icon?: string;
    size?: string | number;
    active?: boolean;
    className?: string;
};

export const Button = ({
    text,
    icon,
    href,
    target = '_blank',
    size = 1,
    active = false,
    className = '',
    ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const activeClassNames = active ? 'bg-slate-100 dark:bg-slate-800 border-slate-800 dark:border-slate-100' : '';
    const classNames = `${icon ? 'button-icon' : 'button-text'} ${activeClassNames} ${className}`;
    const content = icon ? <Icon path={icon} size={size} /> : text;

    return href ? (
        <a target={target} rel="noreferrer" className={classNames} title={text} aria-label={text} {...rest}>
            {content}
        </a>
    ) : (
        <button className={classNames} title={text} aria-label={text} {...rest}>
            {content}
        </button>
    );
};
