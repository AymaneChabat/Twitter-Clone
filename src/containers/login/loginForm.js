import React, { useEffect, useRef, useState } from 'react';
import { IconGoogle, IconApple } from "../../components/icons/logos"
import SocialButton from "../../components/buttons/thirdparty"
import CredentialInput from '../../components/inputs/credentials';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import CredentialButton from '../../components/buttons/credentials';

const LoginForm = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const data = [
        ["Google", <IconGoogle />],
        ["Apple", <IconApple />]
    ]

    const [form, setForm] = useState()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
    const nextFlow = () => {
        if (validateEmail(email.current.value)) {
            setForm(<SignIn2 email={email}/>)
        } else {
            return false
        }
    }

    
    const email = useRef("")
    const password = useRef("")


    const SignIn1 = () => (
        <div className='w-full h-[92%] flex flex-col justify-center items-center'>
            <div className='w-[370px] h-[600px] flex-col flex'>
                <div className='h-[73%] flex-col justify-between flex'>
                    <h1 className='font-chirp font-bold text-[30px] text-[#000000]/[.8]'>Sign in to X</h1>
                    {data.map((pick, index) => (
                            <SocialButton key={index} pick={pick}/>
                        ))}
                    <span className='flex justify-between items-center text-[20px] font-chirp'><hr className='w-[42%]'/>or<hr className='w-[42%]'/></span>
                     <CredentialInput placeholder="Email" reff={email}/>
                     <CredentialButton text={"Next"} action={nextFlow}/>
                    <div className='text-[#000000] border hover:bg-[#000000]/[.1] text-center font-bold font-twitterchirp py-2 rounded-full cursor-pointer transition-all duration-300' onClick={()=>{navigate("/i/flow/resetPassword")}}>
                        Forgot password?
                    </div>
                </div>
                <div className='h-[25%] relative'>
                    <span className='text-[#536471] text-[18px] font-twitterchirp absolute top-16'>Don't have an account? <button className='text-[#1d9bf0] hover:underline' onClick={()=>{navigate("/i/flow/signup")}}>Sign up</button></span>
                </div>
            </div>
        </div>
    )

    const SignIn2 = ({email}) => {
        const e = email.current.value
        return (
        <div className='w-[85%] h-[90%] mx-auto flex flex-col justify-between'>
            <div className='h-[26%] flex flex-col justify-between'>
                <h1 className='font-bold font-twitterchirp text-[25px]'>Enter your password</h1>
                <div className='flex flex-col py-4 px-2'>
                    <span className='text-[#536471]/[.6] font-chirp'>Email</span>
                    <span className='text-[20px] text-[#536471]/[.6] font-chirp'>{e}</span>
                </div>
                <div>
                    <CredentialInput placeholder="Password" password={true}  reff={password}/>
                    <button className='text-[#1d9bf0] hover:underline' onClick={()=>{navigate("/i/flow/resetPassword")}}>Forgot password?</button>
                </div>
            </div>
            <div className='h-[18%] flex flex-col justify-evenly '>
                <CredentialButton text={"Sign in"} action={()=>{dispatch(logIn(e, password.current.value))}}/>
                <span className='text-[#536471] text-[18px] font-twitterchirp'>Don't have an account? <button className='text-[#1d9bf0] hover:underline' onClick={()=>{navigate("/i/flow/signup")}}>Sign up</button></span>
            </div>
        </div>
    )}


    useEffect(()=>{
        setForm(<SignIn1 />)
    },[])


    return (
        <>
        {form}
        </>
    );
};

export default LoginForm;
