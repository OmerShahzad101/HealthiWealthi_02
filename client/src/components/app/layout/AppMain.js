import RouterConfig from "./RouterConfig";
import BreadCrumb from "./navbar/BreadCrumb";
import CoachSideBar from "./sidebar/CoachSideBar";
import ClientSideBar from "./sidebar/ClientSideBar";

export default function AppMain(props) {
  let content = (
    <>
      <BreadCrumb  name={props}/>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {/* <CoachSideBar /> */}
            <ClientSideBar/>
            <RouterConfig />
          </div>
        </div>
      </div>
    </>
  );

  return content;
}
