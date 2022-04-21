import { useEffect, useRef, useState } from "react";

import { Tabs, Tab } from "react-bootstrap";
import CoachCalendar from "../Calendar/CoachCalendar";
import ClientCalendar from "../Calendar/ClientCalendar";
import ContactDetails from "./ContactDetails";
import BasicInfo from "./BasicInfo";
import ReferenceLink from "./ReferenceLink";

const CoachProfileSetting = () => {
  const [key, setKey] = useState("user-info");
  return (
    <>
      <div className="col-md-7 col-lg-8 col-xl-9">
        <div className="card">
          <div className="card-body pt-0 user-tabs mb-4">
            <Tabs
              id="controlled-tab-example"
              className="nav-tabs-bottom nav-justified"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="user-info" title="Basic">
                <BasicInfo />
              </Tab>
              <Tab eventKey="availability" title="Availability">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Trainer Schedule</h4>
                    <div className="row form-row">
                      {" "}
                      <CoachCalendar availabilityTab={key} />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="refLink" title="Reference Link">
                <ReferenceLink copyText={"www.google.com"} />
              </Tab>
              <Tab eventKey="contact" title="Contact Details">
                <ContactDetails />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoachProfileSetting;
