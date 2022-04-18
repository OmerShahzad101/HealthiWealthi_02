import React from 'react';

const AvaliableFeature = () => {
    return (
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-5 features-img">
                <img
                  src="/assets/img/features/feature.png"
                  class="img-fluid"
                  alt="Feature"
                />
              </div>
              <div class="col-md-7">
                <div class="section-header">
                  <h2 class="mt-2">Availabe Features in Our Website</h2>
                  <p>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                  </p>
                </div>
                <div class="features-slider slider">
                  {/* <div class="feature-item text-center">
                    <img
                      src="/assets/img/features/feature-01.jpg"
                      class="img-fluid"
                      alt="Feature"
                    />
                    <p>Patient Ward</p>
                  </div>
                  
  
                  <div class="feature-item text-center">
                    <img
                      src="/assets/img/features/feature-02.jpg"
                      class="img-fluid"
                      alt="Feature"
                    />
                    <p>Test Room</p>
                  </div>
                  
  
                  <div class="feature-item text-center">
                    <img
                      src="/assets/img/features/feature-03.jpg"
                      class="img-fluid"
                      alt="Feature"
                    />
                    <p>ICU</p>
                  </div> */}
                  
  
                  <div class="feature-item text-center">
                    <img
                      src="/assets/img/features/feature-01.jpg"
                      class="img-fluid"
                      alt="Feature"
                    />
                    <p>Chat with coach</p>
                  </div>
                  
  
                  <div class="feature-item text-center">
                    <img 
                      src="/assets/img/features/feature-05.jpg"
                      class="img-fluid"
                      alt="audio"
                    />
                    <p>Audio consultation</p>
                  </div>
                  
  
                  <div class="feature-item text-center">
                    <img
                      src="/assets/img/features/feature-06.jpg"
                      class="img-fluid"
                      alt="Feature"
                    />
                    <p>Video consultation</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
    );
};

export default AvaliableFeature;