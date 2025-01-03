'use client'
import React, { useEffect, useState } from 'react'
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Dialogdemo from '../Dialogdemo/Dialogdemo';
import Image from 'next/image';



function Header() {

  const [open, setOpen] = useState(false)
  const { user} = useUser();

  const [cartSize, setCartSize] = useState(0)
  
  useEffect(() => {
    const updateCartSize = () => {
      const cartStored = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartSize(cartStored.length);
    };
    updateCartSize();
    setInterval(()=>{
      updateCartSize();
    },1000)
    
    
  }, [])


  return (
    <header className='w-full h-fit flex flex-col gap-[12px]'>
      <div className='w-full h-[58px] bg-[#252B42] flex items-center justify-between px-[24px] max-md:hidden'>
        <div className='flex items-center gap-[10px]'>
          <div className='flex items-center gap-[5px] py-[10px] px-[10px]'>
            <FiPhone className='text-white xxl:text-2xl' />
            <p className='montserrat-bold text-sm text-white xxl:text-lg'>(225) 555-0118</p>
          </div>
          <div className='flex items-center gap-[5px] py-[10px] px-[10px]'>
            <TfiEmail className='text-white xxl:text-2xl' />
            <p className='montserrat-bold text-sm text-white xxl:text-lg'>michelle.rivera@example.com</p>
          </div>
        </div>
        <p className='montserrat-bold text-sm text-white xxl:text-lg'>Follow Us  and get a chance to win 80% off</p>
        <div className='flex items-center gap-[10px] px-[10px] py-[10px]'>
          <p className='montserrat-bold text-sm text-white xxl:text-lg'>Follow Us :</p>
          <div className='flex items-center gap-[10px]'>
            <FaInstagram className='text-white xxl:text-2xl' />
            <FaYoutube className='text-white xxl:text-2xl' />
            <FaFacebook className='text-white xxl:text-2xl' />
            <FaTwitter className='text-white xxl:text-2xl' />
          </div>
        </div>
      </div>
      <nav className='w-full h-[58px] bg-white flex items-center justify-between px-[30px] gap-[40px]'>
        <h1 className='text-[24px] montserrat-bolder text-primaryCol xxl:text-4xl'>Bandage</h1>
        <div className='w-[80%] flex items-center justify-between max-md:hidden'>
          <ul className='flex items-center gap-[15px]'>
            <Link href={'/'}><li className='montserrat-bold text-secondaryCol text-sm hover:text-secondaryHov xxl:text-xl'>Home</li></Link>
            <Link href={'/Product'}><li className='montserrat-bold text-secondaryCol text-sm hover:text-secondaryHov xxl:text-xl'>Shop</li></Link>
            <Link href={'/About'}><li className='montserrat-bold text-secondaryCol text-sm hover:text-secondaryHov xxl:text-xl'>About</li></Link>
            <Link href={'/Team'}><li className='montserrat-bold text-secondaryCol text-sm hover:text-secondaryHov xxl:text-xl'>Team</li></Link>
            <Link href={'/Contact'}><li className='montserrat-bold text-secondaryCol text-sm hover:text-secondaryHov xxl:text-xl'>Contact</li></Link>
            <Link href={'/Pricing'}><li className='montserrat-bold text-secondaryCol text-sm hover:text-secondaryHov xxl:text-xl'>Pricing</li></Link>

          </ul>
          <div className='flex items-center py-[10px] gap-[10px]'>
            <div className='flex items-center gap-2 px-[10px] cursor-pointer'>
              {user ? <div className='w-[40px] h-[40px] rounded-full relative'>
            {user.picture ? <Image className='absolute object-cover rounded-full' src={user.picture} alt={"pic"} layout='fill'></Image> : ""}
          </div> :
            <FaRegUser className='text-[#23A6F0] xxl:text-2xl' />}
          {user ? <Dialogdemo></Dialogdemo>
            : <a href="/api/auth/login"><p className='montserrat-bold text-[#23A6F0] text-sm hover:text-blueHov xxl:text-xl'>Login / Signup</p></a>
          }
            </div>

           <Link href={'/Cart'}> <div className='flex items-center px-[10px] cursor-pointer'>
              <IoCartOutline className='text-[#23A6F0] text-xl hover:text-blueHov xxl:text-3xl' />
              {
                cartSize>0? <p className='montserrat-bold text-white w-[20px] h-[20px] rounded-[50%] flex items-center justify-center text-sm bg-blueCol xxl:text-xl'>{cartSize}</p>:''
              }
            </div></Link>
            <Link href={'/Likes'}><div className='flex items-center px-[10px] cursor-pointer'>
              <CiHeart className='text-[#23A6F0] text-xl hover:text-blueHov xxl:text-3xl' />
              <p className='montserrat-bold text-[#23A6F0] text-sm xxl:text-xl'>1</p>
            </div></Link>
          </div>
        </div>
        <div className='hidden w-[35%] items-center gap-[15px] justify-end max-md:flex'>
          <IoMdSearch className='text-primaryCol hover:text-primaryHov text-2xl' />
          <IoCartOutline className='text-primaryCol hover:text-primaryHov text-2xl' />
          {open ? (
            <IoClose
              className="text-primaryCol hover:text-primaryHov text-2xl xxl:text-4xl"
              onClick={() => setOpen(false)}
            />
          ) : (
            <HiMiniBars3BottomRight
              className="text-primaryCol hover:text-primaryHov text-2xl xxl:text-4xl"
              onClick={() => setOpen(true)}
            />
          )}

        </div>


      </nav>
      {open ? <div className='w-full py-[25px]'>
        <ul className='flex flex-col w-full items-center gap-[25px]'>
          <Link href={'/'}><li className='montserrat-regular text-xl text-secondaryCol hover:text-secondaryHov xxl:text-xl'>Home</li></Link>
          <Link href={'/Product'}><li className='montserrat-regular text-xl text-secondaryCol hover:text-secondaryHov xxl:text-xl'>Product</li></Link>
          <Link href={'/Pricing'}><li className='montserrat-regular text-xl text-secondaryCol hover:text-secondaryHov xxl:text-xl'>Pricing</li></Link>
          <Link href={'/Contact'}><li className='montserrat-regular text-xl text-secondaryCol hover:text-secondaryHov xxl:text-xl'>Contact</li></Link>
          <Link href={'/About'}><li className='montserrat-regular text-xl text-secondaryCol hover:text-secondaryHov xxl:text-xl'>About</li></Link>
          <Link href={'/Team'}><li className='montserrat-regular text-xl text-secondaryCol hover:text-secondaryHov xxl:text-xl'>Team</li></Link>
        </ul>

      </div> : ''}
    </header>
  )
}

export default Header
