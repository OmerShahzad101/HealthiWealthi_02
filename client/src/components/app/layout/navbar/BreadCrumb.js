import React from "react";
import { Link, useLocation } from "react-router-dom";
import breadCrumb from "../../../../utils/breadcrumb/breadcrumb"
const BreadCrumb =  (props)  => {
  const location = useLocation();
  const { pathname } = location;
  const  TITLE_NAME = breadCrumb(pathname)

  return (
    <div className="breadcrumb-bar">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-md-12 col-12">
          <nav aria-label="breadcrumb" className="page-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Coach Profile
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title">Coach Profile</h2>
        </div>
      </div>
    </div>
  </div>
  );
};
export default BreadCrumb;
