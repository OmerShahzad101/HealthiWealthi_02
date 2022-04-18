import React from "react";

const Pricing = () => {
  return (
    <div className="container my-5">
      <div className="text-center">
        <h2>Choose from a range of flexible pricing options.</h2>
        <p className="my-3">It’s risk-free with no hidden cost.</p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="plan  ">
            <div className="plan-inner">
              <div className="entry-title">
                <h3>Free Trail</h3>
                <div className="price">
                  £6<span>/per month</span>
                </div>
              </div>
              <div className="entry-content">
                <ul>
                  <li>
                    <strong>Unlimited</strong> Documents per month
                  </li>
                  <li>
                    <strong>0</strong> Sender(s)
                  </li>
                  <li>
                    <strong>10</strong> Templates
                  </li>
                  <li>
                    <span className="status success">
                      {/* <img src="" /> */}
                    </span>{" "}
                    eSignMarketing
                  </li>
                  <li>
                    <strong>Unlimited</strong> Documents per month
                  </li>
                  <li>
                    <strong>Unlimited</strong> Sender(s)
                  </li>
                  <li>
                    <strong>Unlimited</strong> Templates
                  </li>
                  <li>
                    <span className="status success">qwertyuiop</span>{" "}
                    eSignMarketing
                  </li>
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
      </div>
    </div>
  );
};

export default Pricing;
