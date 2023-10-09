
function CredentialButton({text, action, light}) {
    return (
            <div className={(light ? "border-[#000000] border hover:bg-[#000000]/[.1] hover:border-[#ffffff] dark:bg-[#ffffff]": "text-[#ffffff] bg-[#000000]/[.9] hover:bg-[#000000]/[.8] border") + ' text-[16px] text-center py-2 rounded-full cursor-pointer transition-all duration-300'} onClick={action}>{text}</div>
    );
  }
  
  export default CredentialButton;
  