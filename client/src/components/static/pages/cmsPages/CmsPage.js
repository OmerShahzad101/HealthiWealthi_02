import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHttpRequest } from "../../../../axios";
import { Spinner } from "react-bootstrap";

const CmsPage = () => {
  const [cmsPage, setCmsPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const slug = location.search.substring(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    getHttpRequest(`/admin/cms/get/${slug}`)
      .then((response) => {
        if (!response) {
          console.log("Something went wrong with response...");
          return;
        }
        if (response?.data?.success === true) {
          setIsLoading(false);
          setCmsPage(response?.data?.cms);
        } else {
          setIsLoading(false);
          console.log(response.data.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
        console.log("Something went wrong...");
      });
  }, [location]);

  return (
    <div className="p-0 container-fluid">
      <div className="website-banner container-fluid"></div>
      {isLoading ? 
        <Spinner className="my-5" animation="grow" style={{display:"block", margin: "auto"}}/>
       : 
        <div className="our-team py-5 container">
          <div className="trending-property">
            <p>WE HAVE PROFESSIONAL AGENTS</p>
            <h3>{cmsPage?.name}</h3>
          </div>
          <div dangerouslySetInnerHTML={{ __html: cmsPage?.content }} />
        </div>
      }
    </div>
  );
};

export default CmsPage;
