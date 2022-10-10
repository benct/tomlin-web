import { FC, PropsWithChildren, ReactNode } from 'react';

type BoxProps = {
    title?: string | ReactNode;
    border?: string;
    className?: string;
};

export const Box: FC<PropsWithChildren<BoxProps>> = ({ title, border, className, children }) => (
    <section className={`text-primary dark:text-primary-dark bg-light dark:bg-dark px-16 sm:px-24 py-32 sm:py-40 md:px-32 ${border ?? ''}`}>
        {title ? (
            <h2 className="flex justify-center items-center gap-12 text-secondary dark:text-secondary-dark text-16 uppercase pb-16">
                {title}
            </h2>
        ) : null}
        <div className={className}>{children}</div>
    </section>
);
