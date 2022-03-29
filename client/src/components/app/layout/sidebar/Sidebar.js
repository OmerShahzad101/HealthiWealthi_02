// import { Children } from "react";
// import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { Tooltip, OverlayTrigger } from "react-bootstrap";
// import {
//   FiDollarSign,
//   FiPieChart,
//   FiSettings,
//   FiHome,
//   FiUser,
//   FiAward,
//   FiTarget,
// } from "react-icons/fi";

// import { BsArrowBarLeft, BsQuestionCircle } from "react-icons/bs";
// import { HiOutlineX } from "react-icons/hi";
// import { AiOutlineStar } from "react-icons/ai";

// import {
//   MdOutlineGroupWork,
//   MdOutlineFormatListBulleted,
// } from "react-icons/md";
// import { BiBuildings } from "react-icons/bi";
// import classNames from "classnames";

// import {
//   APP,
//   DASHBOARD,
//   NEW_WORK_FLOW,
//   USERS,
//   TEMPLATE,
//   SETTINGS,
//   DOCUMENT,
//   CREATE_NEW_Template,
// } from "../../../../router/constants/ROUTES";
// import userHasPermission from "../../../../utils/auth/userHasPermission";

// import Logo from "../../../.././../src/assets/images/header-logo-img.png";
// import imagePath from "../../../../utils/url/imagePath";

// // import './Sidebar.scss';

// const sidebarItems = [
//   {
//     title: "Dashboard",
//     icon: <FiHome color="#ACACAE" />,
//     iconActive: <FiHome color="#64CC64" />,
//     iconActiveCollapsed: <FiHome color="#64CC64" />,
//     path: DASHBOARD,
//     permission: "view-dashboard",
//   },
//   {
//     title: "New Workflow",
//     icon: <MdOutlineFormatListBulleted color="#ACACAE" />,
//     iconActive: <MdOutlineFormatListBulleted color="#64CC64" />,
//     iconActiveCollapsed: <MdOutlineFormatListBulleted color="#64CC64" />,
//     path: NEW_WORK_FLOW,
//     permission: "create-workflow",
//   },
//   {
//     title: "Template",
//     icon: <BiBuildings color="#ACACAE" />,
//     iconActive: <BiBuildings color="#64CC64" />,
//     iconActiveCollapsed: <BiBuildings color="#64CC64" />,
//     path: TEMPLATE,
//     permission: "view-all-template-listing",
//     subPath: [
//       {
//         title: "Create Template",
//         icon: <BiBuildings color="#ACACAE" />,
//         iconActive: <BiBuildings color="#64CC64" />,
//         iconActiveCollapsed: <BiBuildings color="#64CC64" />,
//         path: CREATE_NEW_Template,
//         permission: "view-all-template-listing",
//       },
//       {
//         title: "Template Listing",
//         icon: <BiBuildings color="#ACACAE" />,
//         iconActive: <BiBuildings color="#64CC64" />,
//         iconActiveCollapsed: <BiBuildings color="#64CC64" />,
//         path: TEMPLATE,
//         permission: "view-all-template-listing",
//       },
//     ],
//   },
//   {
//     title: "Document",
//     icon: <MdOutlineGroupWork color="#ACACAE" />,
//     iconActive: <MdOutlineGroupWork color="#64CC64" />,
//     iconActiveCollapsed: <MdOutlineGroupWork color="#64CC64" />,
//     path: `${DOCUMENT}`,
//     permission: "view-document-listing",
//     subPath: [
//       {
//         title: "All",
//         icon: <BiBuildings color="#ACACAE" />,
//         iconActive: <BiBuildings color="#64CC64" />,
//         iconActiveCollapsed: <BiBuildings color="#64CC64" />,
//         path: `${DOCUMENT}?type=all`,
//         permission: "view-document-listing",
//       },
//       {
//         title: "In Progress",
//         icon: <BiBuildings color="#ACACAE" />,
//         iconActive: <BiBuildings color="#64CC64" />,
//         iconActiveCollapsed: <BiBuildings color="#64CC64" />,
//         path: `${DOCUMENT}?type=inprogress`,
//         permission: "view-document-listing",
//       },
//       {
//         title: "Signed",
//         icon: <BiBuildings color="#ACACAE" />,
//         iconActive: <BiBuildings color="#64CC64" />,
//         iconActiveCollapsed: <BiBuildings color="#64CC64" />,
//         path: `${DOCUMENT}?type=signed`,
//         permission: "view-document-listing",
//       },
//     ],
//   },
//   {
//     title: "Users",
//     icon: <FiUser color="#ACACAE" />,
//     iconActive: <FiUser color="#64CC64" />,
//     iconActiveCollapsed: <FiUser color="#64CC64" />,
//     path: USERS,
//     permission: "view-company-users-listing",
//   },
//   {
//     title: "Settings",
//     icon: <FiSettings color="#ACACAE" />,
//     iconActive: <FiSettings color="#64CC64" />,
//     iconActiveCollapsed: <FiSettings color="#64CC64" />,
//     path: SETTINGS,
//   },
// ];

// export default function Sidebar({ isCollapsed }) {
//   const { pathname } = useLocation();
//   const company = useSelector((state) => state.user.company);

//   console.log(pathname);

//   return (
//     <>
//       <div className="sidebar">
//         <div className="logo">
//           <Link to={APP}>
//             {company && company.avatar ? (
//               <img src={imagePath(company.avatar)} alt="Logo" />
//             ) : (
//               <img src={Logo} alt="Logo" />
//             )}
//           </Link>
//           {/* <img src="images/logo-white.svg" className="img-fluid" alt="logo" /> */}
//         </div>
//         <ul>
//           {Children.toArray(
//             sidebarItems
//               // filter links for which user has permission to access
//               .filter((link) =>
//                 "permission" in link ? userHasPermission(link.permission) : true
//               )
//               .map((item) => {
//                 let navIcon = item.icon;
//                 if (pathname === item.path) {
//                   navIcon = item.iconActive;
//                 }
//                 if (isCollapsed && pathname.startsWith(item.path)) {
//                   navIcon = item.iconActiveCollapsed;
//                 }

//                 return (
//                   <li
//                     className={classNames({
//                       active: pathname.startsWith(item.path),
//                     })}
//                   >
//                     <Link to={item.path}>
//                       <span className="icon">{navIcon}</span>{" "}
//                       <span className="m-0">{item.title}</span>
//                     </Link>
//                     {item.subPath && item.subPath.length > 0 && (
//                       <ul>
//                         {item.subPath.map((item2) => (
//                           <li key={item2.title}>
//                             <Link to={item2.path}>
//                               <span className="icon">
//                                 {pathname === item2.path
//                                   ? item2.iconActive
//                                   : item2.icon}
//                               </span>
//                               <span className="m-0">{item2.title}</span>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 );
//               })
//           )}
//         </ul>
//       </div>
//     </>
//   );
// }
