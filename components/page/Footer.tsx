import { FC } from 'react';
import { mdiAt, mdiFacebook, mdiGithub, mdiInstagram, mdiLinkedin } from '@mdi/js';
import { Button } from './Button';

const renderLink = (url: string, title: string, icon: string) => <Button href={url} text={title} title={title} icon={icon} />;

export const Footer: FC = () => (
    <footer className="max-w mx-auto bg-light dark:bg-dark border-t py-40 px-16 sm:px-24 md:px-32 space-y-16">
        <div className="flex justify-center gap-x-32">
            {renderLink('https://github.com/benct', 'Github', mdiGithub)}
            {renderLink('https://www.facebook.com/ben.c.tomlin', 'Facebook', mdiFacebook)}
            {renderLink('https://www.instagram.com/benctomlin', 'Instagram', mdiInstagram)}
            {renderLink('https://www.linkedin.com/in/bentomlin', 'LinkedIn', mdiLinkedin)}
            {renderLink('mailto:ben@tomlin.no', 'Email', mdiAt)}
        </div>
        <div className="text-16 text-neutral dark:text-neutral-dark text-center user-select-none">Ben Tomlin © 2022</div>
    </footer>
);
