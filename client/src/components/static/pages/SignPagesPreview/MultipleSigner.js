import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { Modal, FloatingLabel, Form, Spinner } from "react-bootstrap";

import moment from "moment";
import {
  cancelOngoingHttpRequest,
  postHttpRequest,
  getHttpRequest,
} from "../../../../axios";
import SignPad from "../signature/signPade";
import Logo from "../../../../assets/images/Netrust Vertical 601.png";
import $ from "jquery";
window.jQuery = window.$ = $;

const dataItemList = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
];

export default function MultipleSigner() {
  // const signPade = useRef();

  let { docId } = useParams();

  const location = useLocation();

  const [isUsed, setIsUsed] = useState(false);
  const [documentFiles, setdocumentFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);


  const [statusSign, setStatusSign] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showAcceptInvite, setShowAcceptInvite] = useState(false);

  const [docIndex, setDocIndex] = useState("");
  const [fieldIndex, setFieldIndex] = useState("");

  const [buttonStart, setButtonStart] = useState("Submit");

  const [signerEmail, setSignerEmail] = useState("");
  // const signerEmail = "test12345@gmail.com";

  const [draggedElementsArray, setDraggedElementsArray] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const signerEmail = params.get("email"); // access_path
    debugger;
    if(signerEmail !== null){
      setSignerEmail(decodeURIComponent(signerEmail));
    }
    

    var scripts =
      '<script src="../../../js/numeric-1.2.6.min.js"></script><script src="../../../js/bezier.js"></script><script src="../../../js/jquery.signaturepad.js"></script><img src="../../../js/repeter.png" id="reapeaterimg">';
    $("body").append(scripts);
    // -- -- out going post message -- -- //
    window.parent.postMessage({ status: "rendered" }, "*");
    // -- -- incomming post messages -- --//
    var postMessage;
    var that = this;
    // Recieved Message from Script //
    window.addEventListener(
      "message",
      function (e) {
        postMessage = e.data;
        if (e.origin === "http://localhost") {
          // e.data is the string sent by the origin with postMessage.
          if (e.data === "sizing?") {
          }
        }
      },
      false
    );

    let data = {
      id: docId,
    };

    postHttpRequest("/document/get", data)
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }
        if (response.data.success === true) {
          const role = response.data.data.signers;
          const documentField = response.data.data.documentJSON;
          setdocumentFiles(documentField);
          if (response.data.data.status === "inprogress") {
            for (var i = 0; role.length > i; i++) {
              if (role[i].email == signerEmail) {
                if (role[i].signed) {
                  // setShowAcceptInvite(true);
                  setStatusSign(true);
                  setIsUsed(true);
                }
              }
            }
          } else if (response.data.data.status === "signed") {
            setIsUsed(true);
            setStatusSign(true);
          } else if (response.data.data.status === "Declined") {
            setIsUsed(true);
            setStatusSign(true);
          }
          getTemplate(docId, role);
        } else {
        }
      })
      .catch(() => {});
  }, []);

  const getTemplate = (clientID, role) => {
    setTimeout(function () {
      let data = {
        id: clientID,
      };
      postHttpRequest("/template/get", data)
        .then((response) => {
          if (!response) {
            console.log("Something went wrong with response...");
            return;
          }
          if (response.data.success === true) {
            if (response.data.data.templateObjects.length > 0) {
              response.data.data.templateObjects.map((document, docIndex) => {
                document.templateFields.map((field, fieldIndex) => {
                  if (field.name) {
                    if (typeof postMessage !== "undefined") {
                      field.value = postMessage[field.name];
                    }
                  }
                  return null;
                });
                return null;
              });
            }

            response.data.data.templateObjects[0].roles = role;
            var userData = response.data.data.templateObjects[0];
            // that.getUserSignPadData(userData.userId , that);
          } else {
          }
        })
        .catch(() => {});
    }, 1000);
  };

  const returnElementBasedOnType = (
    elementType,
    docIndex,
    innerIndex,
    fieldName
  ) => {
    if (elementType.type === 1) {
      if (signerEmail === elementType.role) {
        if (documentFiles[docIndex].templateFields[innerIndex].value) {
          return (
            <div
              style={{
                position: "absolute",
                left: elementType.x + "%",
                top: elementType.y + "%",
                height: elementType.height + "%",
              }}
              className="particularElementDropped esignElement"
            >
              <div
                key={innerIndex}
                data-document={docIndex}
                data-field={innerIndex}
                style={{ width: "100%", height: "100%" }}
                onClick={(event) => onModalShow(event)}
              >
                <img
                  src={documentFiles[docIndex].templateFields[innerIndex].value}
                  alt="broken"
                  style={{ height: "100%" }}
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              style={{
                position: "absolute",
                left: elementType.x + "%",
                top: elementType.y + "%",
                height: elementType.height + "%",
              }}
              className="particularElementDropped esignElement"
            >
              <div
                key={innerIndex}
                data-document={docIndex}
                data-field={innerIndex}
                alt="broken"
                style={{ width: "100%", height: "100%" }}
                onClick={(event) => onModalShow(event)}
              >
                <div id={"signaureId" + innerIndex} className="click-to-sign">
                  Click to sign{" "}
                  {elementType.required == true ? (
                    <div className="text-danger">*</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        }
      } else if (
        documentFiles[docIndex].templateFields[innerIndex].value !== ""
      ) {
        return (
          <div
            style={{
              position: "absolute",
              left: elementType.x + "%",
              top: elementType.y + "%",
              height: elementType.height + "%",
            }}
            className=" esignElement"
          >
            <div
              key={innerIndex}
              data-document={docIndex}
              data-field={innerIndex}
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={documentFiles[docIndex].templateFields[innerIndex].value}
                alt="broken"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        );
      }
    }
    //  else if (elementType.type === 2) {
    //   if (signerEmail === elementType.role) {
    //     if (documentFiles[docIndex].templateFields[innerIndex].value) {
    //       return (
    //         <div
    //           style={{
    //             position: "absolute",
    //             left: elementType.x + "%",
    //             top: elementType.y + "%",
    //             height: elementType.height + "%",
    //           }}
    //           className="particularElementDropped esignElement"
    //         >
    //           <div
    //             key={innerIndex}
    //             data-document={docIndex}
    //             data-field={innerIndex}
    //             style={{ width: "100%", height: "100%" }}
    //             //  onClick={(event) => this.onModalShow(event)}
    //           >
    //             <img
    //               src={documentFiles[docIndex].templateFields[innerIndex].value}
    //               alt="broken"
    //               style={{ height: "100%" }}
    //             />
    //           </div>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div
    //           style={{
    //             position: "absolute",
    //             left: elementType.x + "%",
    //             top: elementType.y + "%",
    //             height: elementType.height + "%",
    //           }}
    //           className="particularElementDropped esignElement"
    //         >
    //           <div
    //             key={innerIndex}
    //             data-document={docIndex}
    //             data-field={innerIndex}
    //             style={{ width: "100%", height: "100%" }}
    //             // onClick={(event) => this.onModalShow(event)}
    //           >
    //             {elementType.required == true ? (
    //               <div className="text-danger">*</div>
    //             ) : (
    //               ""
    //             )}
    //             <div id={"signaureId" + innerIndex} className="click-to-sign">
    //               Click to sign
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     }
    //   } else if (
    //     documentFiles[docIndex].templateFields[innerIndex].value !== ""
    //   ) {
    //     return (
    //       <div
    //         style={{
    //           position: "absolute",
    //           left: elementType.x + "%",
    //           top: elementType.y + "%",
    //           height: elementType.height + "%",
    //         }}
    //         className=" esignElement"
    //       >
    //         <div
    //           key={innerIndex}
    //           data-document={docIndex}
    //           data-field={innerIndex}
    //           style={{ width: "100%", height: "100%" }}
    //         >
    //           <img
    //             src={documentFiles[docIndex].templateFields[innerIndex].value}
    //             alt="broken"
    //             style={{ height: "100%" }}
    //           />
    //         </div>
    //       </div>
    //     );
    //   }
    // }
    // else if (elementType.type === 3) {
    //     if (signerEmail === elementType.role) {
    //         return (
    //             <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
    //                 {elementType.required == true ? <div className="text-danger">*</div> : ""}
    //                 <input key={innerIndex} value={documentFiles[docIndex].templateFields[innerIndex].value ? documentFiles[docIndex].templateFields[innerIndex].value : ''} placeholder={documentFiles[docIndex].templateFields[innerIndex].placeholder ? documentFiles[docIndex].templateFields[innerIndex].placeholder : ''} style={{ width: '100%', height: '100%' }} type="text" readOnly={elementType.role === "me_now" || elementType.role === "me_when_sending" ? true : false} onChange={(e) => this.updateFieldValue(e, docIndex, innerIndex, fieldName)} />
    //             </div>
    //         )
    //     } else if(documentFiles[docIndex].templateFields[innerIndex].value !== "") {
    //         return (
    //             <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
    //                         <input key={innerIndex}
    //                             value={documentFiles[docIndex].templateFields[innerIndex].value ? documentFiles[docIndex].templateFields[innerIndex].value : ''}
    //                             placeholder={documentFiles[docIndex].templateFields[innerIndex].placeholder ? documentFiles[docIndex].templateFields[innerIndex].placeholder : ''}
    //                             style={{ width: '100%', height: '100%' }}
    //                             type="text" readOnly={elementType.role === "me_now" || elementType.role === "me_when_sending" ? true : true}
    //                         />
    //                     </div>

    //         )
    //     }
    // }
    // else if (elementType.type === 4) {
    //     if (signerEmail === elementType.role) {
    //         return (
    //             <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
    //                 {elementType.required == true ? <div className="text-danger">*</div> : ""}
    //                 <input key={innerIndex}

    //                     checked={
    //                         documentFiles[docIndex].templateFields[innerIndex].value ==  true ||
    //                         documentFiles[docIndex].templateFields[innerIndex].value == "true" ||
    //                         documentFiles[docIndex].templateFields[innerIndex].value == "on"
    //                         ? true : false}
    //                     type="checkbox" onChange={(e) => this.updateFieldValue(e, docIndex, innerIndex)} />
    //             </div>
    //         )
    //     } else if(documentFiles[docIndex].templateFields[innerIndex].value !== "") {
    //         return (
    //             <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
    //                         <input key={innerIndex} checked={
    //                             documentFiles[docIndex].templateFields[innerIndex].value ==  true ||
    //                             documentFiles[docIndex].templateFields[innerIndex].value == "true" ||
    //                             documentFiles[docIndex].templateFields[innerIndex].value == "on"
    //                             ? true : false}  disabled={elementType.role === "me_now" ? true : false}
    //                             type="checkbox" />
    //                     </div>
    //         )
    //     }

    // }
    // else if (elementType.type === 5) {
    //     if (signerEmail === elementType.role) {
    //         return (
    //             <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
    //             <div className="esign-hand-writing" style={{ width: '100%', height: '100%' }}>
    //                 {elementType.required == true ? <div className="text-danger">*</div> : ""}
    //                 {moment().format('DD-MM-YYYY')}
    //             </div>
    //             </div>
    //         )
    //     } else if(documentFiles[docIndex].templateFields[innerIndex].value !== "") {
    //         return (
    //             <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
    //             <div className="esign-hand-writing" style={{ width: '100%', height: '100%' }}>
    //                 {documentFiles[docIndex].templateFields[innerIndex].value}
    //             </div>
    //             </div>
    //         )
    //     }

    // }
  };

  const onModalShow = (event) => {
    let fieldIndex = event.currentTarget.getAttribute("data-field")
      ? event.currentTarget.getAttribute("data-field")
      : "";

    let docIndex = event.currentTarget.getAttribute("data-document")
      ? event.currentTarget.getAttribute("data-document")
      : "";

    let role = documentFiles[docIndex].templateFields[fieldIndex].role;
    if (role === signerEmail) {
      setIsModalOpen(true);
      setDocIndex(docIndex);
      setFieldIndex(fieldIndex);
    }

    // setTimeout(() => {
    //     $('#signature-pad').signaturePad({
    //         drawOnly: true,
    //         drawBezierCurves: true,
    //         variableStrokeWidth: true,
    //         lineTop: 200,
    //         penColour: '#000',
    //         bgColour: '#ffffff00',
    //         penWidth: 4,
    //         lineColour: '#ffffff00',
    //     });

    //     if (document.getElementById("sigCanvas")) {
    //         let width = document.getElementById("sigCanvas").offsetWidth;
    //         document.getElementById("sigCanvas").width = width;
    //     }
    // }, 500);
  };

  const onDrawSignature = (signature) => {
    if (!signature) return;

    let doc_Index = docIndex;
    let field_Index = fieldIndex;
    let documentFile = documentFiles;

    documentFile[doc_Index].templateFields[field_Index].value = signature;

    setdocumentFiles(documentFile);
    setDocIndex(doc_Index);
    setFieldIndex(field_Index);

    // this.refs.SignPad.resetTabs();
  };

  const onSignPadCancel = () => {
    setIsModalOpen(false);
    // this.refs.SignPad.resetTabs();
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitonPage = (event) => {
    let document = documentFiles;
    let role = document[0].roles;
    for (var i = 0; role.length > i; i++) {
      if (role[i].email == signerEmail) {
        role[i].signed = true;
      }
    }
    var signerCheck = false;
    var count = 0;
    for (var i = 0; role.length > i; i++) {
      if (role[i].signed) {
        count++;
      }
    }
    if (role.length == count) {
      signerCheck = true;
    }
    //     document[0].roles = role;

    //     let elementId, heightFromTop, orignalHieght, requiredHeight;
    //     const urlParams = new URLSearchParams(window.location.hash);
    //     const documentId = urlParams.get('id');
    //     if (window.document.getElementsByClassName('click-to-sign').length > 0) {
    //         elementId = window.document.getElementsByClassName('click-to-sign')[0].id;
    //         heightFromTop = window.document.getElementById(elementId).parentElement.parentElement.style.top;
    //         orignalHieght = parseInt(window.document.getElementsByClassName('published0')[0].clientHeight);
    //         requiredHeight = (parseFloat(heightFromTop) / 100) * orignalHieght;
    //     }

    //     for(var z = 0; document.length > z ; z++){
    //         var templateFields = document[z].templateFields;
    //     for (var y = 0; templateFields.length > y; y++) {
    //         if (templateFields[y].required === true && templateFields[y].role == this.state.signerEmail && templateFields[y].value === '' && templateFields[y].type != 5) {
    //             // notify.show("Fill all required field!", "error", 3500);
    //             return
    //         }
    //     }
    //     for (var y = 0; templateFields.length > y; y++) {

    //         if (templateFields[y].required === true && templateFields[y].role == this.state.signerEmail && templateFields[y].type === 4) {

    //             if(!templateFields[y].value === true || !templateFields[y].value === 'true' || !templateFields[y].value === 'on'){
    //                 // notify.show("CheckBox required!", "error", 3500);
    //                 return
    //             }
    //         }
    //     }
    // }
    // if(this.state.isDocumentSign){
    //     window.parent.postMessage({"status": "signed", "document": document}, "*");
    // }
    // else{

    //     notify.show("Sign field is required", "error", 3500);
    // }
    // return

    const data = {
      id: docId,
      status: signerCheck ? "signed" : "inprogress",
      documentJSON: JSON.stringify(document),
      signerEmail,
    };
    postHttpRequest("/document/add", data).then((response) => {
      if (!response) {
        console.log("Something went wrong with response...");
        return;
      }

      if (response.data.status === true) {
        postHttpRequest("/document/file", { id: docId }).then((response) => {
          if (!response) {
            console.log("Something went wrong with response...");
            return;
          }
          if (response.data.status === true) {
            setShowAcceptInvite(true);
          } else {
          }
        });
      } else {
      }
    });
  };

  const handleAcceptClose = () => {
    setShowAcceptInvite(false);
  };

  const handleAcceptShow = () => {
    setShowAcceptInvite(true);
  };

  const isDocumentDeclineOpen = () => {
    let title = "Decline Document";
    let confirmButtonText = "Delete";
    let text = "Are you sure you want to Decline this Document?";

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

        postHttpRequest(`/document/declined/${docId}`)
          .then((response) => {
            if (!response) {
              console.log("Something went wrong with response...");
              return;
            }

            if (response.data?.success === true) {
              // props.getUserList();
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
  };

  return (
    <div className="pagesContainer">
      {/* <Notifications /> */}
      <div className="esignpanda-header te">
        {/* <div
          className="esignpanda-header-menu"
          data-test-ref="menu-toggle"
        ></div> */}
        <img className="esignpanda-logo logo" src={Logo} alt="logo not found" />

        <div className="esignpanda-right-container">
          {signerEmail ? (
            <div className="esignpanda-get-started-button-container">
              <a
                className="btn btn-default"
                onClick={() => isDocumentDeclineOpen()}
              >
                Decline
              </a>
              {!statusSign ? (
                <button
                  className="esignpanda-get-started cursor-pointer btn btn-primary"
                  // disabled={disableSubmit}
                  onClick={(event) => handleSubmitonPage(event)}
                  // onClick={ ()=> handleAcceptShow() }
                  type="button"
                >
                  <span>{buttonStart}</span>
                </button>
              ) : (
                ""
              )}
              <br />
            </div>
          ) : (
            ""
          )}
        </div>
       


        {/* <div className="three-dots">
          <button className="btn">
            <i className="fa fa-bars"></i>
          </button>
          <ul>
            <li>
              <a onClick={() => this.isModalOpenDeclineOpen()}>Decline</a>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="esignpanda-body" style={{ position: "relative" }}>
        <div className="esignpanda-signature-document">
          {documentFiles
            ? documentFiles.map((item, docIndex) => {
                var images = item.templateFiles.map((file, index) => {
                  return (
                    <div className="pagesContainer" key={"page-" + index}>
                      <div
                        key={index}
                        data-item={dataItemList[index]}
                        className={"singlePageRepeaterMain published" + index}
                      >
                        <div className="singlePageFullHeight">
                          <img
                            src={`${process.env.REACT_APP_BASE_API}/${file}`}
                            // src={window.APPURL + "templates/" + file}
                            alt=""
                            className="img-responsive"
                          />
                        </div>
                        {item.templateFields.map((innerItem, innerIndex) => {
                          if (innerItem.page === dataItemList[index]) {
                            if (innerItem.type === 5 && innerItem.value == "") {
                              innerItem.value = moment().format("DD-MM-YYYY");
                            } else if (innerItem.type === 5) {
                              innerItem.value = innerItem.value;
                            }
                            return (
                              <div key={innerIndex} className="box">
                                {returnElementBasedOnType(
                                  innerItem,
                                  docIndex,
                                  innerIndex,
                                  innerItem.name
                                )}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  );
                });
                return images;
              })
            : "No Data Found!"}
        </div>
      </div>
      <span>
        <SignPad
          // ref="signPade"
          onDrawSignature={onDrawSignature}
          onSignPadCancel={onSignPadCancel}
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          signData={""}
        />
      </span>
      <span>
        {/* <Declined ref="Declined"
            signerEmail={signerEmail}
            id={documentId}
            declineDocumnet={this.declineDocumnet}
        /> */}
      </span>

      <Modal
        className="custom-modal"
        show={showAcceptInvite}
        onHide={handleAcceptClose}
        centered
      >
        <Modal.Body className="">
          <h3> Thank You </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem eget
            condimentum enim libero ultricies amet odio fringilla. Ut nibh morbi
            augue.consectetur adipiscing elit. Lorem eget.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
