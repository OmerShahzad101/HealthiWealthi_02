import React from 'react';

const MembershipCard = ({type, membership}) => {
    return (
        membership && membership.length > 0 ? (
            membership.filter(item => item.title=="Membership test1" )
            .map((item, idx) => {
              return (
                <>
                  <div className="col-md-4">
                    <div className={`plan-${idx}`}>
                      <div className="plan-inner">
                        <div className="entry-title">
                          <h3>{item.title}</h3>
                          <div className="price">
                            ${item.priceInUSD}<span>/{item.period} days</span>
                          </div>
                        </div>
                        <div className="entry-content">
                        {/* <div className="p-3 text-center" dangerouslySetInnerHTML={{ __html: item?.description }} /> */}
                          <ul>
                            <li><strong>Level:</strong>&nbsp;{item.level}</li>
                            <li><strong>Consultations:</strong>&nbsp;{item.consultations} </li>
                            <li><strong>Gorup Coaching:</strong>&nbsp;{item.groupCoaching}</li>
                            <li><strong>Price in crypto:</strong>&nbsp;{item.priceInCrypto}</li>
                            <li><strong>Personal Coach Chat: </strong>&nbsp;{item.personalCoachChat} </li>
                            <li><strong>Micro Habit-lifestyle: </strong>&nbsp;{item.microHabitLifestyle} </li>
                            <li><strong>Root-Cause Health Coaching: </strong>&nbsp;{item.rootCauseHealthCoaching} </li>
                            <li><strong>Session extended price:</strong>&nbsp;${item.sessionExtendPrice}</li>
                            <li><strong>Root Cause HealthCoaching:</strong>&nbsp;{item.rootCauseHealthCoaching} </li>
                          </ul>
                        </div>
                        <div class="btnSpace"><a class="btn-b">Get Started</a></div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="no_data_found">
              <span>No Coaches found</span>
            </div>
          )
    );
};

export default MembershipCard;