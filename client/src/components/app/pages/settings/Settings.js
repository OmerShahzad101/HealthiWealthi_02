import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, Tab, Nav } from "react-bootstrap";
import getRouteConfigs from "../../../../router/configs/settings.routes";
import generateRoutesFromConfig from "../../../../router/utils/generateRoutesFromConfig";
import { useSelector, useDispatch } from 'react-redux';


import UserProfile from './userProfile/UserProfile';
import CompanyProfile from './companyProfile/CompanyProfile';

const Settings = () => {
  const { pathname } = useLocation();
  const userInfo = useSelector((state) => state.user.info);

  const configs = useMemo(getRouteConfigs, []);
  const settingRoutes = useMemo(
    () => generateRoutesFromConfig(configs),
    [configs]
  );

  return (
    <div className="main-content">
      <div className="settings-wrapper">
        <div className="links-wrapper">
          <div className="main-content isPadding">
            <div className="company-management-wrapper isPaddingSmall">
              <div className="users-tabs">

                <Tab.Container id="left-tabs-example" defaultActiveKey="user">
                  <div className="custom-listing-header">
                    <div className="title">Settings</div>
                    <Nav className="">
                      <Nav.Item>
                        <Nav.Link eventKey="user">User Profile</Nav.Link>
                      </Nav.Item>
                    {userInfo.role !== "300"?
                      <Nav.Item>
                        <Nav.Link eventKey="company">Company Profile</Nav.Link>
                      </Nav.Item>: ""

                    }
                    </Nav>
                  </div>
                  <div className="custom-listing-wrapper">

                    <Tab.Content>
                      <Tab.Pane eventKey="user">
                        <UserProfile />
                      </Tab.Pane>
                      <Tab.Pane eventKey="company">
                        <CompanyProfile />
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
                {/* <Tabs
                  defaultActiveKey="userprofile"
                  id="uncontrolled-tab-example"
                  className="dg-mb-16"
                >
                  <Tab eventKey="userprofile" title='User Profile'>
                    <div className="custom-listing-wrapper">
                        <UserProfile />
                    </div>
                  </Tab>

                  <Tab eventKey="companyprofile" title="Company Profile">
                    <div className="custom-listing-wrapper">
                        <CompanyProfile />
                    </div>
                  </Tab>
                </Tabs> */}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
