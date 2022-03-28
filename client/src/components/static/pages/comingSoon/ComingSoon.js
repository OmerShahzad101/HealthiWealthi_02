import { useEffect, useRef, useState } from 'react';
import { Form, FloatingLabel, Button, Spinner } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaVimeoV } from 'react-icons/fa';

import Logo from '../../common/logo/Logo';
import Toast from '../../../common/toast/Toast';

import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../axios';
import validate from '../../../../utils/form-validation/authFormValidation';
import styles from './comingSoon.module.scss';

const ComingSoon = () => {
    const emailRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // Cancel company creation HTTP call in case component is unmounted due to route change
    useEffect(() => {
        return cancelOngoingHttpRequest;
    }, []);

    function subscribeHandler(event) {
        event.preventDefault();
        const email = emailRef.current.value;
        const inputData = {
            email,
        };

        const errors = validate(inputData);
        if (Object.keys(errors).length > 0) {
            setValidationErrors({ ...errors });
            return;
        } else {
            setValidationErrors({});
        }

        setIsLoading(true);
        postHttpRequest('/subscribe/create', { ...inputData })
            .then((response) => {
                const data = response.data;

                if (data && data.success) {
                    Toast.fire({
                        icon: 'info',
                        title: data.message,
                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: data.message,
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className={styles.ComingSoonWrapper}>
            <div className={styles.topBar}>
                <Logo />
            </div>
            <div className={styles.comingSoonContent}>
                <div className="col-md-12 d-flex justify-content-between align-items-center flex-column">
                    <p>Your Employee Score Evaluation Platform is </p>
                    <h4>COMING SOON</h4>
                </div>

                <div className={styles.notification}>
                    <span>Get notified when we launch</span>
                </div>

                <div className={styles.email}>
                    <FloatingLabel controlId="floating-input-email" label="Enter your email address" className={styles.label111}>
                        <Form.Control type="email" ref={emailRef} placeholder="henry.octane@gmail.com" autoComplete="email" name="email" required />
                    </FloatingLabel>

                    <Button type="button" onClick={(e) => subscribeHandler(e)} className={styles.subscribeBtn} disabled={isLoading}>
                        {!isLoading && <span>Subscribe</span>}
                        {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                    </Button>
                </div>

                <span className="errors">{validationErrors?.email}</span>

                <div className={styles.icons}>
                    <div className={styles.social}>
                        <FaFacebookF />
                    </div>
                    <div className={styles.social}>
                        <FaInstagram />
                    </div>
                    <div className={styles.social}>
                        <FaTwitter />
                    </div>
                    <div className={styles.social}>
                        <FaYoutube />
                    </div>
                    <div className={styles.social}>
                        <FaVimeoV />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
