import React, { useEffect, useState } from "react";
import { getHttpRequest } from "../../../../axios";
import { Tabs, Tab } from "react-bootstrap";
import MembershipCard from "./MembershipCard";

const Pricing = () => {
  const [key, setKey] = useState("personal");
  const [membership, setMembership] = useState();

  useEffect(() => {
    getHttpRequest("/admin/membership/list")
      .then((response) => {
        console.log(response);
        setMembership(response?.data?.data?.membershipList);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center">
        <h2>Choose from a range of flexible pricing options.</h2>
        <p className="my-3">It’s risk-free with no hidden cost.</p>
      </div>
      <div className="row user-tabs">
        <Tabs
          id="controlled-tab-example"
          className="nav-tabs-bottom nav-justified"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="personal" title="Personal">
            <MembershipCard type={key} membership={membership} />
          </Tab>
          <Tab eventKey="family" title="Family">
            <MembershipCard type={key} membership={membership} />
          </Tab>
          <Tab eventKey="team" title="Team">
            <MembershipCard type={key} membership={membership} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Pricing;
