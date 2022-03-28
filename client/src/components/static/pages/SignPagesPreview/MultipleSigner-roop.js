import React, { Component } from 'react';
import logo from "../../../.././../src/assets/images/Netrust Vertical 601.png";
import moment from 'moment';
import 'react-resizable/css/styles.css'
import {
    Button, Modal, ModalBody, ModalFooter
} from 'reactstrap';
// import Notifications, { notify } from 'react-notify-toast';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import SignPad from '../signature/signPade';
// import Declined from './DeclinePOP/DeclinePopUp';
window.jQuery = window.$ = $;


export default class EsignPanda extends Component {

    constructor() {
        super();
        this.state = {

            // __ __ Array __ __ //
            documentId: '',
            documentFiles: [],
            draggedElementsArray: [],

            isModalOpen: false,
            isDocumentSign: false,

            signerEmail: '',

            trimmedDataURL: null,
            docIndex: "",
            fieldIndex: "",
            statusSign: false,

            isSuccess: false,
            isUsed: false,
            buttonStart: "Submit",
            disableSubmit: false,
            signData: ""
        };

    }

    isModalOpenDeclineOpen() {
        this.refs.Declined.isModalOpenDeclineOpen();
    }


    onModalCloseDecline() {
        this.refs.Declined.onModalCloseDecline();
    }



    // __ __ Signature pad  __ __ //
    // ___________________________//
    sigPad = {};

    clear = () => {
        this.sigPad.clear()
    }

    trim = () => {
        this.setState({
            trimmedDataURL: this.sigPad.getTrimmedCanvas()
                .toDataURL('image/png')
        })
    }

    clear = () => {
        this.sigPad.clear()
    }

    insertSignature(event) {

        event.preventDefault();
        var canvas = $('#signature-pad canvas')[0];
        var base64 = canvas.toDataURL();

        let docIndex = this.state.docIndex;
        let fieldIndex = this.state.fieldIndex;
        let documentFiles = this.state.documentFiles;

        documentFiles[docIndex].templateFields[fieldIndex].value = base64;
        this.setState({
            documentFiles: documentFiles,
            isDocumentSign: true,
            isModalOpen: false,
        });

    }

    insertSignatureEveryWhere(event) {

        var th = this;
        let documentFiles = this.state.documentFiles;
        var canvas = $('#signature-pad canvas')[0];
        var base64 = canvas.toDataURL();
        documentFiles.map(function (document, index) {
            document.templateFields.map(function (field, key) {
                if (field.type === 1 || field.type === 2) {
                    if (field.role === th.state.signerEmail) {
                        field.value = base64;
                    }
                }
                return null;
            })
            return null;
        });
        this.setState({
            documentFiles: documentFiles,
            isDocumentSign: true,
            isModalOpen: false,
        })
    }

    // __ __ Modal  __ __ //
    // ___________________//

    onModalClose() {
        this.setState({
            isModalOpen: false
        });
    }

    onModalShow(event) {

        let fieldIndex = event.currentTarget.getAttribute("data-field") ? event.currentTarget.getAttribute("data-field") : "";

        let docIndex = event.currentTarget.getAttribute("data-document") ? event.currentTarget.getAttribute("data-document") : "";

        let role = this.state.documentFiles[docIndex].templateFields[fieldIndex].role;

        if (role === this.state.signerEmail) {
            this.setState({
                isModalOpen: true,
                docIndex: docIndex,
                fieldIndex: fieldIndex,
            });
        }

        setTimeout(() => {
            $('#signature-pad').signaturePad({
                drawOnly: true,
                drawBezierCurves: true,
                variableStrokeWidth: true,
                lineTop: 200,
                penColour: '#000',
                bgColour: '#ffffff00',
                penWidth: 4,
                lineColour: '#ffffff00',
            });

            if (document.getElementById("sigCanvas")) {
                let width = document.getElementById("sigCanvas").offsetWidth;
                document.getElementById("sigCanvas").width = width;
            }
        }, 500);

    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }
    // __ __ Life Cycle Methods __ __ //
    // _______________________________//
    componentDidMount() {

        var that = this;
        var role, documentField
        var scripts = '<script src="../../../js/numeric-1.2.6.min.js"></script><script src="../../../js/bezier.js"></script><script src="../../../js/jquery.signaturepad.js"></script><img src="../../../js/repeter.png" id="reapeaterimg">';
        $("body").append(scripts);
        // -- -- out going post message -- -- //
        window.parent.postMessage({ "status": "rendered" }, "*");
        // -- -- incomming post messages -- --//
        var postMessage;
        var that = this;
        // Recieved Message from Script //
        window.addEventListener('message', function (e) {
            postMessage = e.data;
            if (e.origin === 'http://localhost') {
                // e.data is the string sent by the origin with postMessage.
                if (e.data === 'sizing?') {
                }
            }
        }, false);
        const urlParams = new URLSearchParams(window.location.hash);
        const clientID = urlParams.get('id');
        this.setState({ documentId: clientID });
        const signerEmail = decodeURIComponent(urlParams.get('email'));
        this.setState({ signerEmail: signerEmail })
        // Get Document to check if signed //
        var res = that.postAjaxRequest(window.APIURL + "api/document/get", {
            "id": clientID,
        }).then(function (res) {
            
            role = res.data.signers;
            documentField = res.data.documentJSON;
            if (res.data.status === 'inprogress') {
                for (var i = 0; role.length > i; i++) {
                    if (role[i].email == signerEmail) {
                        if (role[i].signed) {
                            that.setState({
                                isUsed: true
                            })
                        }
                    }
                }
            }
            else if (res.data.status === 'signed') {
                that.setState({ isUsed: true })
            } else if (res.data.status === 'canceled') {
                that.setState({ isUsed: true })
            }
        }).catch(function (error) {
            console.log("");
        });

        //

        setTimeout(function () {
            fetch(window.APIURL + "api/templates/get", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'None'
                }, body: JSON.stringify({
                    "id": clientID
                })
            }).then(res => res.json()).then(
                (result) => {

                    if (result.status && result.data.templateObjects.length > 0) {
                        result.data.templateObjects.map((document, docIndex) => {
                            document.templateFields.map((field, fieldIndex) => {
                                if (field.name) {
                                    if (typeof postMessage !== "undefined") {
                                        field.value = postMessage[field.name];
                                    }
                                }
                                return null;
                            })
                            return null;
                        });
                    }
                    result.data.templateObjects[0].roles = role;
                    
                    var userData = result.data.templateObjects[0];
                    that.getUserSignPadData(userData.userId , that);
                     
                    that.setState({
                        documentFiles: documentField
                    }, () => {
                        //   console.log(that.state.documentFiles);
                    });
                },
                (error) => {
                    console.log("");
                });

        }, 1000)

    }
    
    getUserSignPadData(id , that) {
        
        // var that = this;
        fetch(window.APIURL + "users/signpade", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'None'
            }, body: JSON.stringify({
                "userId": id
            })
        }).then(res => res.json()).then(
            (result) => {
                
                if (result.status == true) {
                    that.setState({
                        signData: result.data
                    })
                } else if (result.status == false) {
                    that.setState({
                        isUsed: true
                    })
                    return
                }
            },
            (error) => {
                console.log("");
            });
    }

    parseQueryString(query) {
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {

            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);

            if (typeof query_string[key] === "undefined") {
                query_string[key] = decodeURIComponent(value);
            }
            else if (typeof query_string[key] === "string") {
                var arr = [query_string[key], decodeURIComponent(value)];
                query_string[key] = arr;
            } else {
                query_string[key].push(decodeURIComponent(value));
            }

        }
        return query_string;
    }

    postAjaxRequest(url, data) {

        return new Promise(function (resolve, reject) {

            var params = typeof data == 'string' ? data : Object.keys(data).map(
                function (k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
                }
            ).join('&');

            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
            xhr.open('POST', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState > 3 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.onerror = reject;
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
            return xhr;
        });
    }

    handleSubmitonPage(event) {
        
        var that = this;
        let document = this.state.documentFiles;
        let role = document[0].roles;
        for (var i = 0; role.length > i; i++) {
            if (role[i].email == this.state.signerEmail) {
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
        document[0].roles = role;
      
        let elementId, heightFromTop, orignalHieght, requiredHeight;
        const urlParams = new URLSearchParams(window.location.hash);
        const documentId = urlParams.get('id');
        if (window.document.getElementsByClassName('click-to-sign').length > 0) {
            elementId = window.document.getElementsByClassName('click-to-sign')[0].id;
            heightFromTop = window.document.getElementById(elementId).parentElement.parentElement.style.top;
            orignalHieght = parseInt(window.document.getElementsByClassName('published0')[0].clientHeight);
            requiredHeight = (parseFloat(heightFromTop) / 100) * orignalHieght;
        }
        
       
        for(var z = 0; document.length > z ; z++){
            var templateFields = document[z].templateFields;
        for (var y = 0; templateFields.length > y; y++) {
            if (templateFields[y].required === true && templateFields[y].role == this.state.signerEmail && templateFields[y].value === '' && templateFields[y].type != 5) {
                // notify.show("Fill all required field!", "error", 3500);
                return
            }
        }
        for (var y = 0; templateFields.length > y; y++) {
            
            if (templateFields[y].required === true && templateFields[y].role == this.state.signerEmail && templateFields[y].type === 4) {
                
                if(!templateFields[y].value === true || !templateFields[y].value === 'true' || !templateFields[y].value === 'on'){
                    // notify.show("CheckBox required!", "error", 3500);
                    return
                }
            }
        }
    }
        // if(this.state.isDocumentSign){
        //     window.parent.postMessage({"status": "signed", "document": document}, "*");
        // }
        // else{

        //     notify.show("Sign field is required", "error", 3500);
        // }
        // return
     
    
        this.setState({ buttonStart: "Processing...."  ,disableSubmit: true})
        this.postAjaxRequest(window.APIURL + "api/document/add", {
            "id": documentId,
            "status": signerCheck ? "signed" : "inprogress",
            "documentJSON": JSON.stringify(document),
            "signerEmail": this.state.signerEmail
        }).then(function (res) {

            if (res.status === "success") {
                that.postAjaxRequest(window.APIURL + "pdf", {
                    "id": documentId
                }).then(function (res) {
                    if (res.status == "success") {
                        that.setState({ isSuccess: true })
                    }
                });

            }
            else {
                alert("document not signed");
            }
        }).catch(function (error) {
            console.log("");
        });
    }


    handleSubmit(event) {

        let document = this.state.documentFiles;
        let elementId, heightFromTop, orignalHieght, requiredHeight;

        if (window.document.getElementsByClassName('click-to-sign').length > 0) {
            elementId = window.document.getElementsByClassName('click-to-sign')[0].id;
            heightFromTop = window.document.getElementById(elementId).parentElement.parentElement.style.top;
            orignalHieght = parseInt(window.document.getElementsByClassName('published0')[0].clientHeight);
            requiredHeight = (parseFloat(heightFromTop) / 100) * orignalHieght;
        }
       


        if (this.state.isDocumentSign) {
            window.parent.postMessage({ "status": "signed", "document": document }, "*");
        }
        else {

            // notify.show("Sign field is required", "error", 3500);
        }

    }

    updateFieldValue(e, docIndex, innerIndex, fieldName = null, checked = false) {
        var documentFiles = this.state.documentFiles;
        // documentFiles[docIndex].templateFields[innerIndex]= e.target.value;
        
        if (fieldName) {
            documentFiles.map((template, templateIndex) => {
                template.templateFields.map((field, fieldIndex) => {
                    if (fieldIndex === innerIndex ) {
                        field.value = e.target.value;
                    }
                    return null;
                });
                return null;
            })
        }
        else {
            documentFiles[docIndex].templateFields[innerIndex].value = e.target.value;
        }

        this.setState({
            documentFiles: documentFiles
        });

    }

    updateElementName(e, index, innerIndex) {
        var documentFiles = this.state.documentFiles;
        documentFiles[index].templateFields[innerIndex].name = e.target.value;
        this.setState({
            documentFiles: documentFiles
        });
    }

    returnElementBasedOnType(elementType, docIndex, innerIndex, fieldName) {
        
        if (elementType.type === 1) {
            if (this.state.signerEmail === elementType.role) {
                if (this.state.documentFiles[docIndex].templateFields[innerIndex].value) {
                    return (
                        <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
                        <div key={innerIndex} data-document={docIndex} data-field={innerIndex} style={{ width: '100%', height: '100%' }} onClick={(event) => this.onModalShow(event)}>
                            <img src={this.state.documentFiles[docIndex].templateFields[innerIndex].value} alt="broken" style={{ height: '100%' }} />
                        </div>
                     </div> 
                    )
                }
                else {
                    return (
                        <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
                        <div key={innerIndex} data-document={docIndex} data-field={innerIndex} alt="broken" style={{ width: '100%', height: '100%' }} onClick={(event) => this.onModalShow(event)}>
                            <div id={"signaureId" + innerIndex} className="click-to-sign" >Click to sign  {elementType.required == true ? <div className="text-danger">*</div> : ""}</div>
                        </div>
                         </div>
                    )
                }
            } else if (this.state.documentFiles[docIndex].templateFields[innerIndex].value !== "") {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
                    <div key={innerIndex} data-document={docIndex} data-field={innerIndex} style={{ width: '100%', height: '100%' }} >
                        <img src={this.state.documentFiles[docIndex].templateFields[innerIndex].value} alt="broken" style={{ height: '100%' }} />
                    </div>
                    </div>
                )
            }
        }
        else if (elementType.type === 2) {
            if (this.state.signerEmail === elementType.role) {
                if (this.state.documentFiles[docIndex].templateFields[innerIndex].value) {
                    return (
                        <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
                        <div key={innerIndex} data-document={docIndex} data-field={innerIndex} style={{ width: '100%', height: '100%' }} onClick={(event) => this.onModalShow(event)} >
                            <img src={this.state.documentFiles[docIndex].templateFields[innerIndex].value} alt="broken" style={{ height: '100%' }} />
                        </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
                        <div key={innerIndex} data-document={docIndex} data-field={innerIndex} style={{ width: '100%', height: '100%' }} onClick={(event) => this.onModalShow(event)} >
                            {elementType.required == true ? <div className="text-danger">*</div> : ""}
                            <div id={"signaureId" + innerIndex} className="click-to-sign">Click to sign</div>
                        </div>
                        </div>
                    )
                }
            } else if (this.state.documentFiles[docIndex].templateFields[innerIndex].value !== "") {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
                    <div key={innerIndex} data-document={docIndex} data-field={innerIndex} style={{ width: '100%', height: '100%' }} >
                        <img src={this.state.documentFiles[docIndex].templateFields[innerIndex].value} alt="broken" style={{ height: '100%' }} />
                    </div>
                    </div>
                )
            }
        }
        else if (elementType.type === 3) {
            if (this.state.signerEmail === elementType.role) {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
                        {elementType.required == true ? <div className="text-danger">*</div> : ""}
                        <input key={innerIndex} value={this.state.documentFiles[docIndex].templateFields[innerIndex].value ? this.state.documentFiles[docIndex].templateFields[innerIndex].value : ''} placeholder={this.state.documentFiles[docIndex].templateFields[innerIndex].placeholder ? this.state.documentFiles[docIndex].templateFields[innerIndex].placeholder : ''} style={{ width: '100%', height: '100%' }} type="text" readOnly={elementType.role === "me_now" || elementType.role === "me_when_sending" ? true : false} onChange={(e) => this.updateFieldValue(e, docIndex, innerIndex, fieldName)} />
                    </div>
                )
            } else if(this.state.documentFiles[docIndex].templateFields[innerIndex].value !== "") {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
                                <input key={innerIndex}
                                    value={this.state.documentFiles[docIndex].templateFields[innerIndex].value ? this.state.documentFiles[docIndex].templateFields[innerIndex].value : ''}
                                    placeholder={this.state.documentFiles[docIndex].templateFields[innerIndex].placeholder ? this.state.documentFiles[docIndex].templateFields[innerIndex].placeholder : ''}
                                    style={{ width: '100%', height: '100%' }}
                                    type="text" readOnly={elementType.role === "me_now" || elementType.role === "me_when_sending" ? true : true}
                                />
                            </div>
                       
                )
            }
        }
        else if (elementType.type === 4) {
            if (this.state.signerEmail === elementType.role) {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
                        {elementType.required == true ? <div className="text-danger">*</div> : ""}
                        <input key={innerIndex}
                            
                            checked={
                                this.state.documentFiles[docIndex].templateFields[innerIndex].value ==  true ||
                                this.state.documentFiles[docIndex].templateFields[innerIndex].value == "true" ||
                                this.state.documentFiles[docIndex].templateFields[innerIndex].value == "on"
                                ? true : false}  
                            type="checkbox" onChange={(e) => this.updateFieldValue(e, docIndex, innerIndex)} />
                    </div>
                )
            } else if(this.state.documentFiles[docIndex].templateFields[innerIndex].value !== "") {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
                                <input key={innerIndex} checked={
                                    this.state.documentFiles[docIndex].templateFields[innerIndex].value ==  true ||
                                    this.state.documentFiles[docIndex].templateFields[innerIndex].value == "true" ||
                                    this.state.documentFiles[docIndex].templateFields[innerIndex].value == "on"
                                    ? true : false}  disabled={elementType.role === "me_now" ? true : false}
                                    type="checkbox" />
                            </div>
                )
            }

        }
        else if (elementType.type === 5) {
            if (this.state.signerEmail === elementType.role) {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className="particularElementDropped esignElement">
                    <div className="esign-hand-writing" style={{ width: '100%', height: '100%' }}>
                        {elementType.required == true ? <div className="text-danger">*</div> : ""}
                        {moment().format('DD-MM-YYYY')}
                    </div>
                    </div>
                )
            } else if(this.state.documentFiles[docIndex].templateFields[innerIndex].value !== "") {
                return (
                    <div style={{ position: "absolute", left: elementType.x + "%", top: elementType.y + "%", height: elementType.height + "%" }} className=" esignElement">
                    <div className="esign-hand-writing" style={{ width: '100%', height: '100%' }}>
                        {this.state.documentFiles[docIndex].templateFields[innerIndex].value}
                    </div>
                    </div>
                )
            }

        }
    }


    updateFieldRole(e, index, innerIndex) {
        var documentFiles = this.state.documentFiles;
        documentFiles[index].templateFields[innerIndex].role = e.target.value;
        if (e.target.value === "me_now") {
            documentFiles[index].templateFields[innerIndex].initialReadonly = false;
        }
        else {
            documentFiles[index].templateFields[innerIndex].initialReadonly = true;
        }
        this.setState({
            documentFiles: documentFiles
        });
    }

    updateFieldRequirement(e, index, innerIndex) {
        var documentFiles = this.state.documentFiles;
        documentFiles[index].templateFields[innerIndex].required = e.target.checked;

        this.setState({
            documentFiles: documentFiles
        });
    }

    closeEsignpanda(e) {
        e.preventDefault();
        window.parent.postMessage({ "ifram": true }, "*");
    }
    onDrawSignature = (signature) => {
        if (!signature) return;

        let docIndex = this.state.docIndex;
        let fieldIndex = this.state.fieldIndex;
        let documentFiles = this.state.documentFiles;


        documentFiles[docIndex].templateFields[fieldIndex].value = signature;
        this.setState({
            documentFiles: documentFiles,
            isDocumentSign: true,
            isModalOpen: false,
        });

        this.refs.SignPad.resetTabs();
    }


    onModalClose() {
        this.setState({
            isModalOpen: false
        });

        this.refs.SignPad.resetTabs();
    }

    onModalShow(event) {


        let fieldIndex = event.currentTarget.getAttribute("data-field") ? event.currentTarget.getAttribute("data-field") : "";

        let docIndex = event.currentTarget.getAttribute("data-document") ? event.currentTarget.getAttribute("data-document") : "";

        let role = this.state.documentFiles[docIndex].templateFields[fieldIndex].role;

        if (role !== "me_now") {
            this.setState({
                isModalOpen: true,
                docIndex: docIndex,
                fieldIndex: fieldIndex,
            });
        }

        const currentThis = this;

        setTimeout(() => {
            var signaturePad1 = $('#signature-pad').signaturePad({
                drawOnly: true,
                drawBezierCurves: true,
                variableStrokeWidth: true,
                lineTop: 200,
                penColour: '#000',
                bgColour: '#ffffff00',
                penWidth: 4,
                lineColour: '#ffffff00',
                onDrawEnd: function () {
                    currentThis.refs.SignPad.setButtonText("Processing...");
                    setTimeout(function () {

                        var data = signaturePad1.getSignatureImage();
                        if (data) {
                            currentThis.refs.SignPad.onSelectedSignature(data);
                        }

                    }, 1000);
                }
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

    }



    onSignPadCancel = () => {
        this.setState({
            isModalOpen: false,
        });
        this.refs.SignPad.resetTabs();
    }

    declineDocumnet = () => {
        this.setState({
            isSuccess: true
        })
    }
    render() {
        
        var dataItemList = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
        var fontSizeOptions = [];
        for (let i = 8; i <= 30; i += 2) {
            fontSizeOptions.push(<option key={i} vlaue={i}>{i}</option>)
        }

        if (this.state.isSuccess) {
            return <Redirect to='/isSuccess' />;
        }

        if (this.state.isUsed) {
            return <Redirect to='/isUsed' />;
        }

     

    if(!this.state.documentFiles.length)
    return (<div></div>);
        return (
            <div className="pagesContainer">
                {/* <Notifications /> */}
                <div className="esignpanda-header test">
                    <div className="esignpanda-header-menu" data-test-ref="menu-toggle">
                       
                    </div>
                    <img className="esignpanda-logo logo" src={logo} alt="logo not found" />
                    
                    <div className="esignpanda-right-container">
                        <div className="esignpanda-get-started-button-container">
                           
                            {
                                (!this.state.statusSign) ?
                                    <button className="esignpanda-get-started cursor-pointer" 
                                    disabled={this.state.disableSubmit}
                                    onClick={(event) => this.handleSubmitonPage(event)} type="button">
                                        <span>{this.state.buttonStart}</span>
                                    </button> : ""
                            }
                            <br />
                        </div>
                    </div>
                    <div className="three-dots">
                        <button className="btn"><i className="fa fa-bars"></i></button>
                        <ul>
                            <li><a onClick={() => this.isModalOpenDeclineOpen()}>Decline</a></li>
                        </ul>
                    </div>
                </div>
                <div className="esignpanda-body">
                    <div className="esignpanda-signature-document">

                        {
                            (this.state.documentFiles) ? this.state.documentFiles.map((item, docIndex) => {

                                var images = item.templateFiles.map((file, index) => {
                                    return (
                                        <div className="pagesContainer" key={"page-" + index}>
                                            <div key={index} data-item={dataItemList[index]} className={"singlePageRepeaterMain published" + index}>
                                                <div className="singlePageFullHeight">
                                                    <img src={window.APPURL + 'templates/' + file} alt="" className="img-responsive" />
                                                </div>
                                                {
                                                    item.templateFields.map((innerItem, innerIndex) => {
                                                        if (innerItem.page === dataItemList[index]) {
                                                            if (innerItem.type === 5 && innerItem.value == "" ) {
                                                                innerItem.value = moment().format('DD-MM-YYYY');
                                                            }else if (innerItem.type === 5){
                                                                innerItem.value = innerItem.value;
                                                            }
                                                            return (
                                                                <div key={innerIndex} className="box"  >
                                                                        {
                                                                            this.returnElementBasedOnType(innerItem, docIndex, innerIndex, innerItem.name)
                                                                        }
                                                                </div>
                                                            )
                                                        }
                                                        return null;
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                                return images;
                            }) : "No Data Found!"
                        }

                    </div>
                </div>
                <span>
                    <SignPad
                        ref="SignPad"
                        onDrawSignature={this.onDrawSignature}
                        onSignPadCancel={this.onSignPadCancel}
                        isModalOpen={this.state.isModalOpen}
                        onInsertedSavedSignature={this.onInsertedSavedSignature}
                        onModalClose={this.onModalClose}
                        signData={this.state.signData}
                    />
                </span>
                <span>
                    {/* <Declined ref="Declined"
                        signerEmail={this.state.signerEmail}
                        id={this.state.documentId}
                        declineDocumnet={this.declineDocumnet}
                    /> */}
                </span>
            </div>
        );
    }
}

