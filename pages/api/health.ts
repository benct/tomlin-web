import type { NextApiRequest, NextApiResponse } from 'next';

type HealthProps = {
    health: string;
};

const health = (req: NextApiRequest, res: NextApiResponse<HealthProps>) => {
    res.status(200).json({ health: 'GOOD' });
};

export default health;
