import { useState } from 'react';
import { Redirect, useLocation } from 'react-router';

import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import RouterConfig from './RouterConfig';

import { LOGIN } from '../../../router/constants/ROUTES';

import validateAuthState from '../../../utils/auth/validateAuthState';

export default function AppMain(props) {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSidebarTransformed, setIsSidebarTransformed] = useState(false);
    const isAuthenticated = validateAuthState();

    const sidebarCollapseHandler = () => {
        setIsCollapsed((prevState) => {
            return !prevState;
        });
    };

    const toggleSidebarTransformHandler = () => {
        setIsSidebarTransformed((prevState) => {
            return !prevState;
        });
    };

    let content = (
        <div className="wrapper">
            <Sidebar toggleSidebar={sidebarCollapseHandler} isCollapsed={isCollapsed} isSidebarTransformed={isSidebarTransformed} transformSidebar={setIsSidebarTransformed.bind(null, false)} />
            <div className="content-area">
                <Navbar toggleSidebarTransform={toggleSidebarTransformHandler} isTransformed={isSidebarTransformed} />
                <RouterConfig />
            </div>
        </div>
        // <section id="main">
        //     <div className="container-fluid">
        //         <div className="row">
        //             <div className="col-md-2 col-12">
        //             <Sidebar toggleSidebar={sidebarCollapseHandler} isCollapsed={isCollapsed} isSidebarTransformed={isSidebarTransformed} transformSidebar={setIsSidebarTransformed.bind(null, false)} />
        //             </div>
        //             <div className="col-md-10 col-12">
        //             <Navbar toggleSidebarTransform={toggleSidebarTransformHandler} isTransformed={isSidebarTransformed} />
        //             <RouterConfig />
        //             </div>
        //         </div>
        //     </div>    
        // </section>
    );

    // if (!isAuthenticated) {
    //     content = <Redirect to={{ pathname: LOGIN, state: { location } }} />;
    // }

    return content;
}
