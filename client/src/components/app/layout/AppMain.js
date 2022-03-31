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
      <BreadCrumb  name={props}/>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
<<<<<<< HEAD
            <CoachSideBar />
            {/* <ClientSideBar/> */}
=======
            {
              role === 'client' ?  <ClientSideBar/> : <CoachSideBar />
            }
>>>>>>> f220ddc39f8e92125fcce5996d1c6b80191fff53
            <RouterConfig />
          </div>
        </div>
      </div>
    </>
  );

  return content;
}
