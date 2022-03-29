import RouterConfig from "./RouterConfig";
import BreadCrumb from "./navbar/BreadCrumb";
import CoachSideBar from "./sidebar/CoachSideBar";

export default function AppMain(props) {
  let content = (
    <>
      <BreadCrumb />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <CoachSideBar />
            <RouterConfig />
          </div>
        </div>
      </div>
    </>
  );

  return content;
}
