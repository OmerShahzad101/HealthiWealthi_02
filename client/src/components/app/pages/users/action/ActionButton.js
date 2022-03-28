import { useState } from "react";
import Swal from "sweetalert2";

import { AiFillDelete } from "react-icons/ai";

import { postHttpRequest } from "../../../../../axios";

import EditUser from "../editUser/editUser";

const ActionBtn = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  function toggleCompanyStatus() {
    let title = "User Document";
    let confirmButtonText = "Delete";
    let text = "Are you sure you want to Delete this User?";

    Swal.fire({
      title,
      text,
      confirmButtonText,
      denyButtonText: `Cancel`,
      showDenyButton: true,
      padding: "16px 30px",
      width: "530px",
      customClass: {
        denyButton: "deny-class",
        confirmButton: "confirm-class",
        title: "title",
        htmlContainer: "custom-modals",
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setIsLoading(true);

        postHttpRequest(`/user/delete/${props.row._id}`)
          .then((response) => {
            if (!response) {
              console.log("Something went wrong with response...");
              return;
            }

            if (response.data?.success === true) {
              props.getUserList();
              // window.location.reload(); // TEMPORARY
            }
          })
          .finally(() => {
            setIsLoading(false);
          });

        Swal.fire({
          title: "Updated",
          icon: "success",
          customClass: {
            confirmButton: "btn-primary",
          },
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not Trigger", "", "info");
      }
    });
  }

  return (
    <div className={"acions-btns"}>
      
      <EditUser className={"edit"} user={props.row}   getUserList={props.getUserList}/>

      <div className="delete" onClick={toggleCompanyStatus}>
        <AiFillDelete />
      </div>
    </div>
  );
};

export default ActionBtn;
