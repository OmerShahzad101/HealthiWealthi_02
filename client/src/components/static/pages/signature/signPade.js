import { useEffect, useRef, useState, useImperativeHandle } from "react";

import React from "react";
// import loaderImage from './../../images/loader.svg';
import Modal from "react-modal";
import "react-resizable/css/styles.css";
import { Button, ModalBody, ModalFooter } from "reactstrap";
import $ from "jquery";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./signpad.css";
// import apiHelper from '../../helper/api.helper';
// import { decrpt} from '../../comman/Crypto';
// import { __esModule } from 'react-phone-number-input/commonjs/isValidPhoneNumberDefaultMetadata';

window.jQuery = window.$ = $;

const customStyles = {
  content: {
    top: '120px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, 0)',
    padding: '0',
    width: '95%'
  }
};
const customStyles2 = {
  content: {
    top: '70px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, 0)',
    padding: '0',
    width: '700px',
    overflow: 'none',
    border:'none',
    boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.1)'
  }
};


Modal.setAppElement("#root");
var initialPositionX;
var initialPositionY;
var initialEveX;
var initialEveY;
var mainElementSelected;
var positionDifferenceX;
var positionDifferenceY;
var globalIndex;

export default function SignPade(props, ref) {
  //   const emailRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});


  const [signaturePad, setSignaturePad] = useState('block');

  const [savedSignature, setSavedSignature] = useState('none');


  const [smartPhone, setSmartPhone] = useState('none');
  const [typeIn, setTypeIn] = useState('none');


  const [signatrueArray, setSignatrueArray] = useState([]);

  const [disableInsert, setDisableInsert] = useState(false);

  const [drawSignature, setDrawSignature] = useState('');


  const [typeInSignature, setTypeInSignature] = useState('');

  const [uploadSignature, setUploadSignature] = useState('');

  const [buttonText, setButtonText] = useState('Insert');

  const [selectedSignatureIndex, setSelectedSignatureIndex] = useState('Insert');

  const [varient, setVarient] = useState('danger');

  const [message, setMessage] = useState('');

  const [loaderActive, setLoaderActive] = useState('');

  const [fileMetaData, setFileMetaData] = useState({});



  const [selectedArrayIndex, setSelectedArrayIndex] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [uploadImage, setUploadImage] = useState('none');



  //   useImperativeHandle(ref, () => ({

  //     onSelectedSignature() {
  //       alert("getAlert from Child");
  //     }

  //   }));



  // Cancel company creation HTTP call in case component is unmounted due to route change
  useEffect(() => {

    // const currentThis = this;

    setTimeout(() => {
      var signaturePad1 = $("#signature-pad").signaturePad({
        drawOnly: true,
        drawBezierCurves: true,
        variableStrokeWidth: true,
        lineTop: 200,
        penColour: "#000",
        bgColour: "#ffffff00",
        penWidth: 4,
        lineColour: "#ffffff00",
        onDrawEnd: function () {
          // currentThis.refs.SignPad.setButtonText("Processing...");
          setTimeout(function () {
            var data = signaturePad1.getSignatureImage();
            if (data) {
              onSelectedSignature(data);
            }
          }, 1000);
        },
      });
      if (document.getElementById("sigCanvas")) {
        let width = document.getElementById("sigCanvas").offsetWidth;
        document.getElementById("sigCanvas").width = width;
      }
    }, 500);
    if (document.getElementById("sigCanvas")) {
      let width = document.getElementById("sigCanvas").offsetWidth;
      document.getElementById("sigCanvas").width = width;
    }

  }, [props.isModalOpen]);



  const closeModel = () => {

    setDrawSignature("");
    setDisableInsert(true);
    setButtonText('Insert');
    props.onSignPadCancel()
  }


  const clear = () => {


    setDrawSignature("");
    setDisableInsert(true);
    setButtonText('Insert');
    
    // this.setState({
    //     disableInsert: true,
    //     drawSignature: '',
    //     buttonText: 'Insert'
    // })
  }



  const onSaveSignature = async () => {
    try {

      if ($('.signature-pad-triger').hasClass('active')) {
        if (drawSignature)
          props.onDrawSignature(drawSignature);

      }
      //  else if ($('.type-it-in-triger').hasClass('active')) {

      //     const x = document.getElementById('textCanvas')
      //     const tCtx = document.getElementById('textCanvas').getContext('2d');

      //     const myInput = $("#type-it-in input");
      //     const fontfamily = myInput.attr('data-font');

      //     tCtx.font = "55px " + fontfamily;
      //     tCtx.fillStyle = "#000000";
      //     let width = tCtx.measureText(myInput.val()).width;
      //     width = width + 15;

      //     tCtx.canvas.width = width;
      //     tCtx.canvas.height = 55;
      //     tCtx.textAlign = "left";
      //     tCtx.textBaseline = "alphabetic";
      //     tCtx.font = "55px " + fontfamily;
      //     tCtx.fillStyle = "#000000";
      //     tCtx.fillText(myInput.val(), 7.5, 43);

      //     const signature_src = tCtx.canvas.toDataURL();

      //     this.props.onDrawSignature(signature_src);

      // } else if ($('.upload-image-triger').hasClass('active')) {
      //     this.props.onDrawSignature(this.state.uploadSignature);
      // }
      props.onModalClose();
      // this.resetTabs();
    } catch (error) {
      console.log('');
    }
  }

  const renderMessage = (message, varient) => {
    const style = 'alert alert-' + varient;
    if (message) return <div className={style}>{message}</div>;
  }


  const onChangeSignature = (event) => {

    const file = event.target.files[0];

    if (
      (file.name.split('.').pop() !== 'jpg') &&
      (file.name.split('.').pop() !== 'JPG') &&
      (file.name.split('.').pop() !== 'JPEG') &&
      (file.name.split('.').pop() !== 'jpeg') &&
      (file.name.split('.').pop() !== 'png')) {
      return this.setState({
        showMessage: true,
        message: "The file you are trying to upload is not allowed, Please upload only image file.",
      });
    } else {
      this.setState({
        showMessage: false,
        message: "",
      });
    }


    // __ This check for the setting page __ //
    if (!this.isEmpty(this.props) && this.props.page == 'Settings') {
      this.setState({
        uploadSignature: URL.createObjectURL(event.target.files[0]),
        disableInsert: false,
        fileMetaData: {
          "userSignature": file,
          isDefault: this.props.isDefault
        }
      }, () => {
        // document.getElementById('sig-file-upload').value = "";
        //this.props.onInsertedSavedSignature(this.state.uploadSignature); 
      });

      return false;
    }

    const data = {
      "userSignature": file,
      isDefault: this.props.isDefault
    }
    this.uploadSignature(data);


  }


  const selectDropDown = (e) => {
    var currentelem = $(e.target);
    var classget = currentelem.attr("class");
    classget = classget.replace("dropdown-item ", "");

    $("#type-it-in input").attr('class', classget).attr("data-font", currentelem.html());
    $("#allFontFamiliesListTRG").attr('class', 'btn btn-secondary dropdown-toggle');
    $("#allFontFamiliesListTRG").addClass(classget).html(currentelem.html());

    currentelem.parents(".allFontFamiliesList").toggleClass("open");
  }

  const openDropDown = (e) => {
    $(e.target).parents(".allFontFamiliesList").toggleClass("open");
    //console.log(e.target);
  }


  const onDeleteSignature = (sigId, sigSrc) => {


  }


  const openSignaturePad = () => {
    // this.setState({
    //     buttonText: 'Insert',   disableInsert: false
    // })
    $(".eSign-lef-panel .draw-it").removeClass('active');
    $(".signature-pad-triger").addClass("active");

    setSignaturePad('block');
    setTypeIn('none');
    setUploadImage('none');
    setSmartPhone('none');
    setSavedSignature('none');


    // if(this.state.drawSignature) {
    //     setDisableInsert(false);

    // } else {
    //     setDisableInsert(true)

    // }
  }

  const onSelectedSignature = (data) => {
    const buffer = new Buffer(data);
    if (buffer.length > 2500) {

      setDisableInsert(false);
      setDrawSignature(data);
      setButtonText('Insert');

    } else {
      setDisableInsert(true);
      setButtonText('Invalid');

    }
  }


  return (


    //     <span>
    //                    {
    //                     loaderActive ? <div className="inlineLoaderGif">
    //                         {/* <img src={loaderImage} alt="broken" /> */}
    //                     </div> : ''
    //                 }
    //                 <Modal className="user-signpad-modal" isOpen={props.isModalOpen} size="lg" style={customStyles2}>
    //                     <ModalBody className="esignModal-body">
    //                         <div className="eSign-lef-panel">
    //                             {/* {this.props.signData.drawIn  == true? */}
    //                                 <span className="draw-it signature-pad-triger active" onClick={(event) => openSignaturePad()}>
    //                                     <div>Draw it in</div>
    //                                 </span>

    // {/* 
    //                             {this.props.signData.typeIn == true?
    //                              <span className="draw-it type-it-in-triger" onClick={(event) => openTypeIn()}>
    //                              <div>Type it in</div>
    //                          </span>
    //                                 : ""}

    //                             {this.props.signData.uploadIn == true ?
    //                                 <span className="draw-it upload-image-triger" onClick={(event) => openUploadImage()}>
    //                                 <div>Upload Image</div>
    //                             </span>
    //                                 : ""} */}



    //                         </div>
    //                         <div className="eSign-right-panel">
    //                             <div className="esignModal-head">
    //                                 <span>Create Signature </span>
    //                                 <i className="fa fa-close" onClick={(event) => closeModel()}></i>
    //                             </div>

    //                             <div id="signature-pad" style={{ display: signaturePad }}>
    //                                 <canvas id="sigCanvas" className="signature-pad" ></canvas>
    //                                 <div className="button-wrapper">
    //                                     <button type="button" onClick={() => this.clear()} className="btn btn-default clearButton">Clear</button>
    //                                 </div>
    //                                 <input className="output" value="" type="hidden" />
    //                             </div>
    //                             <div id="type-it-in" style={{ display: typeIn }}>
    //                                 {/* <input type="text" name="typeInSignature" value={typeInSignature} onChange={onChange} placeholder="Type in it" /> */}
    //                                 <canvas id="textCanvas" width="139" height="55"></canvas>
    //                                 <div className="dropdown allFontFamiliesList"><button className="btn btn-secondary dropdown-toggle" type="button" id="allFontFamiliesListTRG" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(event) => this.openDropDown(event)}>Select Font</button>
    //                                     <div className="dropdown-menu" aria-labelledby="allFontFamiliesListTRG">
    //                                         {/* <a className="dropdown-item zeyada" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Zeyada</a>
    //                                         <a className="dropdown-item satisfy" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Satisfy</a>
    //                                         <a className="dropdown-item dawning" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Dawning of a New Day</a>
    //                                         <a className="dropdown-item haviland" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Mr De Haviland</a>
    //                                         <a className="dropdown-item dancing" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Dancing Script</a>
    //                                         <a className="dropdown-item shadows" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Shadows Into Light</a> */}
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div id="upload-image" style={{ display: uploadImage }}>
    //                                 <p>Upload a picture of your signature</p>
    //                                 <label htmlFor="sig-file-upload" className="file-uploader">
    //                                     <i className="fa fa-cloud-upload"></i> Upload
    //                                 </label>
    //                                 {/* <input id="sig-file-upload" type="file" onChange={onchangesignature} name="userSignature" accept=".gif,.jpg,.jpeg,.png"/> */}
    //                                 {(uploadSignature) ?
    //                                     <img src={uploadSignature} className="image-signature-upload" /> : ""
    //                                 }
    //                                 <p>Maximum file size: 40 MB</p>
    //                                 <p>Acceptable file formats: png, jpg, jpeg</p>
    //                                 <br/>
    //                                 <br/>
    //                                 <div className="clearfix"></div>
    //                                 <div className="text-center">{renderMessage(message, varient)}</div>
    //                             </div>
    //                             <div id="use-smart-phone" style={{ display: smartPhone }}>
    //                                 <p>Please follow the instructions below:</p>
    //                                 <ul>
    //                                     <li>
    //                                         <p>1. Take a photo of your signature.</p>
    //                                     </li>
    //                                     <li>
    //                                         <p>2. Email the photo to: <b>sign@esignpanda.com</b></p>
    //                                     </li>
    //                                     <li>
    //                                         <p>With a subject of: <b>1f3v2920</b></p>
    //                                     </li>
    //                                     <li>
    //                                         <p>3. Click 'Continue'</p>
    //                                     </li>
    //                                 </ul>
    //                             </div>
    //                         </div>
    //                     </ModalBody>
    //                     <ModalFooter className="esignModal-footer">
    //                         <Button
    //                             color="primary"
    //                             className="theme_btn"
    //                             onClick={onSaveSignature}
    //                             // disabled={this.state.disableInsert}
    //                              >
    //                             {buttonText}
    //                         </Button>
    //                     </ModalFooter>
    //                 </Modal>

    //             </span>


    <span>
      {loaderActive ? (
        <div className="inlineLoaderGif">
          {/* <img src={loaderImage} alt="broken" /> */}
        </div>
      ) : (
        ""
      )}
      <Modal isOpen={props.isModalOpen} size="lg" style={customStyles2}>
        <ModalBody className="esignModal-body">
          <div className="esignModal-header">
            <button className="" onClick={(event) => closeModel()}>Cancel
            </button>
            <h5>Add Signature</h5>
            <button className="" onClick={onSaveSignature}
              disabled={disableInsert}>Add
            </button>
          </div>
          <div className="eSign-title-panel">
            <span
              className="draw-it signature-pad-triger active"
              onClick={(event) => openSignaturePad()}
            >
              <div>Draw your Signature here</div>
            </span>
          </div>
          <div className="eSign-right-panel">


            <div id="signature-pad" style={{ display: signaturePad }}>
              <canvas id="sigCanvas" className="signature-pad" ></canvas>

              <input className="output" value="" type="hidden" />
            </div>


            {/* <div
              id="saved-signature"
              style={{ display: savedSignature }}
            >
              {typeof signatrueArray !== "undefined" ? (
                <Carousel
                  showArrows={true}
                  showIndicators={false}
                  showStatus={false}
                  showThumbs={false}
                >
                  {signatrueArray.map((item, index) => {
                    return (
                      <div className="img-wrap" key={index}>
                        <img src={item.signatureSrc} />
                        <a
                          data-id={item._id}
                          className="deleteSignature custom_theme_btn theme_close_btn"
                          href="javascript:void(0)"
                          onClick={(sigId, sigSrc) =>
                            onDeleteSignature(item._id, item.signatureSrc)
                          }
                        >
                          Delete
                        </a>
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                ""
              )}
            </div> */}
          </div>
        </ModalBody>
        <ModalFooter className="esignModal-footer">

          <button className="btn btn-default" onClick={(event) => closeModel()}>Reject
          </button>
          
            <button type="button" onClick={() => clear()} className="btn clearButton">Clear Signature</button>
        <span></span>


          {/* <Button
            color="primary"
            onClick={onSaveSignature}
            disabled={disableInsert}
          >
            {buttonText}
          </Button> */}
        </ModalFooter>
      </Modal>
    </span>
  );
}
