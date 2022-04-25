import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import Toast from "../../../common/toast/Toast";
import { setInfoData } from "../../../../store/slices/user";
import { useHistory } from "react-router-dom";
import {
  CLIENT_PROFILE_SETTING,
  COACH_PROFILE_SETTING,
} from "../../../../router/constants/ROUTES";
import validate from "../../../../utils/form-validation/authFormValidation";
import {
  getHttpRequest,
  postHttpRequest,
  putHttpRequest,
} from "../../../../axios";
import { setUser, setAccessToken } from "../../../../store/slices/auth";
import GoogleLogin from "react-google-login";

const LoginWithGoogle = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const typeRef = useRef();

  const [show, setShow] = useState(false);
  const [_id, setId] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const accociatedCoach = localStorage.getItem("accociatedCoach");

  const handleLogin = async (response) => {
    try {
      postHttpRequest("/front/auth/googleLogin", {
        tokenId: response.tokenId,
        accociatedCoach
      }).then((response) => {
        if (response.status === 200) {
          if (response?.data?.user?.type === 0) {
            dispatch(setAccessToken(response.data.accessToken));
            setId(response.data.user._id);
            setShow(true);
          } else {
            getHttpRequest(
              `/front/coach/get/${response?.data?.user?._id}`
            ).then((res) => {
              if (res) {
                const userData = {
                  response: response.data.user,
                  res: res?.data.coach,
                };

                dispatch(setUser(userData));
                dispatch(setAccessToken(response.data.accessToken));
                if (response?.data?.user?.type === 1) {
                  history.replace(CLIENT_PROFILE_SETTING);
                } else if (response?.data?.user?.type === 3) {
                  history.replace(COACH_PROFILE_SETTING);
                }
              } else {
                Toast.fire({
                  icon: "error",
                  title: response.data.message,
                });
                return;
              }
            });
          }
        }
      });
    } catch (e) {
      setIsLoading(false);
      Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };
  const handleFail = (googleData) => {
    console.log(googleData);
  };
  const loginGmailHanlder = async (event) => {
    event.preventDefault();
    debugger;
    const type = typeRef.current.value;

    const payload = {
      _id,
      type,
      accociatedCoach,
    };

    const errors = validate(payload);

    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...errors });
      return;
    } else {
      setValidationErrors({});
    }
    setIsLoading(true);

    try {
      let response = await putHttpRequest("/front/auth/role", payload);
      console.log("/front/auth/role", response);
      if (!response) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
        return;
      }

      if (response.data.coach.isEmailVerified === true) {
        debugger;
        setIsLoading(false);
        let res = await getHttpRequest(
          `/front/coach/get/${response?.data?.coach?._id}`
        );
        if (res) {
          const userData = {
            response: response.data.coach,
            res: res?.data.coach,
          };
          dispatch(setUser(userData));

          if (response?.data?.coach?.type === 1) {
            history.replace(CLIENT_PROFILE_SETTING);
          } else if (response?.data?.coach?.type === 3) {
            history.replace(COACH_PROFILE_SETTING);
          }
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
          return;
        }
      }
    } catch (e) {
      setIsLoading(false);
      Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Continue with google"
        className=" btn btn-google btn-block "
        onSuccess={handleLogin}
        onFailure={handleFail}
        cookiePolicy="single_host_origin"
      ></GoogleLogin>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Kindly select your role
          <div className="form-floating mb-4">
            <select className="form-select" ref={typeRef}>
              <option value="" selected disabled>
                Open this select menu
              </option>
              <option name="3" value="3">
                Coach
              </option>
              <option name="1" value="1">
                Client
              </option>
            </select>
            <label>Register as a</label>
            <span className="errors">{validationErrors?.type}</span>
          </div>
          <Button onClick={loginGmailHanlder}>Submit</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginWithGoogle;
