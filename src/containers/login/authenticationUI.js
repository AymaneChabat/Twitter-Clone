import React, { useRef } from 'react';
import LoginForm from './loginForm';
import { IconTwitter } from '../../components/icons/logos';
import { DeleteIcon } from '../../components/icons/posts';
import CredentialInput from '../../components/inputs/credentials';
import { Routes, Route, useNavigate } from 'react-router';
import { resetPass, signUp } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import CredentialButton from '../../components/buttons/credentials';

const AuthUI = () => {

    const email = useRef("")
    const password = useRef("")
    const name = useRef("")

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
                <div className='mt-4'>
                <CredentialInput placeholder="Email" reff={email}/>
                </div>
            </div>
            <CredentialButton text={"Reset password"} action={()=>{dispatch(resetPass(email.current.value))}}/>
        </div>
    )

    const SignUp = () => (
        <div className='w-[85%] h-[90%] mx-auto flex flex-col justify-between'>
            <div className='h-[30%] flex flex-col justify-between min-h-[250px]'>
                <h1 className='font-bold font-chirp text-[27px]'>Create your account</h1>
                <CredentialInput placeholder="Name" reff={name}/>
                <CredentialInput placeholder="Email" reff={email}/>
                <CredentialInput placeholder="Password" password={true} reff={password}/>
            </div>
            <div className='my-4'>
                <CredentialButton text={"Sign up"} action={()=>{dispatch(signUp(email.current.value,password.current.value,name.current.value, navigate))}}/>
            </div>
        </div>
    )




    return (
        <div className='w-full h-full absolute bg-[#000000]/[.5] flex justify-center items-center overflow-hidden' onMouseDown={()=>{navigate("/i/")}}>
            <div className='w-full h-full relative s7:w-[650px] s7:max-h-[700px] s7:h-[60%] s7:min-h-[500px]' onMouseDown={(e)=>{e.stopPropagation()}}>
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
