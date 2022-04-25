import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillCopy } from "react-icons/ai";

import {
  EmailShareButton,
  FacebookShareButton,
  EmailIcon,
  FacebookIcon,
} from "react-share";

const ReferenceLink = () => {
  const userid = useSelector((state) => state.auth.user.userid);
  const [isCopied, setIsCopied] = useState(false);

  const profileUrl = `https://healthiwealthi.arhamsoft.org/coach-profile/${userid}`;

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(profileUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="card contact-card">
        <div className="card-body">
          <h4 className="card-title">Profile URL</h4>
          <h5 className="text-muted">
            Copy your profile url and share it with people so they can avail
            your services
          </h5>
          <div className="row form-row my-4">
            <div className="col-md-8 position-relative">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  value={profileUrl}
                  readOnly
                />
                <label>Profile URL</label>
              </div>

              <button
                className={`copy-link-btn ${isCopied}`}
                onClick={handleCopyClick}
              >
                {<AiFillCopy size={28} />}
                <span>{isCopied ? "Copied!" : ""}</span>
              </button>
            </div>
            <div className="col-md-12">
              <h5 className="text-muted mt-4 mb-3">
                Share your profile on your social handles
              </h5>
              <FacebookShareButton url={profileUrl} className="me-2">
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <EmailShareButton url={profileUrl} className="me-2">
                <EmailIcon size={36} round />
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferenceLink;
