// import { Button, Dropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// import logout from "../../../../utils/auth/logout";
// import imagePath from "../../../../utils/url/imagePath";
// import { SETTINGS_USER_PROFILE } from "../../../../router/constants/ROUTES";

// import Bell from "../../../../../src/assets/images/bell.svg";

// import { GoChevronDown } from "react-icons/go";
// import { AiOutlineSetting } from "react-icons/ai";
// import { MdOutlinePowerSettingsNew } from "react-icons/md";
// import { HiMenuAlt1 } from "react-icons/hi";
// import "./Navbar.scss";

// export default function Navbar({ toggleSidebarTransform }) {
//     const userInfo = useSelector((state) => state.user.info);
//     const userRole = useSelector((state) => state.auth.userRole);

//     return (
//         <>
//             <div className="top-bar">
//                 <div className="title">
//                     <h1>Dashboard</h1>
//                 </div>
//                 <div className="right-elements">
//                     <div className="notification">
//                         <div className="icon">
//                         <img src={Bell} alt="Bell icon" className="bell" />
//                         </div>
//                     </div>
//                     <div className="search-wrapper">
//                         <input type="text" name="search" className="form-control" />
//                     </div>
//                     <div className="user-info">
//                         <Dropdown>
//                             <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
//                                 <div className="profile-wrap d-flex align-items-center dg-ml-12">
//                                     <div className="profile-pic-wrap">{userInfo && <img src={imagePath(userInfo.avatar)} alt="Profile pic" />}</div>

//                                     <div className="name dg-ml-10">
//                                         <p className="mb-0 p-0">{userInfo?.userName || ''}</p>
//                                         <span className="designation d-flex">{userRole}</span>
//                                     </div>
//                                     <span className="dg-pl-2 dg-pb-18">
//                                         <GoChevronDown />
//                                     </span>
//                                 </div>
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu variant="dark">
//                                 <Dropdown.Item as={Link} to={SETTINGS_USER_PROFILE} className="d-flex align-items-center">
//                                     <AiOutlineSetting />
//                                     Settings
//                                 </Dropdown.Item>

//                                 <Dropdown.Item  onClick={logout}>
//                                     <MdOutlinePowerSettingsNew />
//                                     Logout
//                                 </Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </div>
//                 </div>
//             </div>
//             {/* <div className="navbar-wrapper d-flex justify-content-between">
//                 <div>
//                     <div className="hamburger" onClick={toggleSidebarTransform}>
//                         <HiMenuAlt1 />
//                     </div>
//                 </div>

//                 <div className="d-flex justify-content-center align-items-center">

//                     <div className="bell-icon dg-ml-12 pulse">
//                         <img src={Bell} alt="Bell icon" className="bell" />
//                     </div>

//                     <Dropdown className="d-flex justify-content-center align-items-center">
//                         <div className="d-flex">
//                             <Dropdown.Toggle id="dropdown-basic" className="profile-dropdown">
//                                 <div className="profile-wrap d-flex align-items-center dg-ml-12">
//                                     <div className="profile-pic-wrap">{userInfo && <img src={imagePath(userInfo.avatar)} alt="Profile pic" />}</div>

//                                     <div className="name dg-ml-10">
//                                         <p className="mb-0 p-0">{userInfo?.userName || ''}</p>
//                                         <span className="designation d-flex">{userRole}</span>
//                                     </div>
//                                     <span className="dg-pl-2 dg-pb-18">
//                                         <GoChevronDown />
//                                     </span>
//                                 </div>
//                             </Dropdown.Toggle>
//                         </div>

//                         <Dropdown.Menu>
//                             <div className="d-flex flex-column custom-menu justify-content-center align-items-center">
//                                 <Dropdown.Item as={Link} to={SETTINGS_USER_PROFILE} className="d-flex align-items-center">
//                                     <AiOutlineSetting />
//                                     Settings
//                                 </Dropdown.Item>

//                                 <Dropdown.Item as={Button} onClick={logout}>
//                                     <MdOutlinePowerSettingsNew />
//                                     Logout
//                                 </Dropdown.Item>
//                             </div>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </div>
//             </div> */}
//         </>
//     );
// }
