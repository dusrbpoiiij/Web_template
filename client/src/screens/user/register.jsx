import React, { useState } from 'react'
import {toast} from 'react-toastify';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const {name, email, password, confirmPassword} = data;


  return (
    <div className="w-full bg-white marginToHeader">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between">
        {/* Left col */ }
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-normal w-full">What business are you?</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">Main Hero Message to sell yourself!</h1>
          <p className="leading-normal text-2xl mb-8">Sub-hero message, not too long and not too short. Make it just right!</p>
        
          <Link to="/subscribe" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
          >
            Subscribe
          </Link>
        </div>

        {/* Left col */ }
        <div className="w-full md:w-3/5 py-6 text-center">
          <img className="w-full md:w-4/5 z-50 mx-auto" src={require('../../assets/hero.png')} alt="hero" />
        </div>
      </div>
    </div>
  )
}

export default Register
