import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className='w-full flex items-center justify-center'>
      <div className='w-[75%] flex flex-col items-center'>
        <div className='w-full flex items-center justify-between py-[40px]'>
          <h1 className='text-[24px] montserrat-bolder text-primaryCol'>Bandage</h1>
          <div className='flex items-center gap-[20px]'>
            <FaInstagram className='text-blueCol text-xl hover:text-blueHov cursor-pointer' />
            <FaFacebook className='text-blueCol text-xl hover:text-blueHov cursor-pointer' />
            <FaTwitter className='text-blueCol text-xl hover:text-blueHov cursor-pointer' />
          </div>
        </div>
        <hr className='w-full h-[2px] bg-[E6E6E6]' />
        <div className='w-full flex items-start py-[50px] justify-between max-md:flex-col max-md:gap-[40px]'>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Company Info</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>About Us</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Carrier</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>We Are Hiring</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Blog</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Legal</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>About Us</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Carrier</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>We Are Hiring</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Blog</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Features</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Business Marketing</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>User Analytic</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Live Chat</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Unlimited Support</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Resources</h1>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>IOS & Android</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Watch a Demo</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>Customers</li>
            <li className='cursor-pointer text-sm text-secondaryCol montserrat-bold hover:text-secondaryHov'>API</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Get In Touch</h1>
            <div className='w-[320px] h-[58px] flex items-center justify-between rounded-[5px] border-[#E6E6E6] border-[1px]'>
              <input type="text" placeholder='Your Email' className='text-sm text-secondaryCol montserrat-bold pl-[6px]' />
              <button className='w-[120px] h-full bg-blueCol rounded-[5px] text-sm text-white montserrat-bold flex items-center justify-center hover:bg-blueHov'>Subscribe</button>
            </div>
            <p className='text-[12px] text-secondaryCol montserrat-bold'>Unlimited Support</p>
          </ul>

        </div>
        <div className='w-full flex items-center justify-start py-[25px]'>
          <p className='montserrat-bold text-secondaryCol text-sm text-center'>Made With Love By Finland All Right Reserved </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
