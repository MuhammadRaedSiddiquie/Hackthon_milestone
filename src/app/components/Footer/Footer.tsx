import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className='w-full flex items-center justify-center'>
      <div className='w-[75%] flex flex-col items-center'>
        <div className='w-full flex items-center justify-between py-[40px]'>
          <h1 className='text-[24px] montserrat-bolder text-primaryCol xxl:text-4xl'>SwiftCart</h1>
          <div className='flex items-center gap-[20px]'>
            <FaInstagram className='text-blueCol text-xl hover:text-blueHov cursor-pointer xxl:text-3xl' />
            <FaFacebook className='text-blueCol text-xl hover:text-blueHov cursor-pointer xxl:text-3xl' />
            <FaTwitter className='text-blueCol text-xl hover:text-blueHov cursor-pointer xxl:text-3xl' />
          </div>
        </div>
        <hr className='w-full h-[2px] bg-[E6E6E6]' />
        <div className='w-full flex items-start py-[50px] justify-between max-l:flex-col max-l:gap-[40px]'>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol xxl:text-[22px]'>Company Info</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>About Us</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Carrier</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>We Are Hiring</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Blog</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol xxl:text-[22px]'>Legal</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>About Us</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Carrier</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>We Are Hiring</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Blog</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol xxl:text-[22px]'>Features</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Business Marketing</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>User Analytic</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Live Chat</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Unlimited Support</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol xxl:text-[22px]'>Resources</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>IOS & Android</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Watch a Demo</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>Customers</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov xxl:text-xl'>API</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol xxl:text-[22px]'>Get In Touch</h1>
            <div className='w-[320px] h-[58px] flex items-center justify-between rounded-[5px] border-[#E6E6E6] border-[1px]'>
              <input type="text" placeholder='Your Email' className='text-sm text-secondaryCol montserrat-bold pl-[6px] xxl:text-xl' />
              <button className='px-[30px] h-full bg-blueCol rounded-[5px] text-sm text-white montserrat-bold flex items-center justify-center hover:bg-blueHov xxl:text-xl'>Subscribe</button>
            </div>
            <p className='text-[12px] text-secondaryCol montserrat-bold xxl:text-lg'>Unlimited Support</p>
          </ul>
        </div>
        <div className='w-full flex items-center justify-start py-[25px]'>
          <p className='montserrat-bold text-secondaryCol text-sm text-center xxl:text-xl'>Made With Love By Finland All Right Reserved </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
