import React, { useEffect, useRef, useState } from "react";
import { IconGoogle, IconApple } from "../../components/icons/logos";
import SocialButton from "../../components/buttons/thirdparty";
import CredentialInput from "../../components/inputs/credentials";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import CredentialButton from "../../components/buttons/credentials";
import { setError } from "../../redux/actions/errorActions";

const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const data = [
    ["Google", <IconGoogle />],
    ["Apple", <IconApple />],
  ];

  const [form, setForm] = useState();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const nextFlow = () => {
    if (validateEmail(credentials.current.email)) {
      setForm(<SignIn2 email={credentials.current.email} />);
    } else {
      dispatch(
        setError(
          "Please enter a valid email address. The email address you provided does not appear to be in the correct format (e.g., example@example.com). Please check and try again"
        )
      );
    }
  };

  const credentials = useRef({ email: "", password: "" });

  const SignIn1 = () => (
    <div className="w-full h-[92%] flex flex-col justify-center items-center">
      <div className="w-[370px] h-[600px] flex-col flex">
        <div className="h-[73%] flex-col justify-between flex">
          <h1 className="font-chirp font-bold text-[30px] text-[#000000]/[.8] dark:text-[#ffffff]">
            Sign in to X
          </h1>
          {data.map((pick, index) => (
            <SocialButton key={index} pick={pick} />
          ))}
          <span className="flex justify-between items-center text-[20px] font-chirp dark:text-[#ffffff]">
            <hr className="w-[42%]" />
            or
            <hr className="w-[42%]" />
          </span>
          <CredentialInput
            placeholder="Email"
            ref={credentials}
            refKey={"email"}
          />
          <CredentialButton text={"Next"} action={nextFlow} />
          <CredentialButton
            action={() => {
              navigate("/i/flow/resetPassword");
            }}
            text={"Forgot password?"}
            light={true}
          />
        </div>
        <div className="h-[25%] relative">
          <span className="text-[#536471] text-[18px] font-twitterchirp absolute top-16">
            Don't have an account?{" "}
            <button
              className="text-[#1d9bf0] hover:underline"
              onClick={() => {
                navigate("/i/flow/signup");
              }}
            >
              Sign up
            </button>
          </span>
        </div>
      </div>
    </div>
  );

  const SignIn2 = () => {
    const e = credentials.current.email;
    return (
      <div className="w-[85%] h-[90%] mx-auto flex flex-col justify-between">
        <div className="h-[26%] flex flex-col justify-between">
          <h1 className="font-bold font-twitterchirp text-[25px] dark:text-[#ffffff]">
            Enter your password
          </h1>
          <div className="flex flex-col py-4 px-2">
            <span className="text-[#536471]/[.6] font-chirp">Email</span>
            <span className="text-[20px] text-[#536471]/[.6] font-chirp">
              {e}
            </span>
          </div>
          <div>
            <CredentialInput
              placeholder="Password"
              password={true}
              ref={credentials}
              refKey={"password"}
            />
            <button
              className="text-[#1d9bf0] hover:underline mt-2"
              onClick={() => {
                navigate("/i/flow/resetPassword");
              }}
            >
              Forgot password?
            </button>
          </div>
        </div>
        <div className="h-[18%] flex flex-col justify-evenly ">
          <CredentialButton
            text={"Sign in"}
            action={() => {
              dispatch(logIn(e, credentials.current.password));
            }}
          />
          <span className="text-[#536471] text-[18px] font-twitterchirp">
            Don't have an account?{" "}
            <button
              className="text-[#1d9bf0] hover:underline"
              onClick={() => {
                navigate("/i/flow/signup");
              }}
            >
              Sign up
            </button>
          </span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setForm(<SignIn1 />);
  }, []);

  return <>{form}</>;
};

export default LoginForm;
