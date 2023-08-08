import { FC, PropsWithChildren } from 'react';
import { mdiThemeLightDark } from '@mdi/js';
import { useTheme } from '@/data/base';
import { Button } from './Button';

export const Standalone: FC<PropsWithChildren<{ title?: string }>> = ({ title, children }) => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <>
            <header className="py-16 px-16 sm:px-24 md:px-32 bg-light dark:bg-dark border-b flex items-center gap-24 md:gap-32">
                <h1 className="flex-1 text-white dark:text-slate-600 text-34 font-bold drop-shadow tracking-[8px] truncate select-none">
                    {title ?? 'Tomlin'}
                </h1>
                <Button text={darkMode ? 'Dark' : 'Light'} title="Swap theme" icon={mdiThemeLightDark} onClick={toggleTheme} />
            </header>
            <main>{children}</main>
            <footer className="py-16 px-16 sm:px-24 md:px-32 bg-light dark:bg-dark border-t">
                <div className="text-16 text-neutral dark:text-neutral-dark text-center user-select-none">bct © 2023</div>
            </footer>
        </>
    );
};
