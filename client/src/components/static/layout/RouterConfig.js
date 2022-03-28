import { useMemo } from 'react';

import getRouteConfigs from '../../../router/configs/static.routes';
import generateRoutesFromConfig from '../../../router/utils/generateRoutesFromConfig';

export default function RouterConfig() {
    const configs = useMemo(getRouteConfigs, []);

    // Generate and return routes from configs
    return useMemo(() => generateRoutesFromConfig(configs), [configs]);
}
