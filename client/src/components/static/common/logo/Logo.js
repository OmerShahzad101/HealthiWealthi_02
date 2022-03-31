import { Link } from "react-router-dom";

import { ROOT } from "../../../../router/constants/ROUTES";
const Logo = () => {
  return (
    <div>
      <Link to={ROOT}>
        <img
          style={{ width: "120px" }}
          className="img-fluid"
          src="/assets/img/Logo.svg"
          alt=" logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
