import styles from './assignTo.module.scss';
import imagePath from '../../../../../utils/url/imagePath';

const AssignTo = (props) => {
    return (
        <div>
            <div className={styles.AssignToWrapper}>
                <div className={styles.imgWrap}>
                  {props.avatar && (<img src={imagePath(props.avatar)} alt="Avatar" />) }
                </div>
                <div className={`${styles.name} dg-ml-8`}>
                    <p>{props.userName}</p>
                </div>
            </div>
        </div>
    );
};

export default AssignTo;
