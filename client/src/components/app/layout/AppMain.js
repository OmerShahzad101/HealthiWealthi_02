import RouterConfig from "./RouterConfig";
import BreadCrumb from "./navbar/BreadCrumb";
import CoachSideBar from "./sidebar/CoachSideBar";
import ClientSideBar from "./sidebar/ClientSideBar";
import { useSelector } from "react-redux";
export default function AppMain(props) {
 const role = useSelector(state=>state.auth.userRole);
//  console.log('role',role)
  let content = (
    <>
      <BreadCrumb  name={props}/>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {
              role == '1' ?  <ClientSideBar/> : <CoachSideBar />
            }
            <RouterConfig />
          </div>
        </div>
      </div>
    </>
  );

  return content;
}
