import { useState, useRef } from "react";
import Toast from "../../../common/toast/Toast";
import { postHttpRequest } from "../../../../axios";
import validate from "../../../../utils/form-validation/authFormValidation";

const Contact = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoaing, setIsLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const formRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef?.current.value;
    const subject = subjectRef?.current.value;
    const message = messageRef?.current.value;

    const loginData = {
      name,
      email,
      subject,
      message,
    };
    console.log("loginData", loginData);
    const errors = validate(loginData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }
    setIsLoading(true);

    postHttpRequest("front/contact/create/", loginData)
      .then((response) => {
        setIsLoading(false);
        if (!response) {
          alert("Something went wrong with response...");
          return;
        } else {
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          formRef.current.reset();
        }
      })
      .catch(() => {
        setIsLoading(false);
        Toast.fire({
          icon: "error",
          title: "Something went wrong...",
        });
      });
  }

  return (
    <div className="p-0 container-fluid">
      <div className="website-banner container-fluid"></div>
      <div className="Toastify"></div>
      <div className="contactus-form py-5 container ">
        <h3 className="mt-0 mb-5 text-center font-weight-bold">GET IN TOUCH</h3>
        <form className="" noValidate ref={formRef} onSubmit={submitHandler}>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  name="username"
                  placeholder="Name"
                  type="text"
                  className="form-control"
                  ref={nameRef}
                />
                <p className="contact-form-errors">
                  {validationErrors.username}
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="form-control"
                  ref={emailRef}

                />
                <p className="contact-form-errors">{validationErrors.email}</p>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  name="subject"
                  placeholder="Subject"
                  type="text"
                  className="form-control"
                  ref={subjectRef}
                />
                <p className="contact-form-errors">
                  {validationErrors.subject}
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  rows="3"
                  name="message"
                  placeholder="Message"
                  type="text"
                  ref={messageRef}
                  className="form-control"
                ></textarea>
                <p className="contact-form-errors">
                  {validationErrors.message}
                </p>
              </div>

              <div className="text-center">
                <button
                  type="submit"
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
