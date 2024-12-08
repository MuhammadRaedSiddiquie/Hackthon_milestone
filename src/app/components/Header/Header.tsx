'use client'
import React, { useState } from 'react'
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Link from 'next/link';



function Header() {

  const [open, setOpen] = useState(false)

  return (
    <header className='w-full h-fit flex flex-col gap-[12px]'>
      <div className='w-full h-[58px] bg-[#252B42] flex items-center justify-between px-[24px] max-md:hidden'>
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
        <div className='w-[80%] flex items-center justify-between max-md:hidden'>
          <ul className='flex items-center gap-[15px]'>
            <Link href={'/'}><li className='montserrat-bold text-secondaryCol text-sm'>Home</li></Link>
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
        <div className='hidden w-[35%] items-center gap-[15px] justify-between max-md:flex'>
          <IoMdSearch className='text-primaryCol text-2xl' />
          <IoCartOutline className='text-primaryCol text-2xl' />
          {open ? (
            <IoClose
              className="text-primaryCol text-2xl"
              onClick={() => setOpen(false)}
            />
          ) : (
            <HiMiniBars3BottomRight
              className="text-primaryCol text-2xl"
              onClick={() => setOpen(true)}
            />
          )}
        </div>


      </nav>
      {open ? <div className='w-full py-[25px]'>
        <ul className='flex flex-col w-full items-center gap-[25px]'>
          <li className='montserrat-regular text-xl text-secondaryCol'>Home</li>
          <li className='montserrat-regular text-xl text-secondaryCol'>Product</li>
          <li className='montserrat-regular text-xl text-secondaryCol'>Pricing</li>
          <li className='montserrat-regular text-xl text-secondaryCol'>Contact</li>
        </ul>

      </div> : ''}
    </header>
  )
}

export default Header
