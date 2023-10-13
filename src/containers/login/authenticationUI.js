import React, { useMemo, useRef } from 'react';
import LoginForm from './loginForm';
import { IconTwitter } from '../../components/icons/logos';
import { DeleteIcon } from '../../components/icons/posts';
import CredentialInput from '../../components/inputs/credentials';
import { Routes, Route, useNavigate } from 'react-router';
import { resetPass, signUp } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import CredentialButton from '../../components/buttons/credentials';
import { setError } from '../../redux/actions/errorActions';

const AuthUI = () => {

    const credentials = useRef({email: "", password: "", name: ""})

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const bg = localStorage.theme
    const bgs = {"dim": "bg-[#15202b]", "dark": "bg-[#000000]", "light": "bg-[#ffffff]"}

    

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validatePassword = (password) => {
        // Check for at least one lowercase letter
        const lowercaseRegex = /[a-z]/;
        
        // Check for at least one uppercase letter
        const uppercaseRegex = /[A-Z]/;
        
        // Check for at least one digit
        const digitRegex = /\d/;
        
        // Check for at least one special character (you can customize this character set)
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
        
        // Combine all the checks using the logical AND operator
        return (
          lowercaseRegex.test(password) &&
          uppercaseRegex.test(password) &&
          digitRegex.test(password) &&
          specialCharRegex.test(password)
        );
    }
    
    const createAccount = () => {
        if (!validateEmail(credentials.current.email)) {
            dispatch(setError("Please enter a valid email address. The email address you provided does not appear to be in the correct format (e.g., example@example.com). Please check and try again"))
        } else if (!validatePassword(credentials.current.password)) {
            dispatch(setError("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (e.g., !@#$%^&*()). Please choose a stronger password"))
        } else if (credentials.current.name === "") {
            dispatch(setError("Please enter your name. This field cannot be left blank"))
        } else {
            dispatch(signUp(credentials.current.email, credentials.current.password, credentials.current.name))
        }
    }
    
    
    const PasswordReset = React.useMemo(() => (
        <div className='w-[85%] h-[90%] mx-auto flex flex-col justify-between py-5'>
            <div className='h-[20%] flex flex-col justify-between min-h-[150px]'>
                <div>
                    <h1 className='font-bold font-chirp text-[27px] dark:text-[#ffffff]'>Enter your password</h1>
                    <span className='text-[#536471] text-[18px] font-chirp leading-3'>Enter the email associated with your account to change your password.</span>
                </div>
                <div className='mt-4'>
                <CredentialInput placeholder="Email" ref={credentials} refKey={"email"}/>
                </div>
            </div>
            <CredentialButton text={"Reset password"} action={()=>{dispatch(resetPass(credentials.current.email))}}/>
        </div>
    ), [])

    const SignUp = React.useMemo(()=>(
        <div className='w-[85%] h-[90%] mx-auto flex flex-col justify-between'>
            <div className='h-[30%] flex flex-col justify-between min-h-[250px]'>
                <h1 className='font-bold font-chirp text-[27px] dark:text-[#ffffff]'>Create your account</h1>
                <CredentialInput placeholder="Name" ref={credentials} refKey={"name"}/>
                <CredentialInput placeholder="Email" ref={credentials} refKey={"email"}/>
                <CredentialInput placeholder="Password" password={true} ref={credentials} refKey={"password"}/>
            </div>
            <div className='my-4'>
                <CredentialButton text={"Sign up"} action={createAccount}/>
            </div>
        </div>
    ), [])




    return (
        <div className='w-full h-full absolute bg-[#000000]/[.5] flex justify-center items-center overflow-hidden' onMouseDown={()=>{navigate("/i/")}}>
            <div className='w-full h-full relative s7:w-[650px] s7:max-h-[700px] s7:h-[60%] s7:min-h-[500px]' onMouseDown={(e)=>{e.stopPropagation()}}>
                <div className={'w-full h-full s7:rounded-xl ' + (bgs[bg] || "bg-[#ffffff]")}>
                    <div className='w-full py-5 h-[10%]'>
                        <IconTwitter clas={"w-[37px] mx-auto"}/>
                    </div>
                    <div className='absolute hover:bg-[#000000]/[.1] p-2 rounded-full cursor-pointer left-3 top-3' onClick={()=>{navigate("/i/")}}>
                        <DeleteIcon color={"#000000"}/>
                    </div>
                    <Routes>
                        <Route path='/flow/login/' element={<LoginForm />}/>
                        <Route path='/flow/signup' element={SignUp}/>
                        <Route path='/flow/resetPassword' element={PasswordReset}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AuthUI;
