import React from 'react'
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

import { IoCartOutline } from "react-icons/io5";


import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";


function Header() {
  return (
    <header className='w-full h-fit flex flex-col gap-[12px]'>
      <div className='w-full h-[58px] bg-[#252B42] flex items-center justify-between px-[24px]'>
        <div className='flex items-center gap-[10px]'>
          <div className='flex items-center gap-[5px] py-[10px] px-[10px]'>
            <FiPhone className='text-white' />
            <p className='montserrat-bold text-sm text-white'>(225) 555-0118</p>
          </div>
          <div className='flex items-center gap-[5px] py-[10px] px-[10px]'>
            <TfiEmail className='text-white' />
            <p className='montserrat-bold text-sm text-white'>michelle.rivera@example.com</p>
          </div>
        </div>
        <p className='montserrat-bold text-sm text-white'>Follow Us  and get a chance to win 80% off</p>
        <div className='flex items-center gap-[10px] px-[10px] py-[10px]'>
          <p className='montserrat-bold text-sm text-white'>Follow Us :</p>
          <div className='flex items-center gap-[10px]'>
            <FaInstagram className='text-white' />
            <FaYoutube className='text-white' />
            <FaFacebook className='text-white' />
            <FaTwitter className='text-white' />
          </div>
        </div>
      </div>
      <nav className='w-full h-[58px] bg-white flex items-center justify-between px-[30px] gap-[40px]'>
        <h1 className='text-[24px] montserrat-bold text-primaryCol'>Bandage</h1>
        <div className='w-[80%] flex items-center justify-between'>
          <ul className='flex items-center gap-[15px]'>
            <li className='montserrat-bold text-secondaryCol text-sm'>Home</li>
            <li className='montserrat-bold text-secondaryCol text-sm'>Shop</li>
            <li className='montserrat-bold text-secondaryCol text-sm'>About</li>
            <li className='montserrat-bold text-secondaryCol text-sm'>Blog</li>
            <li className='montserrat-bold text-secondaryCol text-sm'>Contact</li>
            <li className='montserrat-bold text-secondaryCol text-sm'>Pages</li>

          </ul>
          <div className='flex items-center py-[10px] gap-[10px]'>
            <div className='flex items-center px-[10px]'>
              <FaRegUser className='text-[#23A6F0]' />
              <p className='montserrat-bold text-[#23A6F0] text-sm'>Login / Signup</p>
            </div>
            <div className='flex items-center px-[10px]'>
              <IoCartOutline className='text-[#23A6F0] text-xl' />
              <p className='montserrat-bold text-[#23A6F0] text-sm'>1</p>
            </div>
            <div className='flex items-center px-[10px]'>
              <CiHeart className='text-[#23A6F0] text-xl' />
              <p className='montserrat-bold text-[#23A6F0] text-sm'>1</p>
            </div>
          </div>
        </div>

      </nav>
    </header>
  )
}

export default Header
