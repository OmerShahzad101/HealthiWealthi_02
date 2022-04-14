import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CgPhone } from 'react-icons/cg'
import $ from "jquery";
import { useSelector } from "react-redux";
import { CLIENT_DASHBOARD,COACH_DASHBOARD } from "../../../router/constants/ROUTES";

export default function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const loginToken = useSelector((state) => state.auth.accessToken);
  const userRole = useSelector((state) => state.auth.user.userRole);

  useEffect(() => {
    $("body").append('<div class="sidebar-overlay"></div>');
    $(document).on("click", "#mobile_btn", function () {
      $("main-wrapper").toggleClass("slide-nav");
      $(".sidebar-overlay").toggleClass("opened");
      $("html").addClass("menu-opened");
      return false;
    });

    $(document).on("click", ".sidebar-overlay", function () {
      $("html").removeClass("menu-opened");
      $(this).removeClass("opened");
      $("main-wrapper").removeClass("slide-nav");
    });

    $(document).on("click", "#menu_close", function () {
      $("html").removeClass("menu-opened");
      $(".sidebar-overlay").removeClass("opened");
      $("main-wrapper").removeClass("slide-nav");
    });
  }, []);

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <a id="mobile_btn" href="#">
              <span className="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </a>
            <Link to="/" className="navbar-brand logo">
              <img src="assets/img/Logo.svg" className="img-fluid" alt="Logo" />
            </Link>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <img
                  src="assets/img/Logo.svg"
                  className="img-fluid"
                  alt="logo"
                />
              </Link>
              <a id="menu_close" className="menu-close" href="#;">
                <i className="fas fa-times"></i>
              </a>
            </div>
            <ul className="main-nav">
              <li className={splitLocation[1] === "" ? "active" : ""}>
                <Link to="/">Home</Link>
              </li>{" "}
              <li className={splitLocation[1] === "about" ? "active" : ""}>
                <Link to="/about">About</Link>
              </li>
              <li
                className={splitLocation[1] === "search-coach" ? "active" : ""}
              >
                <Link to="/search-coach">Search Coach</Link>
              </li>
              {/* <li>
                <Link to="/app/coach-dashboard">Coach Dashboard</Link>
              </li>
              <li>
                <Link to="/client-dashboard">Client Dashboard</Link>
              </li> */}
              <li className={splitLocation[1] === "contact-us" ? "active" : ""}>
                <Link to="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>
          <ul className="nav header-navbar-rht">
            <li className="nav-item contact-item">
              <div className="header-contact-img">
              <CgPhone size={28}/>
              </div>
              
              <div className="header-contact-detail">
                <p className="contact-header">Contact</p>
                <p className="contact-info-header">+1 315 369 5943</p>
              </div>
            </li>
            <li className="nav-item">
              {loginToken ? (
                <Link className="nav-link header-login" to = { userRole==1 ? CLIENT_DASHBOARD : COACH_DASHBOARD}>
                  Go to Dashboard
                </Link>
              ) : (
                <Link className="nav-link header-login" to="/login">
                  login / Signup
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
