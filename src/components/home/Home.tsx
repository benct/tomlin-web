import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@mdi/react';
import { mdiLoading } from '@mdi/js';

import { useAppContext } from '@/data/context';
import { useAuthenticate } from '@/data/auth';

import { Box } from '@/components/page/Box';
import { Countdown } from './Countdown';
import { Quote } from './Quote';
import { Time } from './Time';

export const Home: FC = () => {
    const { settings } = useAppContext();
    const { data, loading } = useAuthenticate();

    const weatherIcon = data?.forecast ? `/images/weather/${data.forecast}.svg` : '/images/icon/home.svg';

    return (
        <>
            <Box title="Welcome" border="border-b">
                <p className="max-w-narrow mx-auto text-center">
                    This site is just a personal website project I doodle with from time to time. For more on me, see the{' '}
                    <Link href="/about">
                        <a className="text-secondary dark:text-secondary-dark hover:underline">about section</a>
                    </Link>{' '}
                    or follow the social media links at the bottom of the page.
                </p>
            </Box>
            <div className="grid md:grid-cols-2 border-b">
                <Box title="Home" border="border-b md:border-none" className="flex justify-evenly items-center gap-8">
                    <div className="w-48 h-48" data-tooltip={data?.forecast?.replaceAll('_', ' ')}>
                        <Image src={weatherIcon} alt="Current weather" width={48} height={48} />
                    </div>
                    <div className="text-center">
                        <span className="text-12">Oslo</span>
                        <div className="font-bold">
                            <Time locale="nb-NO" timeZone="Europe/Oslo" />
                        </div>
                    </div>
                    <div className="flex justify-center gap-8 items-center w-48 h-48" data-tooltip="Temperature">
                        <span className="text-22 font-bold">{data?.temperature ?? '-'}</span>
                        <span className="text-12">&deg;C</span>
                    </div>
                </Box>
                <Box title="API" className="flex justify-center items-center gap-32">
                    {loading ? (
                        <Icon path={mdiLoading} spin={true} size="48px" aria-label="Loading..." />
                    ) : (
                        <Image src={`/images/icon/${data ? 'up' : 'down'}.svg`} alt={data ? 'Up' : 'Down'} width={48} height={48} />
                    )}
                    <span className="italic">{loading ? 'Loading...' : data ? 'Running' : 'Down...'}</span>
                </Box>
            </div>
            <Countdown title="Countdown to something..." timestamp={settings.countdownTarget} icon={settings.countdownIcon} />
            <Quote />
        </>
    );
};
