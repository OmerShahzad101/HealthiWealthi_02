import { exportDefaultSpecifier } from "@babel/types";
import React, { useState } from "react";
const intailvalues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
const Contact = () => {
  const [formValues, setFormValues] = useState(intailvalues);

  const submitForm = (e) => {
    if (Validation()) {
      console.log("formValues ", formValues);
    }
    e.preventDefault();
  };
  const errorInitialStates = {
    nameError: "",
    emailError: "",
    subjectError: "",
    messageError: "",
  };
  const [error, setError] = useState([errorInitialStates]);
  const Validation = () => {
    const { name, email, subject, message } = formValues;
    let isValid = true;
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    //////////////////////
    if (name) {
      error.nameError = " ";
    } else {
      error.nameError = "Enter your Name";
      isValid = false;
    }
    ///////////
    if (regexEmail.test(email)) {
      error.emailError = " ";
    } else {
      error.emailError = "Email is not valid";
      isValid = false;
    }
    /////////////////
    if (subject) {
      error.subjectError = " ";
    } else {
      error.subjectError = "Enter your Subject";
      isValid = false;
    }
    ///////////////////////////
    if (message) {
      error.messageError = " ";
    } else {
      error.messageError = "Enter your Message";
      isValid = false;
    }

    setError({ ...error });
    return isValid;
  };
  return (
    <div className="p-0 container-fluid">
      <div className="website-banner container-fluid"></div>
      <div className="Toastify"></div>
      <div className="contactus-form py-5 container ">
        <h3 className="mt-0 mb-5 text-center font-weight-bold">GET IN TOUCH</h3>
        <form className="">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  name="firstName"
                  placeholder="Name"
                  type="text"
                  className="form-control"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
                <p className="contact-form-errors">{error.nameError}</p>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="form-control"
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                />
                <p className="contact-form-errors">{error.emailError}</p>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  name="subject"
                  placeholder="Subject"
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setFormValues({ ...formValues, subject: e.target.value })
                  }
                />
                <p className="contact-form-errors">{error.subjectError}</p>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  rows="3"
                  name="message"
                  placeholder="Message"
                  type="text"
                  onChange={(e) =>
                    setFormValues({ ...formValues, message: e.target.value })
                  }
                  className="form-control"
                ></textarea>
                <p className="contact-form-errors">{error.messageError}</p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  onClick={(e) => submitForm(e)}
                  className="adduser me-3 btn btn-primary  "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
