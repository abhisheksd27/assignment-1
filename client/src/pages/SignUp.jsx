import React from 'react';
import { useState } from 'react';
import {Link , useNavigate } from 'react-router-dom'
const Signup = () => {

    const [formData,setFormData]=useState({});
    const navigate=useNavigate();
    const [error,setError] = useState(false);
    const [loading,setLoading]=useState(false);

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            setError(false)
            const res=await fetch('/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData)
            });
            const data = await res.json();
            setLoading(false);
            if(data.success==false){
                setError(true);
                return;
            }
            navigate('/sign-in')
           
            // setError(false);

        } catch (error) {
            setLoading(false);
            setError(true);
        }
        
        
    }
   
    return (
        <div className='p-3 max-w-lg mx-auto'> 
            <h1 className='text-3xl font-bold my-7 text-center  '>
                Sign Up
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-5 '>
                <input type="text"  placeholder='Username' id='username' required className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
                <input type="Email"  placeholder='Email' id='email' required className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
                <input type="password"  placeholder='Password' id='password' required className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

                <button disabled={loading} className='bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'loading...' : 'Sign up'}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>
                    Have an account?
                </p>
                <Link to='/sign-in'>
                <span className='text-blue-500'>Sign In</span>
                </Link>
                <div>
                    <p className='text-red-700 mt-5'>{error  && "Something wen wrong"}</p>
                </div>
                
            </div>
        </div>
    );
}

export default Signup;
