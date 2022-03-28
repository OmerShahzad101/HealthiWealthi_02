import { Dropdown, Badge, Table } from 'react-bootstrap'
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Home() {
    const settings = {
        dots: false,
        autoplay: false,
        infinite: true,
        variableWidth: true,
      };
    return <>

          <section className="section section-search">
            <div className="container-fluid">
                <div className="banner-wrapper">
                <div className="banner-header text-center">
                    <h1>Search Coach, Make an Appointment</h1>
                    <p>
                    Discover the best Couch nearest to you.
                    </p>
                </div>

                {/* <!-- Search --> */}
                <div className="search-box">
                    <form action="#">
                    <div className="form-group search-location">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search Location"
                        />
                        <span className="form-text">Based on your Location</span>
                    </div>
                    <div className="form-group search-info">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search Coach"
                        />
                        <span className="form-text">Ex : Nutritionists or Yoga Expert etc</span>
                    </div>
                    <button type="submit" className="btn btn-primary search-btn">
                        <i className="fas fa-search"></i> <span>Search</span>
                    </button>
                    </form>
                </div>
                {/* <!-- /Search --> */}
                </div>
            </div>
          </section>
          <section className="section section-doctor">
            <div className="container-fluid">
                <div className="row">
                <div className="col-lg-4">
                    <div className="section-header ">
                    <h2>Book Our Coach</h2>
                    <p>Lorem Ipsum is simply dummy text </p>
                    </div>
                    <div className="about-content">
                    <p>
                        It is a long established fact that a reader will be distracted
                        by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum.
                    </p>
                    <p>
                        web page editors now use Lorem Ipsum as their default model
                        text, and a search for 'lorem ipsum' will uncover many web sites
                        still in their infancy. Various versions have evolved over the
                        years, sometimes
                    </p>
                    <a href="#">Read More..</a>
                    </div>
                </div>
                <div className="col-lg-8 doctor-slider slider">
                    <Slider {...settings}>
                    {/* <!-- Doctor Widget --> */}
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
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
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
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
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
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
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
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
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
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
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
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
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
                    {/* <!-- /Doctor Widget --> */}

                    {/* <!-- Doctor Widget --> */}
                    <div className="profile-widget">
                        <div className="doc-img">
                        <Link to="/coach-profile">
                            <img
                            className="img-fluid"
                            alt="User Image"
                            src="assets/img/doctors/doctor-08.jpg"
                            />
                        </Link>
                        <a href="#" className="fav-btn">
                            <i className="far fa-bookmark"></i>
                        </a>
                        </div>
                        <div className="pro-content">
                        <h3 className="title">
                            <Link to="/coach-profile">Paul Richard</Link>
                            <i className="fas fa-check-circle verified"></i>
                        </h3>
                        <p className="speciality">
                            MBBS, MD - Dermatology , Venereology & Lepros
                        </p>
                        <div className="rating">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">(49)</span>
                        </div>
                        <ul className="available-info">
                            <li>
                            <i className="fas fa-map-marker-alt"></i> California, USA
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
                    {/* <!-- Doctor Widget --> */}
                    </Slider>
                </div>
                </div>
            </div>
        </section>

    </>;
}
