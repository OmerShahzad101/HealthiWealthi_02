import RouterConfig from "./RouterConfig";
import BreadCrumb from "./navbar/BreadCrumb";
import CoachSideBar from "./sidebar/CoachSideBar";
import ClientSideBar from "./sidebar/ClientSideBar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AppMain(props) {
  const role = useSelector((state) => state.auth.user.userRole);
  let history = useHistory();
  //  console.log('role',role)
  let content = (
    <>
      <BreadCrumb name={props} />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {/* <CoachSideBar /> */}
            {role == "1" ? (
              <ClientSideBar />
            ) : role == "3" ? (
              <CoachSideBar />
            ) : (
              history.push("/")
            )}
            <RouterConfig />
          </div>
        </div>
      </div>
    </>
  );

  return content;
}
