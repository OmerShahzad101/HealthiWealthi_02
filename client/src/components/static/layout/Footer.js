import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHttpRequest } from "../../../axios";
export default function Footer() {
  const [cmsPage, setCmsPage] = useState();

  useEffect(() => {
    getHttpRequest(`/admin/cms/list`)
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }
        if (response?.data?.success === true) {
          setCmsPage(response?.data?.data?.cmsList);
        } else {
          console.log(response.data.message);
        }
      })
      .catch(() => {
        console.log("Something went wrong...");
      });
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <img src="assets/img/Logo.svg" alt="logo" />
                </div>
                <div className="footer-about-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <div className="social-icon">
                    <ul>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-dribbble"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Links</h2>
                <ul>
                  <li>
                    <Link to="/search-coach">
                      <i className="fas fa-angle-double-right"></i> Search for
                      Coach
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <i className="fas fa-angle-double-right"></i> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <i className="fas fa-angle-double-right"></i> Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Quick Links</h2>
                <ul>
                  {cmsPage &&
                    cmsPage.map((page, key) => (
                      <li key={key}>
                        <Link to={`cmspage?${page._id}`}>
                          <i className="fas fa-angle-double-right"></i>
                          {page.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">Contact Us</h2>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <span>
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <p>
                      3556 Beech Street, San Francisco,
                      <br />
                      California, CA 94108
                    </p>
                  </div>
                  <p>
                    <i className="fas fa-phone-alt"></i>
                    +1 315 369 5943
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-envelope"></i>
                    healthiwealthi4@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="copyright-text">
                  <p className="mb-0">
                    {/* <a href="templateshub.net">Templates Hub</a> */}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="copyright-menu">
                  <ul className="policy-menu">
                    <li>
                      <Link to="/terms-and-conditions">Terms and Conditions</Link>
                    </li>
                    <li>
                      <a href="#">Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
