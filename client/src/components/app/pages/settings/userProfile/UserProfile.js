import { useEffect, useRef, useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Toast from '../../../../common/toast/Toast';
import TopProgressBar from '../../../../common/top-progress-bar/TopProgressBar';

import { setInfoData } from '../../../../../store/slices/user';
import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../../axios/index';
import validate from '../../../../../utils/form-validation/authFormValidation';
import imagePath from '../../../../../utils/url/imagePath';
import imageExist from '../../../../../utils/url/imageExist';
import { AiOutlineCamera } from 'react-icons/ai';

import styles from './userProfile.module.scss';

const UserProfile = () => {
    const userInfo = useSelector((state) => state.user.info);
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        userName: userInfo?.userName || '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const currentPasswordRef = useRef();

    // Cancel company creation HTTP call in case component is unmounted due to route change
    useEffect(() => {
        return cancelOngoingHttpRequest;
    }, []);

    const checKImage = async (data) => {
        setTimeout(dispatch(setInfoData(data)), 9000);
        
        const exist = await imageExist(data.avatar);
        
        if (exist) {
            dispatch(setInfoData(data));
            return true;
        } else {
            checKImage(data);
        }
    };

    function updateUserHandler(event) {
        event.preventDefault();
        const userName = values.userName;
        const inputData = {
            userName,
        };
        const errors = validate(inputData);

        if (Object.keys(errors).length > 0) {
            setValidationErrors({ ...errors });
            return;
        } else {
            setValidationErrors({});
        }

        setIsLoading(true);
        postHttpRequest('/user/update', { ...inputData, confirmPassword: undefined })
            .then((response) => {
                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }
                if (response.data.success === true) {
                    setValidationErrors({});

                    // Update user data as well in the Redux store
                    dispatch(setInfoData(response.data.user));

                    setValues({ ...values, userName: response.data.user.userName });

                    Toast.fire({
                        icon: 'success',
                        title: response.data.message,
                    });
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: response.data.message,
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function updatePasswordHandler(event) {
        event.preventDefault();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const currentPassword = currentPasswordRef.current.value;

        const inputData = {
            currentPassword,
            password,
            confirmPassword,
        };

        const errors = validate(inputData);
        if (Object.keys(errors).length > 0) {
            setValidationErrors({ ...errors });
            return;
        } else {
            setValidationErrors({});
        }

        setIsLoading(true);
        postHttpRequest('/auth/change-password', { ...inputData })
            .then((response) => {
                if (!response) {
                    console.log('Something went wrong with response...');
                    return;
                }
                if (response.data.success === true) {
                    setValidationErrors({});

                    Toast.fire({
                        icon: 'success',
                        title: response.data.message,
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: response.data.message,
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const onChangeImage = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            let _objFiles = files[0];
            console.log(_objFiles);

            if (_objFiles.size > 1000000) {
                Toast.fire({
                    icon: 'error',
                    title: 'File too Big, please select a file less than 1MB ',
                });
                return;
            }

            if (_objFiles.type.toLowerCase() !== 'image/png' && _objFiles.type.toLowerCase() !== 'image/jpg' && _objFiles.type.toLowerCase() !== 'image/jpeg') {
                Toast.fire({
                    icon: 'error',
                    title: 'Only files with the following extensions are allowed: png, jpg, jpeg',
                });
                return;
            }

            const formData = new FormData();
            formData.append('avatar', files[0], files[0].name);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            setIsLoading(true);
            postHttpRequest('/user/uploadImage', formData, config)
                .then((response) => {
                    if (!response) {
                        console.log('Something went wrong with response...');
                        return;
                    }

                    if (response.data.success === true) {
                        setValidationErrors({});
                        // Update user data as well in the Redux store
                        checKImage(response.data.user);

                        Toast.fire({
                            icon: 'success',
                            title: response.data.message,
                        });
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: response.data.message,
                        });
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handleChange = (event) => {
        event.persist();
        setValues((oldValues) => ({ ...oldValues, [event.target.name]: event.target.value }));
    };

    return (
        <div>
            <TopProgressBar show={isLoading} />
            <div className={` ${styles.imageUploaderWrapper} profile-img`}>

                <div className={styles.circle}>
                    {userInfo && <img src={imagePath(userInfo.avatar)} alt="user img" />}
                    {/* <img className={styles.profilePic} src={imagePath} alt="user img" /> */}
                </div>

                <label className={styles.pImage}>
                    <AiOutlineCamera className={styles.uploadButton} />
                    <input className={styles.fileUpload} type="file" accept="image/png, image/jpeg" onChange={onChangeImage} />
                </label>
            </div>


            <Form noValidate onSubmit={updateUserHandler}>

               

                <Form.Group className="form-group" controlId="formBasicUser">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter User Name" name="userName" value={values.userName} onChange={handleChange} />
                    <span className="errors">{validationErrors.userName}</span>
                </Form.Group>
                <Form.Group className="form-group" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" autoComplete="email" value={userInfo?.email || ''} disabled />
                </Form.Group>
                <div className="row">
                    <div className="col-lg-12">
                        <Button type="submit" className="create-btn" disabled={isLoading}>
                            Update
                        </Button>
                    </div>
                </div>
            </Form>

            <Form noValidate onSubmit={updatePasswordHandler}>
                {/* <FloatingLabel label="Email" className="dg-mb-24">
                            <Form.Control type="email" placeholder="Enter Email" autoComplete="email" value={userInfo?.email || ''} disabled hidden />
                        </FloatingLabel> */}

                <p className={styles.label}>Password</p>

                <Form.Group label="Current Password" className="form-group">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" autoComplete="current-password" ref={currentPasswordRef} placeholder="Current Password" />
                    <span className="errors">{validationErrors.currentPassword}</span>
                </Form.Group>
                <Form.Group label="New Password" className="form-group">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" autoComplete="new-password" ref={passwordRef} placeholder="New Password" />
                    <span className="errors">{validationErrors.password}</span>
                </Form.Group>
                <Form.Group label="Confirm New Password" className="form-group">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" autoComplete="new-password" ref={confirmPasswordRef} placeholder="Confirm New Password" />
                    <span className="errors">{validationErrors.confirmPassword}</span>
                </Form.Group>
                <div className="row">
                    <div className="col-lg-12">
                        <Button type="submit" className="create-btn" disabled={isLoading}>
                            Update
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default UserProfile;
