import React from 'react';

const ContactDetails = () => {
    return (
      
      <div className="card contact-card">
      <div className="card-body">
        <h4 className="card-title">Contact Details</h4>
        <div className="row form-row">
          <div className="col-md-12">
            <div className="form-floating mb-4">
              <input
                type="address"
                name="address"
                ref={addressRef}
                className="form-control"
                placeholder="address"
                defaultValue={profileData?.address}
              />
              <label>Address</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating mb-4">
              <input
                type="city"
                name="city"
                ref={cityRef}
                className="form-control"
                placeholder="city"
                defaultValue={profileData?.city}
              />
              <label>City</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating mb-4">
              <input
                type="state"
                name="state"
                ref={stateRef}
                className="form-control"
                placeholder="state"
                defaultValue={profileData?.state}
              />
              <label>State</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-4">
              <input
                type="country"
                name="country"
                ref={countryRef}
                className="form-control"
                placeholder="country"
                defaultValue={profileData?.country}
              />
              <label>Country</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-4">
              <input
                type="postal"
                name="postal"
                ref={postalCodeRef}
                className="form-control"
                placeholder="postal"
                defaultValue={profileData?.postalCode}
              />
              <label>Postal Code</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating mb-4">
              <input
                type="text"
                name="phonenumber"
                ref={phoneRef}
                className="form-control"
                placeholder="Phone"
                defaultValue={profileData?.phone}
              />
              <label>Phone Number</label>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    );
};

export default ContactDetails;