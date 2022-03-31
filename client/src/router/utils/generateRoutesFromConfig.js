import { Redirect, Route, Switch } from 'react-router';
import Page from '../middleware/Page';
export default function generateRoutesFromConfig(config) {
    return (
        <>
        <Switch>
            {config.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    render={() => {
                        if (route.redirect) {
                            return <Redirect to={route.redirect} />;
                        }
                        
                        return <Page route={route} />;
                    }}
                />
            ))}
        </Switch>
        </>
    );
}
