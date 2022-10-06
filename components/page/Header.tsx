import { FC, useEffect, useState } from 'react';
import { Icon } from '@mdi/react';
import { mdiGithub, mdiMenu, mdiThemeLightDark } from '@mdi/js';
import { Navigation } from './Navigation';
import { Button } from './Button';

export const Header: FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
        window.localStorage.setItem('theme', darkMode ? 'light' : 'dark');
        setDarkMode(!darkMode);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <header className="max-w mx-auto py-24 sm:py-32 px-16 sm:px-24 md:px-32 bg-light dark:bg-dark border-b flex items-center gap-24 md:gap-32">
                <Button text="Menu" title="Open Menu" icon={mdiMenu} size={1.8} onClick={toggleMenu} />
                <h1 className="flex-1 text-white dark:text-slate-600 text-34 font-bold drop-shadow tracking-[8px] uppercase truncate select-none">
                    T<span className="hidden sm:inline">omlin</span>
                </h1>
                <div className="flex items-center gap-12">
                    <Icon
                        path={mdiThemeLightDark}
                        size="24px"
                        id="theme-icon"
                        className="text-neutral dark:text-neutral-dark"
                        title="Theme"
                    />
                    <Button text={darkMode ? 'Dark' : 'Light'} title="Swap theme" onClick={toggleTheme} />
                    <Icon
                        path={mdiGithub}
                        size="24px"
                        id="version-icon"
                        className="text-neutral dark:text-neutral-dark ml-16"
                        title="Version"
                    />
                    <Button text="3.1.0" title="View changelog on GitHub" href="https://github.com/benct/tomlin-web" />
                </div>
            </header>
            <Navigation show={showMenu} toggle={toggleMenu} />
        </>
    );
};
