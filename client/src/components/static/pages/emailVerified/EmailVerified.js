import { Link } from "react-router-dom";
import { LOGIN } from "../../../../router/constants/ROUTES";
import Mail from "../../../../assets/img/mail.png";
import styles from "./emailVerified.module.scss";

export default function EmailVerified() {
  return (
    <div className={styles.preparingWrapper}>
      <div className={styles.items}>
        <div className="dg-mb-24">
          <h3>
            Awesome<span>.</span>
          </h3>
          <p className={styles.success}>
            Your Email has been successfully verified!
          </p>
        </div>

        <div className={`${styles.preparingImg} dg-mb-24`}>
          <img src={Mail} alt="Letter" className="dg-mb-24" />
          <p>Please login to continue to your dashboard.</p>
        </div>
        <div>
          <Link to={LOGIN} className={`${styles.continueBtn} dg-mt-28`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
