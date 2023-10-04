import dynamic from 'next/dynamic';
import { mdiAlertCircleOutline } from '@mdi/js';
import { Icon } from '@mdi/react';

import { useBeen } from '@/data/admin';

import { Loading } from '@/components/page/Loading';
import { Box } from '@/components/page/Box';

const WorldCharts = dynamic(() => import('@/components/been/WordCharts'), { loading: () => <Loading isLoading /> });
const WorldMap = dynamic(() => import('@/components/been/WorldMap'), { loading: () => <Loading isLoading />, ssr: false });

export const Been = () => {
    const { been, loading } = useBeen();

    return (
        <Box title="Country Tracker" className="text-center">
            <Loading isLoading={loading} text="Loading data...">
                {been ? (
                    <WorldCharts data={been} />
                ) : (
                    <div className="flex justify-center gap-x-16 py-16">
                        <Icon path={mdiAlertCircleOutline} size={1} title="Error" id="error-icon" />
                        <span>Could not fetch data...</span>
                    </div>
                )}
            </Loading>
            <WorldMap data={been} />
        </Box>
    );
};
