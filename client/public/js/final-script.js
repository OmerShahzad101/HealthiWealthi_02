
// var hostname = "http://35.177.153.200";
// var hostname2 = "http://35.177.153.200";

var hostname = "https://www.controlfunnel.org.uk";
var hostname2 = "https://www.controlfunnel.org.uk/";

// var hostname = "http://localhost:3000";
// var hostname2 = "http://localhost:3000";

// https://www.esignpanda.com/final-script.js
console.log(hostname);

var eSignPanda = (function() {
    // ------------------------------------------ //
    // Declare private variables and/or functions //
    // __________________________________________ // 
    // recieve message from eSign
    var that = this;
    window.addEventListener('message', function(e)
    {
       if (e.data.status === "rendered"){

            var iframe = document.getElementById('eSignPandaXFrame');
            iframe.contentWindow.postMessage(config.custom_fields, '*');

        }
        else if(e.data.ifram){

            document.getElementById("espEmbeddedWrapper").style.display = "none";
            let documentId = config.documentId;
            var response = {"documentId":documentId};
            config.response = response;
            config.onCancel(config.response);

        }
        else if(e.data.status === 'signed'){

            let documentId = config.documentId;
            var res = eSignPanda.postAjaxRequest(hostname+"/api/document/add", {
                        "id": documentId,
                        "status": "signed",
                        "documentJSON": JSON.stringify(e.data.document),
                    }).then(function(res){ 
                        if(res.status === "success"){

                            eSignPanda.postAjaxRequest(hostname+"/pdf", {
                                "id": documentId
                            }).then(function(res){
                                if(res.status == "success"){

                                    var extraFields = [];
                                    e.data.document[0].templateFields.map((item,index)=>{
                                        if(item.type !== 1 && item.type !== 2){
                                        var key = item.name;
                                        var value = item.value;
                                        var new_arry = {[key]:value};
                                        extraFields.push(new_arry);
                                        }
                                    });
                                    var response = {"documentId":documentId,"pdfUrl":res.data,"fields":extraFields};
                                    config.response = response;
                                    config.onSuccess(config.response);
                                    document.getElementById("espEmbeddedWrapper").style.display = "none";
                                
                                }
                            });
                            
                        }
                        else{
                            alert("document not signed");
                        }
                    }).catch(function(error) {
                        console.log("Error Message", error);
                    });
        }

    }, false);
    // __ __ Schema object __ __ //
    //___________________________//
    var config = {
        test_mode:"",
        documentId:"",
        apiKey:"",
        is_api_exist: false,
        files:[],
        file_url:[],
        title:"",
        subject:"",
        message:"",
        signers:[],
        type:"", // optional
        subject:"", // optional
        message:"", // optional
        skip_me_now:"",
        allow_decline:"",
        response:{},
        templatesArray: [],
        custom_fields:{}, //optional 

        onSuccess:function(){},
        onCancel:function(){},
    }


    return {
        // ------------------------------------------ //
        // Declare private variables and/or functions //
        // __________________________________________ // 
        
        init: function(client_id){
            if(typeof client_id === "string"){
                this.config.client_id = client_id;
            }
            else{
                throw "parameter shoud be a string";
            }
        },

        /**
        *  getAjaxRequest
        *
        * @param {string} url
        * @returns {Object}
        */
        getAjaxRequest: function(url){
            var xhttp = new XMLHttpRequest();
            var response = {};
            xhttp.open("GET", url , true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.onreadystatechange=function() {
              if (this.readyState == 4 && this.status == 200) {
                response.status = "200";
                response.response = JSON.parse(this.responseText);

              }
            };
            xhttp.send();
            return response;
        },

        /**
        *  postAjaxRequest
        *
        * @param {string} url
        * @param {object} id
        * @returns {Promise<Response, Error>}
        */
        postAjaxRequest: function(url, data){
            
            return new Promise(function(resolve, reject) {

                var params = typeof data == 'string' ? data : Object.keys(data).map(
                    function(k) {
                        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
                    }
                ).join('&');         
                
                var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                xhr.open('POST', url);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState>3 && xhr.status==200){       
                        resolve(JSON.parse(xhr.responseText));
                    }
                };
                xhr.onerror = reject;
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(params);
                return xhr;
            });
        },

        /**
        *  setApiKey: This method set the api key
        * 
        * @param {string} apiKey
        * 
        * @returns {}
        */
        setApiKey: function(apiKey, callback){
            if(typeof apiKey === "string" && apiKey){
                config.apiKey = apiKey;
                this.isAppExist(callback);

            }
            else{
                alert("API key should be string value");
                this.renderErrorMessage("API key should be string value");
            }
        },
        /**
        *  setApiKey: This method set the api key
        * 
        * @param {string} apiKey
        * 
        * @returns {}
        */
        setDocumentId: function(documentId){
            if(typeof documentId === "string" && documentId){
                config.documentId = documentId;
            }
            else{
                //alert("Document ID shoud be sting type");
                this.renderErrorMessage("Document ID shoud be sting type");
            }
        },
        /**
        *  setCustomFields: This method set the custom fields
        * 
        * @param {string} apiKey
        * 
        * @returns {}
        */
        setCustomFields: function(customFields){
            
            if(typeof customFields === "object" && customFields){
                config.custom_fields = customFields;
            }
            else{
                alert("Custom Fields shoud be object type");
            }
        },
        
        isAppExist: function(callback){
            var that = this;

            // ## ## CHECK KEY EXIST OR NOT  ## ## //
            var res = this.postAjaxRequest(hostname+"/api/check-api-key", {id: config.apiKey}).then(function(res){
                 
                if(res.status === "success"){
                    if(res.message === "App not found!"){
                        config.is_api_exist = false;
                        callback(false);
                    }
                    else{

                        templatesArray = config.templatesArray;
                        config.is_api_exist = true;
                        callback(true);
                        
                    }
                    
                }
                else{
                }

            }).catch(function(error) {
                console.log("Error Message", error);
                that.renderErrorMessage(error);
              });
        },
        /**
        *  createEmbededSignatureRequest: This method configure the main schema object
        *
        * @param {object} object
        * @param {callback} callback
        * 
        * @returns {}
        */
        createEmbededSignatureRequest: function(object, callback){
               
            var that = this;
            if(typeof object === "object"){
                const keys = Object.keys(object);
        
                keys.map(function(key, index){
                    if(config.hasOwnProperty(key)){
                        
                        config[key] = object[key];
                    }
                });
                
                var res = this.postAjaxRequest(hostname+"/api/document/add", {
                    "title": "this is title",
                    "status":"unsigned",
                    "message": object.message,
                    "subject": object.subject,
                    "signers": JSON.stringify(object.signers),
                    "templates": JSON.stringify(config.templatesArray)
                }).then(function(res){
                    
                    if(res.status === "success"){

                        config.documentId = res.data._id;
                        config.queryString  = hostname2+"/#/API/eSignPanda?API=1.0&id="+res.data._id;
                        callback(true);
                    }
                    else{
                        that.renderErrorMessage("No template found to create document!");
                        callback(false);
                    }

                }).catch(function(error) {
                    console.log("Error Message", error);
                });
                
            }
            else{
                throw "parameter shoud be an object";
            }
        },

        /**
        *  populateFieldsAndGeneratePDF: This method configure the main schema object
        *
        * @param {object} object
        * @param {callback} callback
        * 
        * @returns {}
        */
        populateFieldsAndGeneratePDF: function(object, callback){
            
            var that = this;
            if(typeof object === "object"){
                
                const keys = Object.keys(object);
                keys.map(function(key, index){
                    if(config.hasOwnProperty(key)){
                        config[key] = object[key];
                    }
                });
                
                // __ __ __ _ Generate _ __ __ __//
                // __________ Document __________// 
                if(typeof object.follow_up === "undefined"){
                    object.follow_up = 0;
                    }                       
                that.postAjaxRequest(hostname+"/api/sign-document/add", {
                    "title": "this is title",
                    "status":"unsigned",
                    "appId": config.apiKey,
                    "message": object.message,
                    "subject": object.subject,
                    "follow_up": object.follow_up,
                    "signers": JSON.stringify(object.signers),
                    "templates": JSON.stringify(config.templatesArray),
                    "customFields": JSON.stringify(config.custom_fields),
                    
                }).then(function(res){
                    
                    //var documentId = res.data._id;
                    // __ __ If Documnet Exist __ __//
                    // _____________________________// 
                    if(res.data){
                        var documentId = res.documentId
                        var templatesObjs = res.data;
                        var templatesObj;
                        var customFields = config.custom_fields;
                        
                        templatesObjs.map(function(template, tempIndex){
                            templatesObj = template;
                            // __ __ Fields Map For PDF__ __ //
                            // _____________________________ //
                            templatesObj.templateFields.map(function(fields, index){
                                if(fields.name){
                                    fields.value = customFields[fields.name] ? customFields[fields.name]: ""
                                }
                            })
                        });
                        if(res.status === "success"){
                            // __ __ PDF Generation __ __ //
                            // __________________________ //
                            
                            var repetitiveTemplates = customFields.repetitiveTemplates;
                            eSignPanda.postAjaxRequest(hostname+"/pdf", {
                                "id": documentId,
                                "appId": config.apiKey,
                                "repetitiveTemplates": repetitiveTemplates
                            }).then(function(res){
                                if(res.status == "success"){

                                    var extraFields = [];
                                    templatesObj.templateFields.map((item,index)=>{
                                        if(item.type !== 1 && item.type !== 2){
                                            var key = item.name;
                                            var value = item.value;
                                            var new_arry = {[key]:value};
                                            extraFields.push(new_arry);
                                        }
                                    });
                                    console.log("templatesObj", templatesObj);

                                    var response = {"documentId":documentId,"pdfUrl":res.data,"fields":extraFields};
                                    config.response = response;
                                    config.onSuccess(config.response);
                                    callback(res.data);
                                    
                                
                                }
                            });
                        }
                        else{
                            alert("document not signed");
                        }                                
                        
                        //
                    } // end if
                    else{
                        throw "Document ID is not valid.";
                    }

                }).catch(function(error) {
                    console.log("Error Message", error);
                    that.renderErrorMessage(error);
                });
                
            }
            else{
                throw "parameter shoud be an object";
                emailDocumentRequest           }
        },

        emailDocumentRequest: function(object, callback){
            var that = this;
            if(typeof object === "object"){
                
                const keys = Object.keys(object);
                keys.map(function(key, index){
                    if(config.hasOwnProperty(key)){
                        config[key] = object[key];
                    }
                });
                
                // __ __ __ _ Generate _ __ __ __//
                // __________ Document __________//   
                                     
                that.postAjaxRequest(hostname+"/api/sign-document/add", {
                    "title": "this is title",
                    "status":"unsigned",
                    "appId": config.apiKey,
                    "status":"unsigned",
                    "message": object.message,
                    "subject": object.subject,
                    "signers": JSON.stringify(object.signers),
                    "templates": JSON.stringify(config.templatesArray),
                    "customFields": JSON.stringify(config.custom_fields),
                    
                }).then(function(res){
                    
                    //var documentId = res.data._id;
                    // __ __ If Documnet Exist __ __//
                    // _____________________________// 
                    if(res.data){

                        if(res.status === "success"){
                            // __ __ PDF Generation __ __ //
                            // __________________________ //
                            
                            console.log(hostname);
                            console.log(res.documentId);
                            eSignPanda.postAjaxRequest(hostname+"/api/documentRequest", {
                                "id": res.documentId,
                                "appId": config.apiKey,
                            }).then(function(res){

                                
                                if(res.status == "success"){

                                   

                                    var response = {"documentId": res.documentId};
                                    config.response = response;
                                    config.onSuccess(config.response);
                                    callback(true);
                                    
                                
                                }
                            });
                        }
                        else{
                            alert("document not signed");
                        }                                
                        
                        //
                    } // end if
                    else{
                        throw "Document ID is not valid.";
                    }

                }).catch(function(error) {
                    console.log("Error Message", error);
                    that.renderErrorMessage(error);
                });
                
            }
            else{
                throw "parameter shoud be an object";
            }
        },

        regenerateMultipleDocument:async function(documentsIds, callback){   
                     
            console.log(documentsIds);
            var that = this;
            if(typeof documentsIds === "object"){
                
                console.log(documentsIds);
                    //var documentId = res.data._id;
                    // __ __ If Documnet Exist __ __//
                    // _____________________________// 
                    var resDocuments = [];
                    if(documentsIds.length > 0){
                        for(var i = 0 ; documentsIds.length > i ; i++){
                            // __ __ PDF Generation __ __ //
                            // __________________________ //
                            var id =  documentsIds[i];
                            eSignPanda.postAjaxRequest(hostname+"/pdf", {
                                "id":  id,
                                "appId": config.apiKey,
                            }).then(async function(res){
                                if(res.status == "success"){
                                    var data = await resDocuments.push(res);
                                    // var response = {"documentId": res.documentId};
                                    // config.response = response;
                                    // config.onSuccess(config.response);
                                    // callback(true);
                                    console.log(res);
                                    if(documentsIds.length == i){
                                        config.response = resDocuments;
                                        config.onSuccess(config.response);
                                        callback(true);
                                    }
                                }
                            });
                        }                               
                        //
                    } // end if
                    else{
                        throw "Document ID is not valid.";
                    }
            }
            else{
                throw "parameter shoud be an object";
            }
        },

        /**
        *  fieldsPreviewOnForms: This method configure the main schema object
        *
        * @param {object} object
        * @param {callback} callback
        * 
        * @returns {}
        */
        fieldsPreviewOnForms: function(object, callback){
            var that = this;
            if(typeof object === "object"){
                
                const keys = Object.keys(object);
                keys.map(function(key, index){
                    if(config.hasOwnProperty(key)){
                        config[key] = object[key];
                    }
                });
                
                var pairs = config.templatesArray.map(function (value) { return "id=" + encodeURIComponent(value) });
                var query_string = pairs.join("&");
                config.queryString  = hostname2+"/#/API/eSignPanda2?API=1.0&"+query_string;
                that.renderFram();
                callback(true);
                
            }
            else{
                throw "parameter shoud be an object";
            }
        },
        oldpopulateFieldsAndGeneratePDF: function(object, callback){
            var that = this;
            if(typeof object === "object"){
                
                const keys = Object.keys(object);
                keys.map(function(key, index){
                    if(config.hasOwnProperty(key)){
                        config[key] = object[key];
                    }
                });

                // __ __ Generate Document __ __ //
                // _____________________________ //
                var res = this.postAjaxRequest(hostname+"/api/document/add", {
                    "title": "this is title",
                    "status":"unsigned",
                    "templates": JSON.stringify(config.templatesArray)
                }).then(function(res){
 
                    if(res.status === "success"){
                        
                        config.documentId = res.data._id;

                        // __ __ Get Templates in  __ __//
                        // __________ Document _________//                        
                        var res = that.postAjaxRequest(hostname+"/api/templates/get", {
                            "id": res.data._id,
                        }).then(function(res){

                            // __ __ If Documnet Exist __ __//
                            // _____________________________// 
                            if(res.data){
                                console.log("res.data.templateObjects",res.data.templateObjects)

                                var templatesObjs = res.data.templateObjects;
                                var templatesObj;
                                var customFields = config.custom_fields;
                                templatesObjs.map(function(template, tempIndex){
                                    templatesObj = template;
                                    // __ __ Fields Map __ __ //
                                    // ______________________ //
                                    templatesObj.templateFields.map(function(fields, index){
                                        if(fields.name){
                                            fields.value = customFields[fields.name] ? customFields[fields.name]: ""
                                        
                                        }
                                        
                                    })

                                });                                
                                
                                var res = eSignPanda.postAjaxRequest(hostname+"/api/document/add", {
                                    "id": res.data._id,
                                    "status": "signed",
                                    "documentJSON": JSON.stringify(templatesObjs),
                                }).then(function(res){ 
                                    if(res.status === "success"){
                                        // __ __ PDF Generation __ __ //
                                        // __________________________ //
                                        eSignPanda.postAjaxRequest(hostname+"/pdf", {
                                            "id": config.documentId
                                        }).then(function(res){
                                            if(res.status == "success"){
            
                                                var extraFields = [];
                                                templatesObj.templateFields.map((item,index)=>{
                                                    if(item.type !== 1 && item.type !== 2){
                                                        var key = item.name;
                                                        var value = item.value;
                                                        var new_arry = {[key]:value};
                                                        extraFields.push(new_arry);
                                                    }
                                                });

                                                var response = {"documentId":config.documentId,"pdfUrl":res.data,"fields":extraFields};
                                                config.response = response;
                                                config.onSuccess(config.response);
                                                callback(true);
                                                
                                            
                                            }
                                        });
                                    }
                                    else{
                                        alert("document not signed");
                                    }
                                }).catch(function(error) {
                                    console.log("Error Message", error);
                                });
                                //
                            } // end if
                            else{
                                throw "Document ID is not valid.";
                            }
        
                        }).catch(function(error) {
                            console.log("Error Message", error);
                            that.renderErrorMessage(error);
                        });
                        
                    }
                    else{
                        that.renderErrorMessage("No template found to create document!");
                        callback(false);
                    }

                }).catch(function(error) {
                    console.log("Error Message", error);
                });
                
            }
            else{
                throw "parameter shoud be an object";
            }
        },
        /**
        *  open: This method open the eSignPanda ifram
        *
        * @param {object} object
        * 
        */
        open:function(object){
            
            var that = this;
            if(this.apiKey !== ""){
                if(typeof object === 'object'){
                    if(config.is_api_exist){
                        if(config.documentId){
                            
                            var res = this.postAjaxRequest(hostname+"/api/document/get", {
                                "id": config.documentId,
                            }).then(function(res){ 
                                console.log(res);
                                if(res.data){
                                    if(res.status === "success" && res.data.status === "signed"){

                                    }
                                    else{
  
                                        config.queryString  = hostname2+"/#/API/eSignPanda?API=1.0&id="+config.documentId;
                                        console.log(config.queryString);
                                        that.renderFram();
                                        
                                    }
                                }
                                else{
                                    throw "Document ID is not valid.";
                                }
            
                            }).catch(function(error) {
                                console.log("Error Message", error);
                                that.renderErrorMessage(error);
                            });

                            
                        }
                        
                       // document.getElementById('eSignPandaXFrame').src = config.queryString;
                    
                    }
                    else{
                            throw "Your API key is not valid.";
                            that.renderErrorMessage("Your API key is not valid.");
                    }
                }else{
                    throw "parameter shoud be an object";
                }   
            }
            else{
                throw "Not Authorized";
            }
        },
        cancel:function(){
            var that = this;
            if(this.apiKey !== ""){
                if(config.is_api_exist){
                    if(config.documentId){
                        var res = this.postAjaxRequest(hostname+"/api/document/cancel", {
                            "id": config.documentId,
                        }).then(function(res){ 
                            if(res.status === "success" && res.data.status === "canceled"){
                                console.log("Document canceled");
                            }else{
                                console.log("Document not canceled");
                            }
        
                        }).catch(function(error) {
                            console.log("Error Message", error);
                        });
                    }
                }
                else{
                        throw "Your API key is not valid.";
                }
            }
            else{
                throw "Not Authorized";
            }
        },
        delete:function(){
            var that = this;
            if(this.apiKey !== ""){
                if(config.is_api_exist){
                    if(config.documentId){
                        var res = this.postAjaxRequest(hostname+"/document/del", {
                            "_id": config.documentId,
                        }).then(function(res){ 
                            if(res.status === "success"){
                                console.log("Document Deleted");
                            }else{
                                console.log("Document not Deleted");
                            }
        
                        }).catch(function(error) {
                            console.log("Error Message", error);
                        });
                    }
                }
                else{
                        throw "Your API key is not valid.";
                }
            }
            else{
                throw "Not Authorized";
            }
        }, 
        sendReminderEmail:function(){
            var that = this;
            if(this.apiKey !== ""){
                if(config.is_api_exist){
                    if(config.documentId){
                        
                        var res = this.postAjaxRequest(hostname+"/api/documentRequest", {
                            "id": config.documentId,
                        }).then(function(res){ 
                            
                            if(res.status === "success"){
                                console.log("Email Send Successfully!");
                            }else{
                                console.log("Email not Send!");
                            }
        
                        }).catch(function(error) {
                            console.log("Error Message", error);
                        });
                    }
                }
                else{
                        throw "Your API key is not valid.";
                }
            }
            else{
                throw "Not Authorized";
            }
        },
        sendBulkReminderEmail:function(documentIds){
            
            var that = this;
            if(this.apiKey !== ""){
                if(config.is_api_exist){
                        
                        var res = this.postAjaxRequest(hostname+"/api/email/remind", {
                            "documents": documentIds,
                            "check": "Selected"
                        }).then(function(res){ 
                            
                            if(res.status === "success"){
                                console.log("Email Send Successfully!");
                            }else{
                                console.log("Email not Sent");
                            }
        
                        }).catch(function(error) {
                            console.log("Error Message", error);
                        });
                }
                else{
                        throw "Your API key is not valid.";
                }
            }
            else{
                throw "Not Authorized";
            }
        },
        renderFram: function(){
            var alreadyExist = document.getElementById("espEmbeddedWrapper");
            
            if(alreadyExist === null){
                var Div = document.createElement("div");
                Div.setAttribute("id", "espEmbeddedWrapper");
                Div.style.cssText = 'position:absolute;top:0;left:0px; right:0px;z-index:9998;width:95%; height:600px;margin:0 auto;';
                document.body.appendChild(Div);
            }
            var Ifram = document.createElement("iframe");
            Ifram.setAttribute("id", "eSignPandaXFrame");
            Ifram.setAttribute("src", config.queryString);
            Ifram.style.width = "100%";
            Ifram.style.height = "100%";
            Ifram.style.border ="none";

            document.getElementById("espEmbeddedWrapper").appendChild(Ifram);
        },
        renderErrorMessage: function(errorMesssage){
            var Div = document.createElement("div");
            Div.setAttribute("id", "errorMessage");
            Div.style.cssText = 'border: none; z-index: 99999; position:absolute; left: 50%; top: 90px; width:65%; transform: translateX(-50%); text-align: center; background:#f1cbcb; color: #ff0000; border-radius:5px';

            var Paragraph = document.createElement("P");
            var Text = document.createTextNode(errorMesssage);
            Paragraph.appendChild(Text);
            Div.appendChild(Paragraph);
            document.body.appendChild(Div);
        },
        renderLoader: function(){
            var Div = document.createElement("div");
            Div.setAttribute("id", "loading");
            Div.style.cssText = 'width:100%; height:100%; top:0; left:0; position:fixed; display:flex; opacity:0.7; align-items: center; justify-content: center; background-color: #fff; z-index: 99999; text-align: center;';
    
        
            var Img = document.createElement("img");
            Img.setAttribute("id", "loading-image");
            Img.setAttribute("src", hostname+"/loader.svg");
            Img.setAttribute("alt", "Loading...");
            
            Div.appendChild(Img);
            document.body.appendChild(Div);
            
        },
        removeElement(elementId) {
            var element = document.getElementById(elementId);
            element.outerHTML = '';
        },
        getSignatureRequest : function(signature_request_id) {
            return signature_request_response;
        }
    };

})();

//console.log(eSignPanda.getAjaxRequest("https://jsonplaceholder.typicode.com/todos/1"));


