import React, { useState } from "react";
import { AiFillCopy } from "react-icons/ai";
const ReferenceLink = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
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
            <div className="col-md-6 position-relative">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  value={copyText}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferenceLink;
