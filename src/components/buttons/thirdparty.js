
function SocialButton({pick}) {
    return (
        <button type="button" class={pick[0] === 'Google' ? "border-solid border border-[#e6e6e6] rounded-full flex justify-center w-[100%] items-center text-[#3c4043]/[.8] bg-[#FFFFFF] transition ease-in-out duration-300 hover:bg-[#e6e6e6] text-[13px] font-googlefont py-2" : "border-solid border border-[#e6e6e6] rounded-full flex justify-center w-[100%] items-center text-black bg-[#FFFFFF] transition ease-in-out duration-300 hover:bg-[#e6e6e6] font-medium text-sm py-2"}>
            {pick[1]}
            <span className="pl-2">Sign up with {pick[0]}</span>
        </button>
    );
  }
  
  export default SocialButton;
  