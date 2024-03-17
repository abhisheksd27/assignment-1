import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch ,useSelector } from 'react-redux';


const Signin = () => {

    const [formData,setFormData]=useState({});
    const navigate=useNavigate();
    const { loading , error} = useSelector((state) => state.user);  //get
    console.log(loading,error)
    const dispatch=useDispatch();


    const handleChange=(e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res=await fetch('/api/auth/signin',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData)
            });
            const data = await res.json();
            
            if(data.success==false){
                dispatch(signInFailure(data))
                return;
            }
            dispatch(signInSuccess(data));
           navigate('/')
            // setError(false);

        } catch (error) {
            dispatch(signInFailure(error));
        }
        
        
    }
   
    return (
        <div className='p-3 max-w-lg mx-auto'> 
            <h1 className='text-3xl font-bold my-7 text-center  '>
                Sign In
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-5 '>
                
                <input type="Email"  placeholder='Email' id='email' required className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
                <input type="password"  placeholder='Password' id='password' required className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

                <button disabled={loading} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'loading...' : 'Sign in'}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>
                    Dont have an account?
                </p>
                <Link to='/sign-up'>
                <span className='text-blue-500'>Sign Up</span>
                </Link>
                <div>
                <p className='text-red-700 mt-5'>
                        {error ? error.message || 'Something went wrong!' : ''}
      </p>
                </div>
                
            </div>
        </div>
    );
}

export default Signin;
