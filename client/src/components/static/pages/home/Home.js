import { Dropdown, Badge, Table } from 'react-bootstrap'
import Header from '../../layout/Header'
export default function Home() {
    return <>
        <div className="main-wrapper">

          <Header/>

            <div className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="main-content">
                                <h1>Embrace the Power of eSignatures...</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                                <button className="blue-btn">Get Started</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="main-image">
                                <img src="images/main-image.png" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="read-more section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="read-more-content">
                                <div className="read-more-content-icon">
                                    <img src="images/read-one-icon.svg" className="img-fluid" />
                                </div>
                                <h2>eSign Api</h2>
                                <p>We aim to attain the greatest satisfaction for our clients and be one of the prominent names when it comes to world-class service</p>
                                <div className="read-more-link">
                                    <a href="#" className="d-flex align-items-center">
                                        Read more
                                        <div className="arrow-right">
                                            <img src="images/arrow-right.svg" className="img-fluid" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="read-more-content">
                                <div className="read-more-content-icon">
                                    <img src="images/read-two-icon.svg" className="img-fluid" />
                                </div>
                                <h2>eSign Solution</h2>
                                <p>We aim to attain the greatest satisfaction for our clients and be one of the prominent names when it comes to world-class service</p>
                                <div className="read-more-link">
                                    <a href="#" className="d-flex align-items-center">
                                        Read more
                                        <div className="arrow-right">
                                            <img src="images/arrow-right.svg" className="img-fluid" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="read-more-content">
                                <div className="read-more-content-icon">
                                    <img src="images/read-three-icon.svg" className="img-fluid" />
                                </div>
                                <h2>Panda Workers</h2>
                                <p>We aim to attain the greatest satisfaction for our clients and be one of the prominent names when it comes to world-class service</p>
                                <div className="read-more-link">
                                    <a href="#" className="d-flex align-items-center">
                                        Read more
                                        <div className="arrow-right">
                                            <img src="images/arrow-right.svg" className="img-fluid" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="years-experience section-padding">
                <div className="container">
                    <div className="row row-margin">
                        <div className="col-md-6">
                            <div className="years-experience-content experience-padding">
                                <h2>The energy of a start-up combined with 30 years of experience</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="years-experience-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, mattis purus. Vivamus commodo suscipit tellus et pellentesque.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="years-experience-rating-content">
                                <h3>15+</h3>
                                <h5>Awards received</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscin. Curabitur sit amet eros elit et.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="years-experience-rating-content">
                                <h3>500+</h3>
                                <h5>Clients served</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscin. Curabitur sit amet eros elit et.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="years-experience-rating-content">
                                <h3>34</h3>
                                <h5>Employees</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscin. Curabitur sit amet eros elit et.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="years-experience-rating-content">
                                <h3>130+</h3>
                                <h5>Custom solutions</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscin. Curabitur sit amet eros elit et.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="our-expertise section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="our-expertise-content">
                                <h6>Our expertise</h6>
                                <h2>Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore </h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="our-expertise-content-image d-flex justify-content-end">
                                <img src="images/our-expertise-img.png" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="our-clients">
                <div className="container">
                    <div className="our-clients-heading text-center">
                        <h4>Our Clients</h4>
                    </div>
                    <div className="owl-carousel owl-theme">
                        <div className="item">
                            <div className="logos">
                                <img src="images/google.png" className="img-fluid" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="logos">
                                <img src="images/tokopedia.png" className="img-fluid" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="logos">
                                <img src="images/upwork.png" className="img-fluid" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="logos">
                                <img src="images/microsoft.png" className="img-fluid" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="logos">
                                <img src="images/shopify.png" className="img-fluid" />
                            </div>
                        </div>
                        <div className="item">
                            <div className="logos">
                                <img src="images/stripe.png" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="be-ready">
                <div className="container">
                    <div className="be-ready-bg">
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="be-ready-content">
                                    <h6>be ready to get more</h6>
                                    <h2>Get legally-binding signatures now!</h2>
                                    <form className="mb-0">
                                        <div className="be-ready-input">
                                            <input type="email" className="form-control" id="exampleInputEmail1"
                                                aria-describedby="emailHelp" placeholder="Enter email" />
                                        </div>
                                        <button type="submit" className="subscribe-btn">Subscribe now</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="be-ready-image d-flex justify-content-end">
                                    <img src="images/be-ready-image.png" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="container">
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="footer-links-content">
                                    <h6>Company</h6>
                                    <ul className="list footer-list p-0">
                                        <a href=""><li className="list-item">Home</li></a>
                                        <a href=""><li className="list-item">About Us</li></a>
                                        <a href=""><li className="list-item">Contact Us</li></a>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="footer-links-content">
                                    <h6>Newsroom</h6>
                                    <ul className="list footer-list p-0">
                                        <a href=""><li className="list-item">Blog</li></a>
                                        <a href=""><li className="list-item">Events</li></a>
                                        <a href=""><li className="list-item">Privacy Policy</li></a>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="footer-links-content">
                                    <h6>Legal</h6>
                                    <ul className="list footer-list p-0">
                                        <a href=""><li className="list-item">License</li></a>
                                        <a href=""><li className="list-item">Privacy Policy</li></a>
                                        <a href=""><li className="list-item">Terms and Conditions</li></a>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="footer-links-content">
                                    <h6>Get in touch</h6>
                                    <ul className="list footer-list p-0">
                                        <li className="list-item">Office Location: 19 Tai Seng Avenue #05-01 Singapore 534054</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="row">
                            <div className="col-md-4 d-flex align-items-center">
                                <div className="copyright-content">
                                    <p>Copyright 2020.com, All rights reserved.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="footer-logo text-center">
                                    <img src="images/logo.svg" className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="footer-social-icons d-flex align-items-center justify-content-end">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>;
}
