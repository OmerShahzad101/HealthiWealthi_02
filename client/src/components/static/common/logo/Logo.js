import { Link } from 'react-router-dom';

import { ROOT } from '../../../../router/constants/ROUTES';

const Logo = () => {
    return (
        <div>
            <Link to={ROOT}>
                <img style = {{width:"70px"}} className="img-fluid" src="/images/logo.svg" alt=" logo" />
            </Link>
        </div>
    );
};

export default Logo;
