import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Toast from "../../../../common/toast/Toast";
import Customize from "../customize/Customize";
import TopProgressBar from "../../../../common/top-progress-bar/TopProgressBar";

import {
  cancelOngoingHttpRequest,
  getHttpRequest,
  postHttpRequest,
} from "../../../../../axios";
import validate from "../../../../../utils/form-validation/authFormValidation";
import { setCompany } from "../../../../../store/slices/user";

const initialFormData = {
  companyName: "",
  companyDomain: "",
  industry: "",
  noEmployee: "",
  location: "",
  city: "",
};

const UpdateCompany = () => {
  const companyInfo = useSelector((state) => state.user.company);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [form, updateForm] = useState({ ...initialFormData });
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Cancel company creation HTTP call in case component is unmounted due to route change
  useEffect(() => {
    return cancelOngoingHttpRequest;
  }, []);



  useEffect(() => {
    setIsLoading(true);

    getHttpRequest(`/company/single/${companyInfo?._id}`)
      .then((response) => {
        setIsLoading(false);

        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data?.success === true) {
          const company = response.data.company;
          const companyData = {
            companyName: company.companyName,
            companyDomain: company.companyDomain,
            industry: company.industry,
            noEmployee: company.noEmployee,
            location: company.location,
            city: company.city,
          };



          updateForm(companyData);
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          setIsLoading(false);
        }
      });
  }, [companyInfo?._id]);

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

    switch (name) {
      case "location":
        value = newValue.isoCode;
        break;
      case "city":
        value = newValue.name;
        break;
      default:
        value = newValue.value;
        break;
    }

    // Update form state against the target select input
    updateFormHandler(name, value);

    // If the updated input Country, then update the list of cities as well

  }


  function updateCompanyHandler(event) {
    event.preventDefault();

    // Validate the user input data for correctness before actually sending the request
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }

    // Disable the form
    setIsLoading(true);

    let companyId = companyInfo?._id;
    // Send the HTTP request for creating this new company
    postHttpRequest("/company/update", { ...form, companyId })
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }

        if (response.data.success === true) {
          setValidationErrors({});
          dispatch(setCompany(response.data.company));
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
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

  return (
    <div className={``}>
      <TopProgressBar show={isLoading} />
      <Customize />
      <Form noValidate onSubmit={updateCompanyHandler}>
        <Form.Group
          controlId="input-company-name"
          label="Company Name*"
          className="form-group"
        >
          <Form.Label>Company Name</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="companyName"
            value={form.companyName}
            onChange={inputChangedHandler}
            disabled={isLoading}
          />
          <span className="errors">{validationErrors.companyName}</span>
        </Form.Group>


        <Form.Group
          controlId="input-company-domain"
          label="Company Domain*"
          className="form-group"
        >
          <Form.Label>Company Domain</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Domain"
            name="companyDomain"
            vaCompanyProfilelue={form.companyDomain}
            onChange={inputChangedHandler}
            disabled={isLoading}
          />
          <span className="errors">{validationErrors.companyDomain}</span>
        </Form.Group>


        <div className="row">
          <div className="col-lg-6 col-xl-2">
            <Button type="submit" className="create-btn" disabled={isLoading}>
              Update
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UpdateCompany;
