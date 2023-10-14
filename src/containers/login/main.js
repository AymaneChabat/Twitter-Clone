import React from "react";
import SocialButton from "../../components/buttons/thirdparty";
import {
  IconTwitter,
  IconApple,
  IconGoogle,
} from "../../components/icons/logos";
import { useNavigate } from "react-router";

const Main = () => {
  const navigate = useNavigate();

  const data = [
    ["Google", <IconGoogle />],
    ["Apple", <IconApple />],
  ];

  return (
    <div className="flex-grow flex items-center justify-center w-[80%] mx-auto s10:w-[100%]">
      <div className="h-[90%] s10:w-[75rem] s10:flex items-center justify-between">
        <div className="h-[12%] s10:h-[auto]">
          <IconTwitter clas={"w-[45px] s10:w-[25rem]"} />
        </div>
        <div className="h-[90%] flex flex-col justify-between s10:h-[75%]">
          <h1 className="font-bold font-chirpextended text-[40px] break-word s5:text-[55px] s10:text-[64px] s10:tracking-tight dark:text-[#ffffff]">
            Happening now
          </h1>
          <div className="h-[85%] flex flex-col justify-around s5:h-[450px] s6:h-[85%]">
            <div className="w-[300px] h-[80%]">
              <div className="h-[70%] flex flex-col justify-between s10:justify-around s10:h-[90%]">
                <h2 className="font-bold font-chirpextended text-[24px] s5:text-[40px] dark:text-[#ffffff]">
                  Join today.
                </h2>
                {data.map((pick, index) => (
                  <SocialButton key={index} pick={pick} />
                ))}
                <span className="flex justify-between items-center dark:text-[#ffffff]">
                  <hr className="w-[35%]" />
                  or
                  <hr className="w-[35%]" />
                </span>
                <button
                  type="button"
                  class="text-white w-[100%] text-md bg-[#1d9bf0] hover:bg-[#1a8cd8] font-bold rounded-full text-sm py-2.5 transition duration-300 block"
                  onClick={() => {
                    navigate("/i/flow/signup");
                  }}
                >
                  Create account
                </button>
                <p className="text-[11px] w-[100%] leading-tight text-[#000000]/[.7] dark:text-[#ffffff]">
                  By signing up, you agree to the{" "}
                  <a href="#" className="text-[#1d9bf0]">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#1d9bf0]">
                    Privacy Policy
                  </a>
                  , including{" "}
                  <a href="#" className="text-[#1d9bf0]">
                    Cookie Use
                  </a>
                  .
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-[17.5px] font-medium mb-3.5 dark:text-[#ffffff]">
                Already have an account?
              </h2>
              <button
                type="button"
                class="text-[#1d9bf0] w-[300px] text-md bg-white hover:bg-[#1d9bf0]/[.1] font-medium rounded-full text-sm py-2.5 transition duration-300 border border-solid"
                onClick={() => {
                  navigate("/i/flow/login");
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
