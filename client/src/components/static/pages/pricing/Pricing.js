import React, { useEffect, useState } from "react";
import { getHttpRequest } from "../../../../axios";

const Pricing = () => {
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
      <div className="row">
        {membership && membership.length > 0 ? (
          membership.map((item, idx) => {
            return (
              <>
                <div className="col-md-4">
                  <div className="plan  ">
                    <div className="plan-inner">
                      <div className="entry-title">
                        <h3>{item.title}</h3>
                        <div className="price">
                          £6<span>/{item.period} days</span>
                        </div>
                      </div>
                      <div className="entry-content">
                        <ul>
                          <li><strong>level:</strong>&nbsp;{item.level}</li>
                          <li><strong>Consultations:</strong>&nbsp;{item.consultations} </li>
                          <li><strong>Gorup Coaching:</strong>&nbsp;{item.groupCoaching}</li>
                          <li><strong>Micro Habit Lifestyle:</strong>&nbsp;{item.microHabitLifestyle}</li>
                          <li><strong>Personal CoachChat: </strong>&nbsp;{item.personalCoachChat} </li>
                          <li><strong>Root Cause HealthCoaching:</strong>&nbsp;{item.rootCauseHealthCoaching} </li>
                        </ul>
                      </div>
                      <div>
                        <div className="btnSpace"></div>
                        <div className="freelink"> </div>
                        <div className="btnSpace"></div>
                        <div className="btnSpace"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="no_data">
            <span>No Coaches found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
