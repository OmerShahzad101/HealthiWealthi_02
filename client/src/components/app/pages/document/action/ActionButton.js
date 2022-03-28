import { useState } from "react";
import Swal from "sweetalert2";

import { IoDocumentTextOutline } from "react-icons/io5";

import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

import { postHttpRequest } from "../../../../../axios";

const ActionBtn = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  function toggleCompanyStatus() {
    let title = "Delete Document";
    let confirmButtonText = "Delete";
    let text = "Are you sure you want to Delete this Document?";

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

        postHttpRequest(`/document/delete/${props.id}`)
          .then((response) => {
            if (!response) {
              console.log("Something went wrong with response...");
              return;
            }

            if (response.data?.success === true) {
              props.updateListingData();
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
      <div className={"edit"}>
        {props.status === "inprogress" ? (
          <a target="_blank" href={`/sign-document/${props.id}`}>
            {" "}
            <IoDocumentTextOutline />{" "}
          </a>
        ) : (
          <>
            <a target="_blank" href={`/sign-document/${props.id}`}>
              {" "}
              <IoDocumentTextOutline />{" "}
            </a>
            <a
              target="blank"
              href={`https://netrust-solution-bucket.s3.ap-southeast-1.amazonaws.com/${props.id}.pdf`}
            >
              <AiOutlineEye />
            </a>
          </>
        )}
      </div>

      <div className="delete" onClick={toggleCompanyStatus}>
        <AiFillDelete />
      </div>
    </div>
  );
};

export default ActionBtn;
