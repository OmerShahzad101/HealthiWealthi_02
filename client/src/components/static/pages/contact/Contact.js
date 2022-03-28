import React from "react";

const Contact = () => {
  return (
    <div class="p-0 container-fluid">
      <div class="website-banner container-fluid">
      </div>
      <div class="Toastify"></div>
      <div class="contactus-form py-5 container">
        <h3 class="mt-0 mb-5 text-center font-weight-bold">GET IN TOUCH</h3>
        <form class="">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <input
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  class="form-control"
                />
                <p class="contact-form-errors"></p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  class="form-control"
                />
                <p class="contact-form-errors"></p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  type="email"
                  class="form-control"
                />
                <p class="contact-form-errors"></p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input
                  name="phone"
                  placeholder="Phone Number"
                  type="text"
                  class="form-control"
                />
                <p class="contact-form-errors"></p>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea
                  rows="3"
                  name="message"
                  placeholder="Message"
                  type="text"
                  class="form-control"
                ></textarea>
                <p class="contact-form-errors"></p>
              </div>
            </div>
          </div>
          <button type="submit" class="adduser me-3 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
