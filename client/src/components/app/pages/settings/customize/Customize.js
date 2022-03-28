import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Toast from '../../../../common/toast/Toast';
import TopProgressBar from '../../../../common/top-progress-bar/TopProgressBar';

import { setCompany } from '../../../../../store/slices/user';
import { cancelOngoingHttpRequest, postHttpRequest } from '../../../../../axios/index';

import imageExist from '../../../../../utils/url/imageExist';
import uploadArrow from '../../../../../assets/images/uploadArrow.svg';
import styles from './customize.module.scss';

const Customize = () => {
    const companyInfo = useSelector((state) => state.user.company);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Cancel company creation HTTP call in case component is unmounted due to route change
        return cancelOngoingHttpRequest;
    }, []);

    const checKImage = async (data) => {
        dispatch(setCompany(data));
        const exist = await imageExist(data.avatar);

        if (exist) {
            dispatch(setCompany(data));
            return true;
        } else {
            checKImage(data);
        }
    };

    const onChangeCompanyImage = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            let _objFiles = files[0];
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
            formData.append('avatar', _objFiles, _objFiles.name);
            formData.append('companyId', companyInfo?._id);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            setIsLoading(true);
            postHttpRequest('/company/uploadImage', formData, config)
                .then(async (response) => {
                    if (!response) {
                        console.log('Something went wrong with response...');
                        return;
                    }
                    if (response.data.success === true) {
                        // Update company data as well in the Redux store
                        const company = response.data.company;
                        checKImage(company);
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

    let fileUploadContent = (
        <>
            <div className={styles.fileUploadWrapper}>
                <div className={styles.fileUpload}>
                    <input type="file" name="myfile" accept="image/png, image/jpeg" onChange={onChangeCompanyImage} />
                    <img src={uploadArrow} alt="Company Logo" />
                </div>
            </div>

            <div className={`${styles.uploadText} text-center`}>
                <p className="mb-0 dg-mt-16">Upload Logo </p>
            </div>
        </>
    );

    if (companyInfo && companyInfo.avatar) {
        fileUploadContent = (
            <div className={styles.changeImgWrap}>
                <img src={companyInfo.avatar} alt="Company Logo" />
            </div>
        );
    }

    return (
        <div className={`${styles.customizeWrapper}`}>
            <TopProgressBar show={isLoading} />
            <div className="row logo-fav-wrap">
                <div className="col-md-12">
                    <div className={`${styles.chooseLogoWrapper} dgCards`}>
                        <div className={styles.frameWrapper}>
                            <div className={styles.div2}>
                                <div className={styles.uploadedLogo}>
                                    <div className={styles.fileUploadWrapper}>{fileUploadContent}</div>
                                    <div className={styles.changeLogo}>
                                        <label className="btn btn-blue" htmlFor="upload-photo">Change Logo</label>
                                        <input type="file" name="myfile" accept="image/png, image/jpeg" onChange={onChangeCompanyImage} id="upload-photo" className={styles.changeImg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="col-md-3">
                    <p>Fav Icon</p>
                    <div className="favIcon-wrapper">
                        <div className="file-upload-wrapper">
                            <div className="file-upload">
                                <input type="file" name="myfile" accept="image/png, image/jpeg" onChange={onChangeCompanyFav} />
                                <img
                                    src={companyInfo && companyInfo.favIcon ? process.env.REACT_APP_BASE_API + companyInfo.favIcon : uploadArrow}
                                    alt=""
                                />
                            </div>
                            <div className="upload-text text-center">
                                <p className="mb-0 dg-mt-16">Upload </p> <span>16 x 16 px recommended</span>
                            </div>
                            <div className="change-logo">
                                <label htmlFor="upload-photo-fav">Change Fav Icon</label>
                                <input type="file" name="myfile" accept="image/png, image/jpeg" onChange={onChangeCompanyFav} id="upload-photo-fav" className="change-img" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Customize;
