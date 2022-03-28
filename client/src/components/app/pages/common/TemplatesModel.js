import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-modal";
import { Resizable } from "react-resizable";

import Toast from "../../../common/toast/Toast";
import TopProgressBar from "../../../common/top-progress-bar/TopProgressBar";
import FontData from "../../../../utils/FontWeightBold";

import {
  cancelOngoingHttpRequest,
  postHttpRequest,
} from "../../../../axios/index";

import imageExist from "../../../../utils/url/imageExist";

import $ from "jquery";
window.jQuery = window.$ = $;

var initialPositionX;
var initialPositionY;
var initialEveX;
var initialEveY;
var mainElementSelected;
var positionDifferenceX;
var positionDifferenceY;
var globalIndex;

const customStyles = {
  content: {
    top: "120px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, 0)",
    padding: "0",
    width: "95%",
  },
};

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

const fontSizeOptions = [];
for (let i = 8; i <= 30; i += 2) {
  fontSizeOptions.push(
    <option key={i} vlaue={i}>
      {i}
    </option>
  );
}

const TemplatesModel = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showErrors, setShowErrors] = useState("");
  const [uploadingMessage, setUploadingMessage] = useState("");

  const [elementType, setElementType] = useState(0);
  const [draggedElementsArray, setdraggedElementsArray] = useState([]);

  const [showFieldNameError, setShowFieldNameError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [mousePressedDown, setMousePressedDown] = useState(false);

  useEffect(() => {
    debugger;
    setdraggedElementsArray(props.draggedElementsArray);
  }, [props.draggedElementsArray]);

  const onChangeImage = async (e) => {
    if (!e.target.files || !e.target.files.length) return;
    const files = e.target.files;
    if (files == undefined || files == null) {
      return;
    }

    setTimeout(function () {
      if (isLoading) {
        setUploadingMessage("Converting file, please hold on...");
      } else {
        setUploadingMessage("Uploading File...");
      }
    }, 3000);
    const formData = new FormData();
    var selectedFileNames = [];
    for (var x = 0; x < files.length; x++) {
      selectedFileNames.push(files[x].name);
      formData.append("fileToUpload[]", files[x], files[x].name);
    }
    var fileType = e.target.files[0].type;
    if (fileType === "application/pdf") {
    } else {
      showErrors(true);
      setShowErrors(
        "The file you are trying to upload is not allowed, please upload PDF file."
      );
      return;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    setIsLoading(true);
    postHttpRequest("/template/files", formData, config)
      .then(async (response) => {
        setIsLoading(false);
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }
        if (response.data.success === true) {
          // Update company data as well in the Redux store
          showErrors("");
          setUploadingMessage("");
          props.arraySet(response.data.filesArray);
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        } else {
          setUploadingMessage("");
          showErrors(response.data.message);
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let fileUploadContent = (
    <>
      <div className=""></div>
    </>
  );

  // __ On Drag Start __ //
  const onDragStart = (e, elementType) => {
    console.log("hello");
    var f = navigator.userAgent.search("Firefox");
    var s = navigator.userAgent.search("Safari");
    if (f > -1) {
      e.dataTransfer.setData("text", "");
      var crt = e.target.cloneNode(true);
      crt.style.backgroundColor = "white";
      crt.style.position = "absolute";
      crt.style.top = "0px";
      crt.style.left = "-100px";
      crt.className = "ghostDummyImage";
      document.body.appendChild(crt);
      e.dataTransfer.setDragImage(crt, 0, 0);
    }
    if (s > -1) {
      e.dataTransfer.setData("text", "");
      var crt = e.target.cloneNode(true);
      crt.style.backgroundColor = "white";
      crt.style.position = "absolute";
      crt.style.top = "0px";
      crt.style.left = "-100px";
      crt.className = "ghostDummyImage";
      document.body.appendChild(crt);
      e.dataTransfer.setDragImage(crt, 0, 0);
    }
    setElementType(elementType);
  };

  // __ On Drag Over __ //
  const onDragOver = (e) => {
    e.preventDefault();
  };

  // __ On Drop __ //
  const onDrop = (ev) => {
    $(".ghostDummyImage").remove();
    var currentParentHere = ev.target.closest(".singlePageRepeaterMain");
    var rect = currentParentHere.getBoundingClientRect();
    let elementXPX = parseFloat(ev.clientX) - parseFloat(rect.left);
    let elementYPX = parseFloat(ev.clientY) - parseFloat(rect.top);
    var containerWidth = parseFloat($(currentParentHere).width());
    var containerHeight = parseFloat($(currentParentHere).height());
    let elementX = (elementXPX / containerWidth) * 100;
    let elementY = (elementYPX / containerHeight) * 100;
    var dataItemHere = currentParentHere.getAttribute("data-item");
    var draggedElements_Array = [...draggedElementsArray];
    var elemWidth = 10;
    var elemHeight = 1.8;
    if (elementType === 4) {
      elemWidth = 1;
      elemHeight = 1;
    } else if (elementType === 2) {
      elemWidth = 2;
      elemHeight = 2;
    }

    var initialWidth = (elemWidth * containerWidth) / 100;
    var initialHeight = (elemHeight * containerHeight) / 100;
    let elementData = {
      page: dataItemHere,
      placeholder: "Enter Value",
      type: elementType,
      x: elementX,
      y: elementY,
      initialReadonly: true,
      role: props.rolesAdded[0].role,
      required: true,
      value: "",
      name: "",
      width: elemWidth,
      height: elemHeight,
      initialWidth: initialWidth,
      initialHeight: initialHeight,
      openSettings: true,
      showSettings: true,
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: "100",
      fontFamily: "source-sans-pro",
    };

    if (elementType === 4) {
      elementData.value = true;
    }
    draggedElements_Array.push(elementData);
    setdraggedElementsArray(draggedElements_Array);
    // this.setState({ draggedElementsArray: draggedElementsArray });
    if (elementType === 1 || elementType === 2) {
    }
  };

    // __ On Resize __ //
  const onResize = (event, { element, size }) => {
    var currentParentHere = event.target.closest(".singlePageRepeaterMain");
    var containerWidth = parseFloat($(currentParentHere).width());
    var containerHeight = parseFloat($(currentParentHere).height());
    let newWidth = (size.width / containerWidth) * 100;
    let newHeight = (size.height / containerHeight) * 100;

    var draggedElementsArray = [...draggedElementsArray];
    draggedElementsArray[globalIndex].width = newWidth;
    draggedElementsArray[globalIndex].initialWidth = size.width;
    draggedElementsArray[globalIndex].height = newHeight;
    draggedElementsArray[globalIndex].initialHeight = size.height;
    setdraggedElementsArray(draggedElementsArray);
  };

  const returnElementBasedOnType = (elementType, innerIndex) => {
    if (elementType.type === 1) {
      if (elementType.value != "") {
        return (
          <div
            key={innerIndex}
            style={{ width: "100%", height: "100%" }}
            onClick={(param) => manageSettingsVisibility(innerIndex)}
            onDoubleClick={(e, param) => this.openSignPad(e, innerIndex)}
          >
            <img src={elementType.value} />
          </div>
        );
      } else {
        return (
          <div
            key={innerIndex}
            style={{ width: "100%", height: "100%" }}
            onClick={(param) => manageSettingsVisibility(innerIndex)}
          ></div>
        );
      }
    } else if (elementType.type === 2) {
      if (elementType.value != "") {
        return (
          <div
            key={innerIndex}
            style={{ width: "100%", height: "100%" }}
            onClick={(param) => manageSettingsVisibility(innerIndex)}
            onDoubleClick={(e, param) => this.openSignPad(e, innerIndex)}
          >
            <img src={elementType.value} />
          </div>
        );
      } else {
        return (
          <div
            key={innerIndex}
            style={{ width: "100%", height: "100%" }}
            onClick={(param) => manageSettingsVisibility(innerIndex)}
          ></div>
        );
      }
    } else if (elementType.type === 3) {
      return (
        <textarea
          key={innerIndex}
          placeholder={elementType.value}
          style={{
            width: "100%",
            height: "100%",
            fontSize: elementType.fontSize + "px",
          }}
          type="text"
          className="textTypeElement"
          readOnly={elementType.initialReadonly}
          onChange={(e) => this.updateFieldValue(e, innerIndex)}
          onClick={(param) => this.manageSettingsVisibility(innerIndex)}
        ></textarea>
      );
    } else if (elementType.type === 4) {
      return (
        <input
          key={innerIndex}
          style={{ width: "100%", height: "100%" }}
          disabled={elementType.initialReadonly}
          type="checkbox"
          onChange={(e) => this.updateFieldValue(e, innerIndex, true)}
          onClick={(param) => this.manageSettingsVisibility(innerIndex)}
        />
      );
    } else if (elementType.type === 5) {
      return (
        <input
          key={innerIndex}
          style={{
            width: "100%",
            height: "100%",
            fontSize: elementType.fontSize + "px",
          }}
          value={elementType.value}
          placeholder={elementType.placeholder}
          type="date"
          className="textTypeElement"
          onChange={(e) => this.updateFieldValue(e, innerIndex, true)}
          onClick={(param) => this.manageSettingsVisibility(innerIndex)}
        />
      );
    }
  };

  const manageSettingsVisibility = (innerIndex) => {
    var draggedElementsArray = [...draggedElementsArray];
    draggedElementsArray.map((item, index) => {
      draggedElementsArray[index].showSettings = false;
      return null;
    });
    draggedElementsArray[innerIndex].showSettings = true;
    setdraggedElementsArray(draggedElementsArray);
  };

  const moveElementOnMouseDown = (e, index) => {
    console.log("moveElementOnMouseDown", mousePressedDown)
    if (mousePressedDown) {
      console.log("initialEveX", initialEveX);
      console.log("e.pageX", e.pageX);
      console.log("initialEveY", initialEveY);
      console.log("e.pageY", e.pageY);
      var differenceX = initialEveX - e.pageX;
      var differenceY = initialEveY - e.pageY;
      positionDifferenceX = initialPositionX - differenceX;
      positionDifferenceY = initialPositionY - differenceY;
      var currentParentHere = e.target.closest(".singlePageRepeaterMain");
      var containerWidth = parseFloat($(currentParentHere).width());
      var containerHeight = parseFloat($(currentParentHere).height());
      let elementXNew = (positionDifferenceX / containerWidth) * 100;
      let elementYNew = (positionDifferenceY / containerHeight) * 100;
      // mainElementSelected.style.left = elementXNew+'%';
      // mainElementSelected.style.top = elementYNew+'%';

      var draggedElements_Array = [...draggedElementsArray];
      draggedElements_Array[index].x = elementXNew;
      draggedElements_Array[index].y = elementYNew;
      setdraggedElementsArray(draggedElements_Array);
      setShowFieldNameError(false);
    }
  };

  const elementPressedUp = () => {
    setMousePressedDown(false);
  };

  const elementPressedDown = (e, innerIndex) => {
    console.log("elementPressedDown");

    if (e.target.name == "selectbox") return false;
    globalIndex = innerIndex;
    //if(e.nativeEvent.which===1 && !e.target.classList.contains("react-resizable-handle") && (e.target.tagName.toLowerCase() !=="input" ) && e.target.tagName.toLowerCase() !=="select")
    if (
      e.nativeEvent.which === 1 &&
      !e.target.classList.contains("react-resizable-handle")
    ) {
      mainElementSelected = e.target.closest(".particularElementDropped");

      initialPositionX =
        $(mainElementSelected).offset().left -
        $(mainElementSelected).offsetParent().offset().left;
      initialPositionY =
        $(mainElementSelected).offset().top -
        $(mainElementSelected).offsetParent().offset().top;

      initialEveX = e.pageX;
      initialEveY = e.pageY;
      setMousePressedDown(true);
      // this.setState({ mousePressedDown: true });
    } else {
      setMousePressedDown(false);
      // this.setState({ mousePressedDown: false });
    }
  };

  const updateElementName = (e, index) => {
    if (e.nativeEvent.which === 32) {
      setMousePressedDown(true);
      return false;
    } else {
      var draggedElements_Array = [...draggedElementsArray];
      draggedElements_Array[index].name = e.target.value;
      setdraggedElementsArray(draggedElements_Array);
      setShowFieldNameError(false);
    }
  };

  const updateFieldRequirement = (e, index, type) => {
    var draggedElements_Array = [...draggedElementsArray];
    draggedElements_Array[index].required = e.target.checked;
    if (type === 4) {
      draggedElements_Array[index].value = "false";
    }
    setdraggedElementsArray(draggedElements_Array);
  };

  const toggleSettingsContainer = (innerIndex) => {
    var draggedElements_Array = [...draggedElementsArray];
    draggedElements_Array[innerIndex].openSettings =
      !draggedElements_Array[innerIndex].openSettings;
    setdraggedElementsArray(draggedElements_Array);
  };

  const removeElement = (innerIndex) => {
    var draggedElements_Array = [...draggedElementsArray];
    draggedElements_Array.splice(innerIndex, 1);
    setdraggedElementsArray(draggedElements_Array);
  };

  const callOnCancel = () => {
    props.setIsModelShow(false);
    props.setdraggedElementsArray([]);
    setErrorMessage("");
  };

  const callOnContinue = () => {
        var role = props.rolesAdded;
        var dragArray = [...draggedElementsArray];
        if (dragArray.length === 0) {
          Toast.fire({
            icon: "error",
            title:
              "Dont forget to prepare the documents and assign fields to all signers.",
          });
          return;
        }
      if(props.assignRole){
        for (var i = 0; dragArray.length > i; i++) {
          if (dragArray[i].required === true && dragArray[i].name === "") {
            Toast.fire({
              icon: "error",
              title: "Field Name is required!",
            });
            return;
          }
          for (var y = 0; role.length > y; y++) {
            if (dragArray[i].role !== "me_now") {
              var data = dragArray.findIndex((x) => x.role === role[y].email);
              if (data == -1) {
                Toast.fire({
                  icon: "error",
                  title: `${role[y].email}  No Signers file assign!`,
                });
                return;
              }
            }
          }
        }
      }

        props.setIsModelShow(false);
        props.setdraggedElementsArray(draggedElementsArray);
        setErrorMessage("");

  };

  const updateFieldRole = (e, index, type) => {
    var draggedElements_Array = draggedElementsArray;
    draggedElements_Array[index].role = e.target.value;
    if (e.target.value === "me_now") {
      if (type === 4) {
        draggedElementsArray[index].value = true;
      }
      if (type === 1 || type === 2) {
        draggedElementsArray[index].initialReadonly = false;
        this.setState({
          isModalOpen: true,
          selectedArrayIndex: index,
        });
        var current_this = this;
        setTimeout(() => {
          var signaturePad1 = $("#signature-pad").signaturePad({
            drawOnly: true,
            drawBezierCurves: true,
            variableStrokeWidth: true,
            lineTop: 200,
            bgColour: "#ffffff00",
            penColour: "#000",
            penWidth: 4,
            lineColour: "#ffffff00",
            onDrawEnd: function () {
              current_this.refs.SignPad.setButtonText("Processing...");
              setTimeout(function () {
                var data = signaturePad1.getSignatureImage();
                if (data) {
                  current_this.refs.SignPad.onSelectedSignature(data);
                }
                var index = current_this.state.selectedArrayIndex;
                var draggedElementsArray =
                  current_this.state.draggedElementsArray;
                draggedElementsArray[index].value = data;
                draggedElementsArray[index].output = $(".output").val();
                //console.log(draggedElementsArray[index]);
                current_this.setState({
                  draggedElementsArray: draggedElementsArray,
                });
              }, 1000);
            },
          });
          if (document.getElementById("sigCanvas")) {
            let width = document.getElementById("sigCanvas").offsetWidth;
            document.getElementById("sigCanvas").width = width;
          }
        }, 500);
      }
    } else {
      draggedElements_Array[index].initialReadonly = true;
      draggedElements_Array[index].value = "";
    }
    setdraggedElementsArray(draggedElements_Array);
  };

  return (
    <>
      <Modal
        isOpen={props.isModelShow}
        className="custom-signature-modal"
        //    onHide={setShowModal.bind(this, false)}
        //    onExited={resetChangeDepartmentHeadForm}
        style={customStyles}
        //    centered
      >
        <div className="modal_head elementsContainerHead">
          <div className="elementsContainer">
            <span
              className="dragable_elements"
              draggable
              onDragStart={(e) => onDragStart(e, 1)}
            >
              <i className="flaticon1-signature"></i>
              <span>Signature</span>
            </span>
          </div>
        </div>

        <div
          className="modal_inner"
          style={{ height: "460px", overflow: "auto" }}
        >
          <div className="pagesContainer" onMouseUp={(e) => elementPressedUp()}>
            {props.filesArray.map((item, index) => {
              return (
                <div
                  key={index}
                  data-item={dataItemList[index]}
                  onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => onDrop(e)}
                  style={{position : 'relative'}}
                  className={"singlePageRepeaterMain published" + index}
                  // style={{
                  //     height: this.props.height != 0 ? `${this.props.height}px` : '',
                  //     width: this.props.width != 0 ? `${this.props.width}px` : ''
                  // }}
                  // style={{width:  this.props.width != 0 ?  `${this.props.width}px` : ''}}
                >
                  <div className="singlePageFullHeight">
                    <img
                      src={`${process.env.REACT_APP_BASE_API}/${item}`}
                      alt=""
                      className="img-responsive"
                    />
                  </div>
                  {draggedElementsArray.map((innerItem, innerIndex) => {
                    if (innerItem.page === dataItemList[index]) {
                      return (
                        <Resizable
                          key={innerIndex}
                          className="box"
                          height={innerItem.initialHeight}
                          width={innerItem.initialWidth}
                          onResize={onResize}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: innerItem.x + "%",
                              top: innerItem.y + "%",
                              width: innerItem.width + "%",
                              height: innerItem.height + "%",
                            }}
                            onMouseUp={(e) => elementPressedUp(e, innerIndex)}
                            onMouseDown={(e) =>
                              elementPressedDown(e, innerIndex)
                            }
                            onMouseMove={(e) =>
                              moveElementOnMouseDown(e, innerIndex)
                            }
                            className="particularElementDropped"
                          >
                            {returnElementBasedOnType(innerItem, innerIndex)}
                            <span
                              className="removeAddedElement"
                              onClick={() => removeElement(innerIndex)}
                            >
                              <i className="fa fa-times"></i>
                            </span>
                            {innerItem.showSettings ? (
                              <div>
                                <div
                                  className="fieldSettingsContainer"
                                  style={{
                                    display: innerItem.openSettings
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  <div className="form-group">
                                    <span
                                      className="pull-right"
                                      onClick={() =>
                                        toggleSettingsContainer(innerIndex)
                                      }
                                    >
                                      <i className="fa fa-minus"></i>
                                    </span>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      placeholder="Field Name"
                                      type="text"
                                      defaultValue={innerItem.name}
                                      onChange={(e) =>
                                        updateElementName(e, innerIndex)
                                      }
                                    />
                                    <div
                                      className="errorMessage"
                                      style={{
                                        display: showFieldNameError
                                          ? "block"
                                          : "none",
                                      }}
                                    >
                                      Field name can not contain space and any
                                      special characters.
                                    </div>
                                  </div>
                                  {innerItem.type === 3 &&
                                  innerItem.role === "me_now" ? (
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        placeholder={innerItem.placeholder}
                                        value={innerItem.value}
                                        onChange={(e) =>
                                          this.updateElementPlaceholder(
                                            e,
                                            innerIndex
                                          )
                                        }
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {innerItem.type === 4 &&
                                  innerItem.role === "me_now" ? (
                                    <div className="form-group">
                                      <select
                                        name="selectbox"
                                        value={innerItem.value}
                                        onChange={(e, param1) =>
                                          this.updateCheckBox(e, innerIndex)
                                        }
                                      >
                                        <option value={"true"}>True</option>
                                        <option value={"false"}>False</option>
                                      </select>
                                      {/* <input type="text" placeholder={innerItem.placeholder} onChange={(e) => this.updateElementPlaceholder(e, innerIndex)} /> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {innerItem.type === 5 &&
                                  innerItem.role === "me_now" ? (
                                    <div className="form-group">
                                      <input
                                        type="date"
                                        placeholder={innerItem.placeholder}
                                        onChange={(e) =>
                                          this.updateElementPlaceholder(
                                            e,
                                            innerIndex
                                          )
                                        }
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {props.assignRole ? (
                                    <div className="form-group">
                                      <label>Who fills this out?</label>
                                      <select
                                        name="selectbox"
                                        defaultValue={innerItem.role}
                                        onChange={(e, param1) =>
                                          updateFieldRole(
                                            e,
                                            innerIndex,
                                            innerItem.type
                                          )
                                        }
                                      >
                                        <option value="">Select Signer</option>
                                        {/* <option value={"me_now"} >Me (Now)</option> */}
                                        {/* <option value={"me_when_sending"}>Me (when sending)</option> */}
                                        {props.rolesAdded.map((item, index) => {
                                          return item.name.length > 0 ? (
                                            <option
                                              key={index}
                                              value={item.email}
                                            >
                                              {item.name} [{item.email}]
                                            </option>
                                          ) : (
                                            ""
                                          );
                                        })}
                                      </select>
                                    </div>
                                  ) : (
                                    <div className="form-group">
                                      <label>Who fills this out?</label>
                                      <select
                                        name="selectbox"
                                        defaultValue={innerItem.role}
                                        onChange={(e, param1) =>
                                          updateFieldRole(
                                            e,
                                            innerIndex,
                                            innerItem.type
                                          )
                                        }
                                      >
                                        <option value="">Select Role</option>
                                        {/* <option value={"me_when_sending"}>Me (when sending)</option> */}
                                        {props.rolesAdded.map(
                                          (item, index) => {
                                            return item.role.length > 0 ? (
                                              <option
                                                key={index}
                                                value={item.role}
                                              >
                                                {item.role}
                                              </option>
                                            ) : (
                                              ""
                                            );
                                          }
                                        )}
                                      </select>
                                    </div>
                                  )}

                                  {innerItem.type === 3 ||
                                  innerItem.type === 5 ? (
                                    <div className="form-group">
                                      <label>Select Font Size</label>
                                      <select
                                        name="selectbox"
                                        onChange={(e, param1) =>
                                          this.updateFontData(
                                            e,
                                            innerIndex,
                                            "fontSize"
                                          )
                                        }
                                        defaultValue={innerItem.fontSize}
                                      >
                                        {FontData.FontSize.map(
                                          (item, index) => {
                                            return (
                                              <option key={index} value={item}>
                                                {item}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {innerItem.type === 3 ? (
                                    <div className="form-group">
                                      <label>Select Font Family</label>

                                      <select
                                        name="selectbox"
                                        onChange={(e, param1) =>
                                          this.updateFontData(
                                            e,
                                            innerIndex,
                                            "fontFamily"
                                          )
                                        }
                                        defaultValue={innerItem.fontFamily}
                                      >
                                        {FontData.FontFamily.map(
                                          (item, index) => {
                                            return (
                                              <option key={index} value={item}>
                                                {item}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <div className="form-group">
                                    <label>Required:</label>
                                    <input
                                      checked={innerItem.required}
                                      type="checkbox"
                                      onChange={(e) =>
                                        updateFieldRequirement(
                                          e,
                                          innerIndex,
                                          innerItem.type
                                        )
                                      }
                                    />
                                  </div>
                                  {innerItem.type === 3 ||
                                  innerItem.type === 5 ? (
                                    <div
                                      className="form-group"
                                      style={{
                                        display: innerItem.initialReadonly
                                          ? "none"
                                          : "block",
                                      }}
                                    >
                                      <label>Text Size:</label>
                                      <select
                                        defaultValue={innerItem.fontSize}
                                        onChange={(e) =>
                                          this.changeFontSize(e, innerIndex)
                                        }
                                      >
                                        {fontSizeOptions}
                                      </select>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div
                                  className="fieldSettingsContainerOpener"
                                  style={{
                                    display: !innerItem.openSettings
                                      ? "block"
                                      : "none",
                                  }}
                                  onClick={() =>
                                    toggleSettingsContainer(innerIndex)
                                  }
                                >
                                  <span className="fieldSettingsOpenerIconContainer">
                                    <i className="fa fa-plus"></i>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </Resizable>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="modalHead_btn">
          {/* <button className="custom_theme_btn" onClick={this.refresh}>Refresh</button>&nbsp; */}
          <button
            className="btn custom_theme_btn theme_close_btn"
            onClick={callOnCancel}
          >
            Cancel
          </button>
          &nbsp;
          <button
            className="btn btn-blue custom_theme_btn theme_btn"
            onClick={callOnContinue}
          >
            Continue
          </button>
          {errorMessage == "" ? (
            ""
          ) : (
            <span className="sign-error">{errorMessage}</span>
          )}
        </div>

        {/* </Modal.Body> */}
      </Modal>
    </>
  );
};

export default TemplatesModel;
