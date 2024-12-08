import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className='w-full flex items-center justify-center'>
      <div className='w-[75%] flex flex-col items-center'>
        <div className='w-full flex items-center justify-between py-[40px]'>
          <h1 className='text-[24px] montserrat-bold text-primaryCol'>Bandage</h1>
          <div className='flex items-center gap-[20px]'>
            <FaInstagram className='text-blueCol text-xl' />
            <FaFacebook className='text-blueCol text-xl' />
            <FaTwitter className='text-blueCol text-xl' />
          </div>
        </div>
        <hr className='w-full h-[2px] bg-[E6E6E6]' />
        <div className='w-full flex items-start py-[50px] justify-between'>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Company Info</h1>
            <li className='text-sm text-secondaryCol montserrat-bold'>About Us</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Carrier</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>We Are Hiring</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Blog</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Legal</h1>
            <li className='text-sm text-secondaryCol montserrat-bold'>About Us</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Carrier</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>We Are Hiring</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Blog</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Features</h1>
            <li className='text-sm text-secondaryCol montserrat-bold'>Business Marketing</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>User Analytic</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Live Chat</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Unlimited Support</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Resources</h1>
            <li className='text-sm text-secondaryCol montserrat-bold'>IOS & Android</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Watch a Demo</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>Customers</li>
            <li className='text-sm text-secondaryCol montserrat-bold'>API</li>
          </ul>
          <ul className='flex flex-col gap-[20px] items-start'>
            <h1 className='montserrat-bold text-base text-primaryCol'>Get In Touch</h1>
            <div className='w-[320px] h-[58px] flex items-center justify-between rounded-[5px] border-[#E6E6E6] border-[1px]'>
              <input type="text" placeholder='Your Email' className='text-sm text-secondaryCol montserrat-bold pl-[6px]' />
              <button className='w-[120px] h-full bg-blueCol rounded-[5px] text-sm text-white montserrat-bold flex items-center justify-center'>Subscribe</button>
            </div>
            <p className='text-[12px] text-secondaryCol montserrat-bold'>Unlimited Support</p>
          </ul>

        </div>
        <div className='w-full flex items-center justify-start py-[25px]'>
          <p className='montserrat-bold text-secondaryCol text-sm'>Made With Love By Finland All Right Reserved </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
