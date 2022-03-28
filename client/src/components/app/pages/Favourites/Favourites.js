import React from "react";
import { Link } from "react-router-dom";

const Favourites = () => {
  return (
    <>
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
                    Favourites
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Favourites</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="row">
		  <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                  <div className="profile-info-widget">
                    <a href="#" className="booking-doc-img">
                      <img
                        src="assets/img/patients/patient.jpg"
                        alt="User Image"
                      />
                    </a>
                    <div className="profile-det-info">
                      <h3>Richard Wilson</h3>
                      <div className="patient-details">
                        <h5>
                          <i className="fas fa-birthday-cake"></i> 24 Jul 1983,
                          38 years
                        </h5>
                        <h5 className="mb-0">
                          <i className="fas fa-map-marker-alt"></i> Newyork, USA
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-widget">
                  <nav className="dashboard-menu">
                    <ul>
                      <li >
                        <Link to="/client-dashboard">
                          <i className="fas fa-columns"></i>
                          <span>Dashboard</span>
                        </Link>
						
                      </li>
                      <li className="active">
                        <Link to="/favourites">
                          <i className="fas fa-bookmark"></i>
                          <span>Favourites</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/chat">
                          <i className="fas fa-comments"></i>
                          <span>Message</span>
                          <small className="unread-msg">23</small>
                        </Link>
                      </li>
                      <li>
                        <Link to="/videocall">
                          <i className="fas fa-comments"></i>
                          <span>Video Call</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/audiocall">
                          <i className="fas fa-comments"></i>
                          <span>Voice Call</span>
                        
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile-settings">
                          <i className="fas fa-user-cog"></i>
                          <span>Profile Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/change-password">
                          <i className="fas fa-lock"></i>
                          <span>Change Password</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fas fa-sign-out-alt"></i>
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row row-grid">
                <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="profile-widget">
                <div className="doc-img">
                  <Link to="/coach-profile">
                    <img
                      className="img-fluid"
                      alt="User Image"
                      src="assets/img/doctors/doctor-01.jpg"
                    />
                  </Link>
                  <a href="#" className="fav-btn">
                    <i className="far fa-bookmark"></i>
                  </a>
                </div>
                <div className="pro-content">
                  <h3 className="title">
                    <Link to="/coach-profile">Ruby Perrin</Link>
                    <i className="fas fa-check-circle verified"></i>
                  </h3>
                  <p className="speciality">
                    MDS - Periodontology and Oral Implantology, BDS
                  </p>
                  <div className="rating">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <span className="d-inline-block average-rating">(17)</span>
                  </div>
                  <ul className="available-info">
                    <li>
                      <i className="fas fa-map-marker-alt"></i> Florida, USA
                    </li>
                    <li>
                      <i className="far fa-clock"></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i> $300 - $1000
                      <i
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        title="Lorem Ipsum"
                      ></i>
                    </li>
                  </ul>
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link to="/coach-profile" className="btn view-btn">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="/book-appointment" className="btn book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="profile-widget">
                <div className="doc-img">
                  <Link to="/coach-profile">
                    <img
                      className="img-fluid"
                      alt="User Image"
                      src="assets/img/doctors/doctor-02.jpg"
                    />
                  </Link>
                  <a href="#" className="fav-btn">
                    <i className="far fa-bookmark"></i>
                  </a>
                </div>
                <div className="pro-content">
                  <h3 className="title">
                    <Link to="/coach-profile">Darren Elder</Link>
                    <i className="fas fa-check-circle verified"></i>
                  </h3>
                  <p className="speciality">
                    BDS, MDS - Oral & Maxillofacial Surgery
                  </p>
                  <div className="rating">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                    <span className="d-inline-block average-rating">(35)</span>
                  </div>
                  <ul className="available-info">
                    <li>
                      <i className="fas fa-map-marker-alt"></i> Newyork, USA
                    </li>
                    <li>
                      <i className="far fa-clock"></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i> $50 - $300
                      <i
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        title="Lorem Ipsum"
                      ></i>
                    </li>
                  </ul>
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link to="/coach-profile" className="btn view-btn">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="/book-appointment" className="btn book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="profile-widget">
                <div className="doc-img">
                  <Link to="/coach-profile">
                    <img
                      className="img-fluid"
                      alt="User Image"
                      src="assets/img/doctors/doctor-03.jpg"
                    />
                  </Link>
                  <a href="#" className="fav-btn">
                    <i className="far fa-bookmark"></i>
                  </a>
                </div>
                <div className="pro-content">
                  <h3 className="title">
                    <Link to="/coach-profile">Deborah Angel</Link>
                    <i className="fas fa-check-circle verified"></i>
                  </h3>
                  <p className="speciality">
                    MBBS, MD - General Medicine, DNB - Cardiology
                  </p>
                  <div className="rating">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                    <span className="d-inline-block average-rating">(27)</span>
                  </div>
                  <ul className="available-info">
                    <li>
                      <i className="fas fa-map-marker-alt"></i> Georgia, USA
                    </li>
                    <li>
                      <i className="far fa-clock"></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i> $100 - $400
                      <i
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        title="Lorem Ipsum"
                      ></i>
                    </li>
                  </ul>
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link to="/coach-profile" className="btn view-btn">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="/book-appointment" className="btn book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="profile-widget">
                <div className="doc-img">
                  <Link  to="/coach-profile">
                    <img
                      className="img-fluid"
                      alt="User Image"
                      src="assets/img/doctors/doctor-04.jpg"
                    />
                  </Link>
                  <a href="#" className="fav-btn">
                    <i className="far fa-bookmark"></i>
                  </a>
                </div>
                <div className="pro-content">
                  <h3 className="title">
                    <Link to="/coach-profile">Sofia Brient</Link>
                    <i className="fas fa-check-circle verified"></i>
                  </h3>
                  <p className="speciality">
                    MBBS, MS - General Surgery, MCh - Urology
                  </p>
                  <div className="rating">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                    <span className="d-inline-block average-rating">(4)</span>
                  </div>
                  <ul className="available-info">
                    <li>
                      <i className="fas fa-map-marker-alt"></i> Louisiana, USA
                    </li>
                    <li>
                      <i className="far fa-clock"></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i> $150 - $250
                      <i
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        title="Lorem Ipsum"
                      ></i>
                    </li>
                  </ul>
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link to="/coach-profile" className="btn view-btn">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="/book-appointment" className="btn book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="profile-widget">
                <div className="doc-img">
                  <Link to="/coach-profile">
                    <img
                      className="img-fluid"
                      alt="User Image"
                      src="assets/img/doctors/doctor-05.jpg"
                    />
                  </Link>
                  <a href="#" className="fav-btn">
                    <i className="far fa-bookmark"></i>
                  </a>
                </div>
                <div className="pro-content">
                  <h3 className="title">
                    <Link to="/coach-profile">Marvin Campbell</Link>
                    <i className="fas fa-check-circle verified"></i>
                  </h3>
                  <p className="speciality">
                    MBBS, MD - Ophthalmology, DNB - Ophthalmology
                  </p>
                  <div className="rating">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                    <span className="d-inline-block average-rating">(66)</span>
                  </div>
                  <ul className="available-info">
                    <li>
                      <i className="fas fa-map-marker-alt"></i> Michigan, USA
                    </li>
                    <li>
                      <i className="far fa-clock"></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i> $50 - $700
                      <i
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        title="Lorem Ipsum"
                      ></i>
                    </li>
                  </ul>
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link to="/coach-profile" className="btn view-btn">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="/book-appointment" className="btn book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="profile-widget">
                <div className="doc-img">
                  <Link to="/coach-profile">
                    <img
                      className="img-fluid"
                      alt="User Image"
                      src="assets/img/doctors/doctor-06.jpg"
                    />
                  </Link>
                  <a href="#" className="fav-btn">
                    <i className="far fa-bookmark"></i>
                  </a>
                </div>
                <div className="pro-content">
                  <h3 className="title">
                    <Link to="/coach-profile">Katharine Berthold</Link>
                    <i className="fas fa-check-circle verified"></i>
                  </h3>
                  <p className="speciality">
                    MS - Orthopaedics, MBBS, M.Ch - Orthopaedics
                  </p>
                  <div className="rating">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                    <span className="d-inline-block average-rating">(52)</span>
                  </div>
                  <ul className="available-info">
                    <li>
                      <i className="fas fa-map-marker-alt"></i> Texas, USA
                    </li>
                    <li>
                      <i className="far fa-clock"></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i> $100 - $500
                      <i
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        title="Lorem Ipsum"
                      ></i>
                    </li>
                  </ul>
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link to="/coach-profile" className="btn view-btn">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="/book-appointment" className="btn book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                <div className="col-md-6 col-lg-4 col-xl-3">
                <div className="profile-widget">
                <div className="doc-img">
                  <Link to="/coach-profile">
                    <img
                      className="img-fluid"
                      alt="User Image"
                      src="assets/img/doctors/doctor-07.jpg"
                    />
                  </Link>
                  <a href="#" className="fav-btn">
                    <i className="far fa-bookmark"></i>
                  </a>
                </div>
                <div className="pro-content">
                  <h3 className="title">
                    <Link to="/coach-profile">Linda Tobin</Link>
                    <i className="fas fa-check-circle verified"></i>
                  </h3>
                  <p className="speciality">
                    MBBS, MD - General Medicine, DM - Neurology
                  </p>
                  <div className="rating">
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star filled"></i>
                    <i className="fas fa-star"></i>
                    <span className="d-inline-block average-rating">(43)</span>
                  </div>
                  <ul className="available-info">
                    <li>
                      <i className="fas fa-map-marker-alt"></i> Kansas, USA
                    </li>
                    <li>
                      <i className="far fa-clock"></i> Available on Fri, 22 Mar
                    </li>
                    <li>
                      <i className="far fa-money-bill-alt"></i> $100 - $1000
                      <i
                        className="fas fa-info-circle"
                        data-toggle="tooltip"
                        title="Lorem Ipsum"
                      ></i>
                    </li>
                  </ul>
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link to="/coach-profile" className="btn view-btn">
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="/book-appointment" className="btn book-btn">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourites;
