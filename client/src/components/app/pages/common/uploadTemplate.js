import { useEffect, useState } from "react";

import Toast from "../../../common/toast/Toast";
import TopProgressBar from "../../../common/top-progress-bar/TopProgressBar";

import {
  cancelOngoingHttpRequest,
  postHttpRequest,
} from "../../../../axios/index";

import imageExist from "../../../../utils/url/imageExist";

const UploadTemplate = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [showErrors, setShowErrors] = useState('');
  const [uploadingMessage,  setUploadingMessage] = useState('');
  
  useEffect(() => {
    // Cancel company creation HTTP call in case component is unmounted due to route change
    return cancelOngoingHttpRequest;
  }, []);

  const onChangeImage = async (e) => {
    if (!e.target.files || !e.target.files.length) return;
    const files = e.target.files;

    let _objFiles = files[0];
    console.log(_objFiles);

    if (_objFiles.size > 1000000) {
        Toast.fire({
            icon: 'error',
            title: 'File too Big, please select a file less than 1MB ',
        });
        return;
    }

    if (files == undefined || files == null) {
        return
    }
    
    setTimeout(function () {
        if (isLoading) {
            setUploadingMessage("Converting file, please hold on...");
        }
        else {
            setUploadingMessage("Uploading File...");
        }
    }, 3000);
    const formData = new FormData();
    var selectedFileNames = [];
    for (var x = 0; x < files.length; x++) {
        selectedFileNames.push(files[x].name);
        formData.append('fileToUpload[]', files[x], files[x].name);
    }
    var fileType = e.target.files[0].type;
    if (fileType === "application/pdf") {
    } else {
        setShowErrors(true);
        setShowErrors("The file you are trying to upload is not allowed, please upload PDF file.")
        return
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
          setShowErrors('');
          setUploadingMessage('');
          
          props.arraySet(response.data.data.filesArray);
          props.setTemplateId(response.data.data.template._id);
          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
        } else {

            setUploadingMessage('');
            setShowErrors(response.data.message);
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

  
}

  let fileUploadContent = (
    <>
      <div className="">
      </div>
    </>
  );

  

  return (
    <>
      <TopProgressBar show={isLoading} />
        <div className="col-md-12">
          <div className={` custom-upload dgCards`}>
            <div className="">{fileUploadContent}</div>
            <div className="content">
              <img src="/images/upload.svg" alt="Upload" className="upload-icon img-fluid"/>
              <label className="btn" htmlFor="upload-photo">
                Change Logo
              </label>
              <span>Format : PDF</span>
              <input
                type='file'
                id="FileId" 
                name="templateFile[]"  
                accept=".pdf" 
                onChange={onChangeImage} 

                className=""
              />
            </div>
          </div>
        </div>
    </>
  );
};

export default UploadTemplate;
