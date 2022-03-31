import { Button } from 'react-bootstrap';

import GoogleLogo from '../../../assets/img/googleLogo.svg';
// import styles from '../../static/pages/login/Login.module.scss';

export default function Google(props) {
    const googleLogin = () => {
        console.log(process.env.REACT_APP_BASE_API);
        window.location.href = process.env.REACT_APP_BASE_API + '/auth/google';
    };

    return (
        <Button  onClick={googleLogin} className="btn btn-block with-google w-100">
            <img src={GoogleLogo} alt="google logo" />
            <p  className="m-0">{props.placeholder}</p>
        </Button>
    );
}
