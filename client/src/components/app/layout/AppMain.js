import RouterConfig from "./RouterConfig";
import BreadCrumb from "./navbar/BreadCrumb";
import CoachSideBar from "./sidebar/CoachSideBar";
import ClientSideBar from "./sidebar/ClientSideBar";
import { useSelector } from "react-redux";
export default function AppMain(props) {
 const role = useSelector(state=>state.auth.userRole);
 console.log('role',role)
  let content = (
    <>
      <BreadCrumb />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {
              role === 'client' ?  <ClientSideBar/> : <CoachSideBar />
            }
            <RouterConfig />
          </div>
        </div>
      </div>
    </>
  );

  return content;
}
