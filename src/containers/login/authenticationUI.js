import React, { useRef } from 'react';
import LoginForm from './loginForm';
import IconTwitter from '../../components/icons/logos/twitter-icon';
import DeleteIcon from '../../components/icons/posts/delete';
import CredentialInput from '../../components/inputs/credentials';
import { Routes, Route, useNavigate } from 'react-router';
import { resetPassword, signUp } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const AuthUI = () => {

    const email = useRef("")
    const password = useRef("")
    const name = useRef("")
    const username = useRef("")

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
    const PasswordReset = () => (
        <div className='w-[85%] h-[90%] mx-auto flex flex-col justify-between'>
            <div className='h-[20%] flex flex-col justify-between min-h-[150px]'>
                <div>
                    <h1 className='font-bold font-chirp text-[27px]'>Enter your password</h1>
                    <span className='text-[#536471] text-[18px] font-chirp leading-3'>Enter the email associated with your account to change your password.</span>
                </div>
                <CredentialInput placeholder="Email" reff={email}/>
            </div>
            <div className='h-[10%] min-h-[90px]'>
                <div className='text-[#ffffff] bg-[#000000]/[.9] text-[20px] hover:bg-[#000000]/[.8] text-center font-bold font-twitterchirp py-3.5 rounded-full cursor-pointer transition-all transition-300' onClick={()=>{dispatch(resetPassword(email))}}>Reset password</div>
            </div>
        </div>
    )

    const SignUp = () => (
        <div className='w-[85%] h-[90%] mx-auto flex flex-col justify-between'>
            <div className='h-[30%] flex flex-col justify-between min-h-[360px]'>
                <h1 className='font-bold font-chirp text-[27px]'>Create your account</h1>
                <CredentialInput placeholder="Name" reff={name}/>
                <CredentialInput placeholder="Username" reff={username}/>
                <CredentialInput placeholder="Email" reff={email}/>
                <CredentialInput placeholder="Password" password={true} reff={password}/>
            </div>
            <div className='h-[15%]'>
                <div className='text-[#ffffff] bg-[#000000]/[.9] text-[20px] hover:bg-[#000000]/[.8] text-center font-bold font-twitterchirp py-3.5 rounded-full cursor-pointer transition-all transition-300' onClick={()=>{dispatch(signUp(email,password,name,password))}}>Sign up</div>
            </div>
        </div>
    )




    return (
        <div className='w-full h-full absolute bg-[#000000]/[.5] flex justify-center items-center '>
            <div className='w-full h-full relative s7:w-[650px] s7:h-[700px]'>
                <div className='w-full h-full bg-[#ffffff] s7:rounded-xl'>
                    <div className='w-full py-2 h-[10%]'>
                        <IconTwitter clas={"w-[37px] mx-auto"}/>
                    </div>
                    <div className='absolute hover:bg-[#000000]/[.1] p-2 rounded-full cursor-pointer left-3 top-3' onClick={()=>{navigate("/i/")}}>
                        <DeleteIcon color={"#000000"}/>
                    </div>
                    <Routes>
                        <Route path='/flow/login/' element={<LoginForm />}/>
                        <Route path='/flow/signup' element={<SignUp />}/>
                        <Route path='/flow/resetPassword' element={<PasswordReset />}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AuthUI;
