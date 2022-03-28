import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useHistory } from "react-router";

import Toast from "../../../common/toast/Toast";
import TopProgressBar from "../../../common/top-progress-bar/TopProgressBar";

import UploadTemplate from "../common/uploadTemplate";
import TemplatesModel from "../common/TemplatesModel";

import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
} from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";
import { TEMPLATE } from "../../../../router/constants/ROUTES";

import {
  FORGOT_PASSWORD,
  SIGNUP,
  DOCUMENT,
} from "../../../../router/constants/ROUTES";

import Logo from "../../../../assets/images/Netrust Vertical 601.png";

const initialFormData = {
  title: "",
  description: "",
};

const Create = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [form, updateForm] = useState({ ...initialFormData });

  const [filesArray, setFilesArray] = useState(["/nem-file-1646846261212_1.png"]); // static check
  const [rolesAdded, setRolesAdded] = useState([
    { name: "", email: "", role: "", placeholder: "Role Name", value: 1 },
  ]);

  const [isModelShow, setIsModelShow] = useState(false);

  const [draggedElementsArray, setdraggedElementsArray] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});

  const [templateId, setTemplateId] = useState("");

  const [flowType, setFlowType] = useState("serial");


  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [errorNameMessage, setErrorNameMessage] = useState("");

  // Cancel company creation HTTP call in case component is unmounted due to route change
  useEffect(() => {
    return cancelOngoingHttpRequest;
  }, []);

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

  const AddEmail = () => {
    let array = [...rolesAdded];
    const data = {
      name: "",
      email: "",
      placeholder: "Role Name",
      value: "",
    };
    array.push(data);
    setRolesAdded(array);
  };
  console.log(...rolesAdded);

  const RemoveRoles = (y) => {
    const role = [...rolesAdded];
    var value = role[y];
    const newdraggedElementsArray = [...draggedElementsArray];
    for (var i = 0; draggedElementsArray.length > i; i++) {
      if (value.email === draggedElementsArray[i].role) {
        newdraggedElementsArray.splice(i, 1);
      }
    }
    role.splice(y, 1);
    setRolesAdded(role);
    setdraggedElementsArray(newdraggedElementsArray);
  };

  const changeSchema = (e, index) => {
    var input = e.target.name;
    var checUniqueEmail = false;

    let rolesAdd = [...rolesAdded];
    var checkEmailArray = [...rolesAdded];
     debugger
    if (input == "email") {
      var email = rolesAdd[index].email;
      var draggedElements = [...draggedElementsArray];
      var newElementsArray = [...draggedElementsArray];
      for (var i = 0; draggedElements.length > i; i++) {
        if (email === draggedElements[i].role) {
          newElementsArray.splice(i, 1);
        }
      }
      setdraggedElementsArray(newElementsArray);

      rolesAdd[index].email = e.currentTarget.value;
      for (let i = 0; rolesAdd.length > i; i++) {
        for (let y = 0; checkEmailArray.length > y; y++) {
          if (i !== y) {
            if (rolesAdd[i].email === checkEmailArray[y].email) {
              setErrorEmailMessage("Email must be Unique.");
              checUniqueEmail = true;
            }
          }
        }
      }
      if (checUniqueEmail) {
        setRolesAdded(rolesAdd);
      } else {
        setRolesAdded(rolesAdd);
        setErrorEmailMessage("");
      }
    }
    if (input == "name") {
      var checkName = false;
      let rolesAdd = [...rolesAdded];
      rolesAdd[index].name = e.currentTarget.value;
      if (e.currentTarget.value == "") {
        setErrorNameMessage("Name is required!");
        checkName = true;
      }
      if (checkName === false) {
        setRolesAdded(rolesAdd);
        setErrorNameMessage("");
      }
      if (checkName === true) {
        setRolesAdded(rolesAdd);
      }
    }
  };

  const showImagesModel = () => {
    if (filesArray.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Attach or Upload Pdf!",
      });
      return;
    }
    setIsModelShow(true);
  };

  function inputChangedHandler(event) {
    // Get name of changed input, and its corresponding value
    const { name, value } = event.target;

    // Update form state against the target input field
    updateFormHandler(name, value);
  }

  function updateFormHandler(name, value) {
    updateForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  console.log(filesArray);

  const submitCreateTemplate = () => {
    // Validate the user input data for correctness before actually sending the request
    // const errors = validate(form);
    // if (Object.keys(errors).length > 0) {
    //   setValidationErrors({ ...errors });
    //   return;
    // } else {
    //   setValidationErrors({});
    // }

    // Disable the form
    setIsLoading(true);

    const formData = {
      draggedElementsArray,
      filesArray,
      rolesAdded,
      templateId,
      templateMessage: form.description,
      templateTitle: form.title,
      type: "justOther",
      emailList: [],
      flowType 
      // "emailList": this.state.emailList
    };

    // Send the HTTP request for creating this new company
    postHttpRequest("/template/create", formData)
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          // setValidationErrors({});

          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          history.replace(DOCUMENT);
        } else {
          // setValidationErrors(response.data.errorObj);
          // Toast.fire({
          //   icon: "error",
          //   title: response.data.message,
          // });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    // var dragArray = this.state.draggedElementsArray;
    // var role = this.state.rolesAdded;
    // if (role.length === 0) {
    //     this.setState({
    //         errorEmailMessage: `There is no Email Assign.`
    //     })
    //     return
    // }
    // var checkEmail = false;

    // var rolesAdded = this.state.rolesAdded;
    // for (let i = 0; rolesAdded.length > i; i++) {
    //     if (rolesAdded[i].name === "") {
    //         this.setState({ errorEmailMessage: 'Name is Required', loaderActive: false });
    //         checkEmail = true;
    //         return;
    //     }
    //     if (rolesAdded[i].email === "") {
    //         this.setState({ errorEmailMessage: 'Email is Required', loaderActive: false });
    //         checkEmail = true;
    //         return;
    //     }
    //     if (!rolesAdded[i].email.match(regexp)) {
    //         this.setState({ errorEmailMessage: 'Email is Invalid', loaderActive: false });
    //         checkEmail = true;
    //         return;
    //     }

    // }
    // if (checkEmail) {
    //     return
    // }

    // if (dragArray.length === 0) {
    //     this.setState({
    //         errorEmailMessage: `Don't forget to prepare the documents and assign fields to all signers.`
    //     })
    //     return
    // }

    // var touch = 0;
    // for (var i = 0; dragArray.length > i; i++) {
    //     if (dragArray[i].required === true && dragArray[i].name === "") {
    //         this.setState({
    //             errorEmailMessage: `Field Name is required`
    //         })
    //         touch = 1;
    //         return
    //     }
    //     if (dragArray[i].required === true && dragArray[i].value === "" && dragArray[i].role === "me_now") {
    //         this.setState({
    //             errorEmailMessage: `${dragArray[i].name}  Field Value is required.`
    //         })
    //         touch = 1;
    //         return
    //     }
    //     for (var y = 0; role.length > y; y++) {
    //         if (dragArray[i].role !== "me_now") {
    //             var data = dragArray.findIndex(x => x.role === role[y].email);
    //             if (data == -1) {
    //                 this.setState({
    //                     errorEmailMessage: `No fields assigned to ${role[y].email}`
    //                 })
    //                 touch = 1;
    //                 return
    //             }
    //         }
    //     }
    // }

    // if (touch === 1) {
    //     return
    // }

    // var count = 0;
    // var checkEmailArray = role;

    // for (let x = 0; role.length > x; x++) {
    //     for (let z = 0; checkEmailArray.length > z; z++) {

    //         if (x != z) {

    //             if (role[x].email === checkEmailArray[z].email) {
    //                 this.setState({ errorEmailMessage: 'Email must be Unique.' });
    //                 count = 1;
    //                 return
    //             }
    //         }
    //     }
    // }

    // if (count === 1) {
    //     return
    // }

    // if (this.state.templateTitle.length > 40) {
    //     this.setState({
    //         errorEmailMessage1: `Title is too long (maximum 40 characters)`
    //     })
    //     return
    // }

    // this.setState({ loaderActive: true });
    // var token = localStorage.getItem('accessToken');
    // fetch(window.APIURL + 'templates/create', {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + token
    //     }, body: JSON.stringify({
    //         "draggedElementsArray": this.state.draggedElementsArray,
    //         "filePages": this.state.filePages,
    //         "rolesAdded": this.state.rolesAdded,
    //         "templateId": this.state.templateId,
    //         "templateMessage": this.state.templateMessage,
    //         "templateTitle": this.state.templateTitle,
    //         "type": "justOther",
    //         "emailList": this.state.emailList
    //     })
    // }).then(res => res.json()).then(
    //     (result) => {

    //     },
    //     (error) => {
    //         console.log('');
    //     });
  };


  const onValueChange = (event) => {
    setFlowType(event.target.value);
  }

  return (
    <div className="workflow">
      <div className="custom-listing-header">
        <div className="title">Get Your Document Signed</div>
      </div>

      <div className="custom-listing-wrapper">
        <TopProgressBar show={isLoading} />

        <UploadTemplate
          arraySet={setFilesArray}
          setTemplateId={setTemplateId}
        />

        <Form noValidate>
          <div className="add-wrapper">
            <label className="label" htmlFor="totalTemplate">
              Add Email List
            </label>
            {rolesAdded.map((item, i) => {
              return (
                <div className="items" key={i}>
                  <div className="item">
                    <Form.Group className="dg-mb-16">
                      <FloatingLabel
                        controlId="floating-input-name"
                        label="Name*"
                        className=" w-100 dg-mr-12 text-muted"
                      >
                        <Form.Control
                          type="text"
                          autoComplete="role"
                          placeholder="Enter Name"
                          name="name"
                          value={item.name}
                          onChange={(e) => changeSchema(e, i)}
                          disabled={isLoading}
                        />
                        <span className="errors">
                          {validationErrors.userName}
                        </span>
                      </FloatingLabel>
                    </Form.Group>
                  </div>

                  <div className="item">
                    <Form.Group
                      className="dg-mb-16"
                      controlId="input-group-email"
                    >
                      <FloatingLabel
                        controlId="floating-input-email"
                        label=" Email*"
                        className="dg-mb-16 w-100 dg-mr-12 text-muted"
                      >
                        <Form.Control
                          type="email"
                          autoComplete="email"
                          placeholder="Enter  Email"
                          name="email"
                          value={item.email}
                          onChange={(e) => changeSchema(e, i)}
                          disabled={isLoading}
                        />
                        <span className="errors">{validationErrors.email}</span>
                      </FloatingLabel>
                    </Form.Group>
                  </div>
                  {i !== 0 ? (
                    <span
                      className="remove-icon"
                      onClick={() => RemoveRoles(i)}
                    >
                      <i className="fa fa-times"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                // <div key={i} className="new-feature">
                //     <input type="text" className="form-control" id="callBackURL" value={item.name} onChange={(e) => th.changeSchema(e, i)} name="name" placeholder="Name" />
                //     <input type="text" className="form-control" id="callBackURL" value={item.email} onChange={(e) => th.changeSchema(e, i)} name="email" placeholder="Email" />
                //     {i != 0 ?
                //         <span onClick={() => th.RemoveRoles(i)}>
                //             <i className="fa fa-times" ></i>
                //         </span> :
                //         ''
                //     }

                // </div>
              );
            })}

            {errorEmailMessage === "" ? (
              ""
            ) : (
              <div className="alert alert-danger"> {errorEmailMessage}</div>
            )}

            {errorNameMessage === "" ? (
              ""
            ) : (
              <div className="alert alert-danger"> {errorNameMessage}</div>
            )}

            <div className="form-group add-more">
              <button
                type="button"
                onClick={() => AddEmail()}
                className="btn theme_btn add"
              >
                +
              </button>
              {/* <input type="text" className="form-control" id="callBackURL"  onKeyDown={e => th._handleKeyDown(e)}  value={th.state.addFeature} onChange={th.onChange} name="addFeature" placeholder="Add New Feature" /> */}
            </div>
          </div>

          <label className="label">Click On Document Drope Sign</label>
          <div className="custom-upload view">
            <div className="content" onClick={() => showImagesModel()}>
              <img src="/images/upload-img.jpg" className="img-fluid" alt="" />
            </div>
          </div>

          <TemplatesModel
            isModelShow={isModelShow}
            setIsModelShow={setIsModelShow}
            filesArray={filesArray}
            rolesAdded={rolesAdded}
            draggedElementsArray={draggedElementsArray}
            setdraggedElementsArray={setdraggedElementsArray}
            assignRole = {true}
          />

          <div className="add-wrapper">
            <label className="label" htmlFor="totalTemplate">
              Flow Type:
            </label>

            <div className="items">
              <div className="item">
                <Form.Group className="dg-mb-16">
                  <Form.Check
                    type="radio"
                    label="Serial Work Flow"
                    value="serial"
                    checked={flowType === "serial"}
                    onChange={onValueChange}
                  />
                  <span className="errors">{validationErrors.userName}</span>
                </Form.Group>
              </div>

              <div className="item">
                <Form.Group className="dg-mb-16" controlId="input-group-email">
                  <Form.Check
                    type="radio"
                    label="Parallel work Flow"
                    value="parallel"
                    checked={flowType === "parallel"}
                    onChange={onValueChange}
                  />
                  <span className="errors">{validationErrors.email}</span>
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="add-wrapper">
            <label className="label" htmlFor="totalTemplate">
              Add a title and default message for the recepient(s)
            </label>

            <div className="items">
              <div className="item">
                <Form.Group className="dg-mb-16">
                  <FloatingLabel
                    controlId="floating-input-name"
                    label="Document Title*"
                    className=" w-100 dg-mr-12 text-muted"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Document Title"
                      name="title"
                      value={form.title}
                      onChange={inputChangedHandler}
                    />
                    <span className="errors">{validationErrors.userName}</span>
                  </FloatingLabel>
                </Form.Group>
              </div>

              <div className="item">
                <Form.Group className="dg-mb-16" controlId="input-group-email">
                  <FloatingLabel
                    controlId="floating-input-email"
                    label="Description*"
                    className="dg-mb-16 w-100 dg-mr-12 text-muted"
                  >
                    <Form.Control
                      type="text"
                      autoComplete="Description"
                      placeholder="Enter  Description"
                      name="description"
                      onChange={inputChangedHandler}
                      value={form.description}
                    />
                    <span className="errors">{validationErrors.email}</span>
                  </FloatingLabel>
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-xl-3 ">
              <Button
                type="button"
                className="create-btn btn-blue"
                onClick={() => submitCreateTemplate()}
              >
                Create New Work Flow
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Create;
