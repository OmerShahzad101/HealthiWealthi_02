import { Link } from 'react-router-dom';

import Logo from '../common/logo/Logo';
import { Form, Container, Nav, Navbar } from 'react-bootstrap';

import { LOGIN, SIGNUP } from '../../../router/constants/ROUTES';

import './header.scss';

export default function Header() {
    return (
        <>
            {/* <header className="header">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <img src="images/logo.svg" className="img-fluid" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse header-list" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About Us</a>
                                </li>
                                <li className="nav-item dropdown header-dropdown">
                                    <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Product
                                        <i className="fa fa-angle-down dd-icons"></i>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown header-dropdown">
                                    <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Pricing
                                        <i className="fa fa-angle-down dd-icons"></i>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown header-dropdown">
                                    <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        API
                                        <i className="fa fa-angle-down dd-icons"></i>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Signup</a>
                                </li>
                            </ul>
                            <div className="header-buttons">
                                <button className="blue-btn" type="submit">Login</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header> */}

            <header className="header">
                <Navbar expand="lg" className="customNav">
                    <Container>
                        <Navbar.Brand>
                            <Logo />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className="header-list">
                            <Nav className="navLinks me-5 my-2 my-lg-0" navbarScroll>
                                <Nav.Link className="dg-mr-60" href="#action1">
                                    Home
                                </Nav.Link>
                                {/* <Nav.Link className="dg-mr-60" href="#action1">
                                    About us
                                </Nav.Link>
                                <Nav.Link className="dg-mr-60" href="#action1">
                                    Products
                                </Nav.Link>
                                <Nav.Link className="dg-mr-60" href="#action1">
                                    Pricing
                                </Nav.Link>
                                <Nav.Link className="dg-mr-60" href="#action1">
                                    API
                                </Nav.Link>
                                <Nav.Link className="dg-mr-60" href="#action1">
                                    Contact
                                </Nav.Link> */}
                                <Nav.Link className="dg-mr-60"  href="/signup">
                                    Signup
                                </Nav.Link>

                            </Nav>
                            <div className="header-buttons">
                                <a href="/login" className="blue-btn" type="submit">Login</a>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}
