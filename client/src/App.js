import { useMemo } from 'react';
import getRouteConfigs from './router/configs/base.routes';
import generateRoutesFromConfig from './router/utils/generateRoutesFromConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    const configs = useMemo(getRouteConfigs, []);

    // Generate and return routes from configs
    return useMemo(() => generateRoutesFromConfig(configs), [configs]);
}

export default App;
