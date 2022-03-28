import { React, useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { BsArrowDownCircle } from "react-icons/bs";
import { useHistory, useLocation } from "react-router-dom";

import InviteModel from "./inviteModal/InviteModal";


import Invite from "../../../../../assets/images/Invite.svg";

import styles from "./employeeData.module.scss";
import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
} from "../../../../../axios";

const EmployeeData = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [showImport, setShowImport] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showGustoCompany, setShowGustoCompany] = useState(false);

  const [gustoCompanyData, setGustoCompanyData] = useState([]);
  const [gustoSyncObj, setGustoSyncObj] = useState("");

  const handleCloseImport = () => setShowImport(false);
  const handleShowImport = () => setShowImport(true);

  const handleCloseInvite = () => setShowInvite(false);
  const handleShowInvite = () => setShowInvite(true);
  const handleShowGustoCompany = () => setShowGustoCompany(false);

  useEffect(() => {
    return cancelOngoingHttpRequest;
  }, []);

  return (
    <div className={`${styles.employeeDataWrapper}`}>
      <div className="dg-mb-24">
        <h3 className="dg-mb-6">Employee Data</h3>
        <p>Import and manage employee data</p>
      </div>

      <div className={`${styles.importBtnWrap}`}>
        <div></div>
        <div>
          <Button
            variant="primary"
            size="lg"
            className={`${styles.gustoBtn} `}
            onClick={handleShowImport}
          >
            <div>
              <div>
                {/* <img className="img-fluid" src={Csv} alt="CSV logo" /> */}
              </div>
              <div
                className={`${styles.importText} d-flex align-items-center justify-content-center dg-mt-68`}
              >
                <BsArrowDownCircle />{" "}
                <span className="dg-ml-8">Import using .csv</span>
              </div>
            </div>
          </Button>
        </div>
        <div>
          <Button
            variant="primary"
            size="lg"
            className={`${styles.gustoBtn}  `}
            onClick={handleShowInvite}
          >
            <div>
              <div>
                <img className="img-fluid" src={Invite} alt="Invite logo" />
              </div>
              <div
                className={`${styles.importText} d-flex align-items-center justify-content-center dg-mt-68`}
              >
                <span>Invite Individual</span>
              </div>
            </div>
          </Button>
        </div>
      </div>

      <div className="modal-wrap">
        <InviteModel
          showInvite={showInvite}
          handleCloseInvite={handleCloseInvite}
        />
      </div>
    </div>
  );
};

export default EmployeeData;
