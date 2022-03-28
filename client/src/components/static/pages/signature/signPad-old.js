import React from 'react';
import Modal from 'react-modal';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import {
    Button, ModalBody, ModalFooter
} from 'reactstrap';
import loaderImage from './../../images/loader.svg';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../../styles/signpad.css';
import '../../styles/Usersignpad.css';
import imageHelper from '../../helper/readURL';

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
        overflow: 'none'
    }
};



Modal.setAppElement('#root');
var initialPositionX;
var initialPositionY;
var initialEveX;
var initialEveY;
var mainElementSelected;
var positionDifferenceX;
var positionDifferenceY;
var globalIndex;
export default class signPad extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedArrayIndex: "",
            errorMessage: "",
            signaturePad: 'block',
            typeIn: 'none',
            uploadImage: 'none',
            smartPhone: 'none',
            savedSignature: 'none',
            signatrueArray: [],
            disableInsert: true,
            drawSignature: '',
            typeInSignature: '',
            uploadSignature: '',
            buttonText: 'Insert',
            varient: 'danger',
            message: '',
            loaderActive : false,
        };
    }
    toggleModal() {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }

    componentDidMount() {
        this.setState({ draggedElementsArray: this.props.draggedElementsArray })
        //var scripts = '<script src="../../../../js/numeric-1.2.6.min.js"></script><script src="../../../../js/bezier.js"></script><script src="../../../js/jquery.signaturepad.js"></script><img src="../../../../js/repeter.png" id="reapeaterimg">';  

    }

    onSaveSignature = async () => {
        try {
            if ($('.signature-pad-triger').hasClass('active')) {
                if (this.state.drawSignature)
                    this.props.onDrawSignature(this.state.drawSignature);

            } else if ($('.type-it-in-triger').hasClass('active')) {

                const x = document.getElementById('textCanvas')
                const tCtx = document.getElementById('textCanvas').getContext('2d');

                const myInput = $("#type-it-in input");
                const fontfamily = myInput.attr('data-font');

                tCtx.font = "55px " + fontfamily;
                tCtx.fillStyle = "#000000";
                let width = tCtx.measureText(myInput.val()).width;
                width = width + 15;

                tCtx.canvas.width = width;
                tCtx.canvas.height = 55;
                tCtx.textAlign = "left";
                tCtx.textBaseline = "alphabetic";
                tCtx.font = "55px " + fontfamily;
                tCtx.fillStyle = "#000000";
                tCtx.fillText(myInput.val(), 7.5, 43);

                const signature_src = tCtx.canvas.toDataURL();

                this.props.onDrawSignature(signature_src);

            } else if ($('.upload-image-triger').hasClass('active')) {
                this.props.onDrawSignature(this.state.uploadSignature);
            }
            this.props.onModalClose();
            this.resetTabs();
        } catch (error) {
            console.log('');
        }
    }

    onchangesignature = (event) => {
       
        const file = event.target.files[0];
        if (file) {
            if(
                (file.name.split('.').pop() !== 'jpg') &&
                (file.name.split('.').pop() !== 'JPG') &&
                (file.name.split('.').pop() !== 'JPEG') &&
                (file.name.split('.').pop() !== 'jpeg') &&
                (file.name.split('.').pop() !== 'png')) {
                return this.setState({
                    showMessage: true,
                    message: "The file you are trying to upload is not allowed, Please upload only image file.",
                    disableSubmit: true
                });
            } else {
                this.setState({
                    showMessage: false,
                    message: "",
                });
                this.setState({ loaderActive: true})
            }
            imageHelper.readURL(file, (e) => {

                this.setState({
                    uploadSignature: e.currentTarget.result,
                    disableInsert: false
                });
            });
        }
        this.setState({ loaderActive: false})
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        })

        if (e.target.value != '') {
            this.setState({
                disableInsert: false
            })
        } else {
            this.setState({
                disableInsert: true
            })
        }
    }

    onSelectedSignature(data) {
        const buffer = new Buffer(data);
        if (buffer.length > 2500) {
            this.setState({
                disableInsert: false,
                drawSignature: data,
                buttonText: 'Insert'
            })
        } else {
            this.setState({
                disableInsert: true,
                buttonText: 'Invalid'
            })
        }
    }

    resetTabs() {

        this.setState({
            signaturePad: 'block',
            typeIn: 'none',
            uploadImage: 'none',
            smartPhone: 'none',
            savedSignature: 'none',
            disableInsert: false,
            drawSignature: '',
            uploadSignature: '',
            typeInSignature: '',
            disableInsert: true
        });
    }
    onDragOver(e) {
        e.preventDefault();
    }
    onDragStart(e, elementType) {
        this.setState({ elementType: elementType });
    }
    openSignaturePad() {
        this.setState({
            buttonText: 'Insert',   disableInsert: false
        })
        $(".eSign-lef-panel .draw-it").removeClass('active');
        $(".signature-pad-triger").addClass("active");
        this.setState({
            signaturePad: 'block',
            typeIn: 'none',
            uploadImage: 'none',
            smartPhone: 'none',
            savedSignature: 'none'
        });

        if (this.state.drawSignature != '') {
            this.setState({
                disableInsert: false
            })
        } else {
            this.setState({
                disableInsert: true
            })
        }
    }
    openTypeIn() {
        this.setState({
            buttonText: 'Insert',   disableInsert: false
        })
        $(".eSign-lef-panel .draw-it").removeClass('active');
        $(".type-it-in-triger").addClass("active");
        this.setState({
            signaturePad: 'none',
            typeIn: 'block',
            uploadImage: 'none',
            smartPhone: 'none',
            savedSignature: 'none'
        });

        if (this.state.typeInSignature != '') {
            this.setState({
                disableInsert: false
            })
        } else {
            this.setState({
                disableInsert: true
            })
        }
    }
    openUploadImage() {
        this.setState({
            buttonText: 'Insert',   disableInsert: false
        })
        $(".eSign-lef-panel .draw-it").removeClass('active');
        $(".upload-image-triger").addClass("active");
        this.setState({
            signaturePad: 'none',
            typeIn: 'none',
            uploadImage: 'block',
            smartPhone: 'none',
            savedSignature: 'none'
        });


        if (this.state.uploadSignature != '') {
            this.setState({
                disableInsert: false
            })
        } else {
            this.setState({
                disableInsert: true
            })
        }
    }
    openSmartPhone() {
        this.setState({
            buttonText: 'Insert',   disableInsert: false
        })
        $(".eSign-lef-panel .draw-it").removeClass('active');
        $(".use-smart-phone-triger").addClass("active");
        this.setState({
            signaturePad: 'none',
            typeIn: 'none',
            uploadImage: 'none',
            smartPhone: 'block',
            savedSignature: 'none'
        });
    }
    openDropDown(e) {
        $(e.target).parents(".allFontFamiliesList").toggleClass("open");
        //console.log(e.target);
    }
    selectDropDown(e) {
        var currentelem = $(e.target);
        var classget = currentelem.attr("class");
        classget = classget.replace("dropdown-item ", "");

        $("#type-it-in input").attr('class', classget).attr("data-font", currentelem.html());
        $("#allFontFamiliesListTRG").attr('class', 'btn btn-secondary dropdown-toggle');
        $("#allFontFamiliesListTRG").addClass(classget).html(currentelem.html());

        currentelem.parents(".allFontFamiliesList").toggleClass("open");
    }
    sigPad = {};
    trim = () => {
        this.setState({
            trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')
        })
    }
    clear = () => {

        this.setState({
            drawSignature: '',
            disableInsert: true,
            buttonText: 'Insert'
        })
    }
    setButtonText(text) {
        this.setState({
            buttonText: text,
            disableInsert: true
        });
    }
    renderMessage(message, varient) {
        const style = 'alert alert-' + varient;
        if (message) return <div className={style}>{message}</div>;
    }

    closeModel = () => {
       
        this.setState({
            drawSignature: '',
            disableInsert: true,
            buttonText: 'Insert'
        })
        this.props.onSignPadCancel()

    }

    render() {
        return (
            <span>
                   {
                    this.state.loaderActive ? <div className="inlineLoaderGif">
                        <img src={loaderImage} alt="broken" />
                    </div> : ''
                }
                <Modal className="user-signpad-modal" isOpen={this.props.isModalOpen} size="lg" style={customStyles2}>
                    <ModalBody className="esignModal-body">
                        <div className="eSign-lef-panel">
                            {/* {this.props.signData.drawIn  == true? */}
                                <span className="draw-it signature-pad-triger active" onClick={(event) => this.openSignaturePad()}>
                                    <div>Draw it in</div>
                                </span>
                            

                            {this.props.signData.typeIn == true?
                             <span className="draw-it type-it-in-triger" onClick={(event) => this.openTypeIn()}>
                             <div>Type it in</div>
                         </span>
                                : ""}

                            {this.props.signData.uploadIn == true ?
                                <span className="draw-it upload-image-triger" onClick={(event) => this.openUploadImage()}>
                                <div>Upload Image</div>
                            </span>
                                : ""}

                            
                           
                        </div>
                        <div className="eSign-right-panel">
                            <div className="esignModal-head">
                                <span>Create Signature </span>
                                <i className="fa fa-close" onClick={(event) => this.closeModel()}></i>
                            </div>

                            <div id="signature-pad" style={{ display: this.state.signaturePad }}>
                                <canvas id="sigCanvas" className="signature-pad" ></canvas>
                                <div className="button-wrapper">
                                    <button type="button" onClick={() => this.clear()} className="btn btn-default clearButton">Clear</button>
                                </div>
                                <input className="output" value="" type="hidden" />
                            </div>
                            <div id="type-it-in" style={{ display: this.state.typeIn }}>
                                <input type="text" name="typeInSignature" value={this.state.typeInSignature} onChange={this.onChange} placeholder="Type in it" />
                                <canvas id="textCanvas" width="139" height="55"></canvas>
                                <div className="dropdown allFontFamiliesList"><button className="btn btn-secondary dropdown-toggle" type="button" id="allFontFamiliesListTRG" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(event) => this.openDropDown(event)}>Select Font</button>
                                    <div className="dropdown-menu" aria-labelledby="allFontFamiliesListTRG">
                                        <a className="dropdown-item zeyada" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Zeyada</a>
                                        <a className="dropdown-item satisfy" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Satisfy</a>
                                        <a className="dropdown-item dawning" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Dawning of a New Day</a>
                                        <a className="dropdown-item haviland" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Mr De Haviland</a>
                                        <a className="dropdown-item dancing" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Dancing Script</a>
                                        <a className="dropdown-item shadows" onClick={(event) => this.selectDropDown(event)} href="javascript:void(0)">Shadows Into Light</a>
                                    </div>
                                </div>
                            </div>
                            <div id="upload-image" style={{ display: this.state.uploadImage }}>
                                <p>Upload a picture of your signature</p>
                                <label htmlFor="sig-file-upload" className="file-uploader">
                                    <i className="fa fa-cloud-upload"></i> Upload
                                </label>
                                <input id="sig-file-upload" type="file" onChange={this.onchangesignature} name="userSignature" accept=".gif,.jpg,.jpeg,.png"/>
                                {(this.state.uploadSignature) ?
                                    <img src={this.state.uploadSignature} className="image-signature-upload" /> : ""
                                }
                                <p>Maximum file size: 40 MB</p>
                                <p>Acceptable file formats: png, jpg, jpeg</p>
                                <br/>
                                <br/>
                                <div className="clearfix"></div>
                                <div className="text-center">{this.renderMessage(this.state.message, this.state.varient)}</div>
                            </div>
                            <div id="use-smart-phone" style={{ display: this.state.smartPhone }}>
                                <p>Please follow the instructions below:</p>
                                <ul>
                                    <li>
                                        <p>1. Take a photo of your signature.</p>
                                    </li>
                                    <li>
                                        <p>2. Email the photo to: <b>sign@esignpanda.com</b></p>
                                    </li>
                                    <li>
                                        <p>With a subject of: <b>1f3v2920</b></p>
                                    </li>
                                    <li>
                                        <p>3. Click 'Continue'</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="esignModal-footer">
                        <Button
                            color="primary"
                            className="theme_btn"
                            onClick={this.onSaveSignature}
                            disabled={this.state.disableInsert} >
                            {this.state.buttonText}
                        </Button>
                    </ModalFooter>
                </Modal>

            </span>

        );
    }
}