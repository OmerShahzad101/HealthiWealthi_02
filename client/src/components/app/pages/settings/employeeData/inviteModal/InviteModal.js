import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, FloatingLabel, Form, Spinner } from "react-bootstrap";

import Toast from "../../../../../common/toast/Toast";
import SelectDropdown from "../../../../../common/react-select/SelectDropdown/SelectDropdown";
import {
  cancelOngoingHttpRequest,
  postHttpRequest,
} from "../../../../../../axios";
import validate from "../../../../../../utils/form-validation/authFormValidation";

const initialFormData = {
  userName: "",
  email: "",
};

const employeeTypes = [
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
];

export const InviteModal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, updateForm] = useState({ ...initialFormData });
  const [validationErrors, setValidationErrors] = useState({});
  const userData = useSelector((state) => state.user.info);

  const nextRole = userData.role === "300" ? "302" : "301";
 
  const [type, setType] = useState(nextRole);

  const [allowWorkFlow, setAllowWorkFlow] = useState(false);
  const [allowTemplate, setAllowTemplate] = useState(false);
  const [allowDocument, setAllowDocument] = useState(false);
  const [allowUser, setAllowUser] = useState(false);
  const [allowCompany, setAllowCompany] = useState(false);

  // Cancel company creation HTTP call in case component is unmounted due to route change
  useEffect(() => {
    return cancelOngoingHttpRequest;
  }, []);

  // Cancel company creation HTTP call in case component is unmounted due to route change
  useEffect(() => {
    updateForm({ ...initialFormData });
  }, [props]);

  function updateFormHandler(name, value) {
    updateForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function inputChangedHandler(event) {
    // Get name of changed input, and its corresponding value
    const { name, value } = event.target;

    // Update form state against the target input field
    updateFormHandler(name, value);
  }

  function selectInputChangedHandler(newValue, actionMeta) {
    // Get name of changed select input, and its corresponding current value
    const { name } = actionMeta;
    let value = null;

    if (name === "department") {
      value = newValue._id;
    } else {
      value = newValue.value;
    }

    // Update form state against the target select input
    updateFormHandler(name, value);
  }

  function InviteHandler(event) {
    event.preventDefault();

    const formData = {...form};

    formData.allowWorkFlow = allowWorkFlow;
    formData.allowTemplate = allowTemplate;
    formData.allowDocument = allowDocument;
    formData.allowUser = allowUser;
    formData.allowCompany = allowCompany;
    formData.type = type;    

    // Validate the user input data for correctness before actually sending the request
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

    // Send the HTTP request for creating this new company
    setIsLoading(true);
    postHttpRequest("/user/company/invite", { ...formData })
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }
        if (response.data.success === true) {
          setValidationErrors({});
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });

          // Reset the modal form state, and close the modal after successfully inviting the new employee
          updateForm({ ...initialFormData });
          props.handleCloseInvite();
        } else {
          setValidationErrors(response.data.errorObj);
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function inputChangedHandlerPermission(event) {
    // Get name of changed input, and its corresponding value
    const { name, value } = event.target;
    switch (name) {
      case "allowWorkFlow":
        if (allowWorkFlow) {
          setAllowWorkFlow(false);
        } else {
          setAllowWorkFlow(true);
        }
        break;
      case "allowTemplate":
        if (allowTemplate) {
          setAllowTemplate(false);
        } else {
          setAllowTemplate(true);
        }
        break;
      case "allowDocument":
        if (allowTemplate) {
          setAllowDocument(false);
        } else {
          setAllowDocument(true);
        }
        break;
      case "allowUser":
        if (allowUser) {
          setAllowUser(false);
        } else {
          setAllowUser(true);
        }
        break;
      case "allowCompany":
        if (allowCompany) {
          setAllowCompany(false);
        } else {
          setAllowCompany(true);
        }
        break;
      default:
    }
  }

  const handleClose = () => {
    setValidationErrors({});
    updateForm({ ...initialFormData });
    props.handleCloseInvite();
  };

  return (
    <Modal
      className="custom-modal"
      show={props.showInvite}
      onHide={handleClose}
      centered
    >
      <Modal.Header className="" closeButton>
        <Modal.Title>Invite Individual</Modal.Title>
      </Modal.Header>

      <Modal.Body className="">
        <p className="dg-mb-24">Invite individual</p>
        <Form.Group className="input-wrapper mb-3">
          <FloatingLabel
            controlId="floating-input-full-name"
            label="Full Name"
            className="dg-mb-16 w-100 dg-mr-12 text-muted"
          >
            <Form.Control
              type="text"
              autoComplete="organization"
              placeholder="Company Name"
              name="userName"
              value={form.userName}
              onChange={inputChangedHandler}
            />
            <span className="errors">{validationErrors.userName}</span>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="input-wrapper mb-3">
          <FloatingLabel
            controlId="floating-input-email"
            label="Email"
            className="dg-mb-16 w-100 text-muted"
          >
            <Form.Control
              type="email"
              placeholder="henry.octane@gmail.com"
              autoComplete="email"
              name="email"
              value={form.email}
              onChange={inputChangedHandler}
            />
            <span className="errors">{validationErrors.email}</span>
          </FloatingLabel>
        </Form.Group>

        {userData.role !== '300' ?  <> 

        <div className="d-flex align-items-center">
          <input className="me-2"
            type="checkbox"
            name="allowWorkFlow"
            defaultChecked={allowWorkFlow}
            onChange={inputChangedHandlerPermission}
          />{" "}
          <span > New Work Flow</span>
        </div>
        <div className="d-flex align-items-center mt-2">
          <input
            type="checkbox"
            name="allowTemplate"
            defaultChecked={allowTemplate}
            className="me-2"
            onChange={inputChangedHandlerPermission}
          />{" "}
          <span className="">Allow Template</span>
        </div>
        <div className="d-flex align-items-center mt-2">
          <input
            type="checkbox"
            name="allowDocument"
            defaultChecked={allowDocument}
            className="me-2"
            onChange={inputChangedHandlerPermission}
          />{" "}
          <span className="">Allow document</span>
        </div>
        <div className="d-flex align-items-center mt-2">
          <input
            type="checkbox"
            name="allowUser"
            defaultChecked={allowUser}
            className="me-2"
            onChange={inputChangedHandlerPermission}
          />{" "}
          <span className="">Allow Users</span>
        </div>
        <div className="d-flex align-items-center mt-2 mb-3">
          <input
            type="checkbox"
            name="allowCompany"
            defaultChecked={allowCompany}
            className="me-2"
            onChange={inputChangedHandlerPermission}
          />{" "}
          <span className="">Allow Company Profile</span>
        </div>

        </> : ""
        }

        <button
          type="button"
          onClick={InviteHandler}
          className="create-btn btn-blue w-100 "
          disabled={isLoading}
        >
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="dg-mr-8"
            />
          )}
          <span>Send Invite</span>
        </button>
      </Modal.Body>
    </Modal>
  );
};
export default InviteModal;
