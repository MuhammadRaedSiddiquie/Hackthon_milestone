import React from 'react'
import Image from 'next/image'
import { PiArrowBendRightDownBold } from "react-icons/pi";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'

function page() {
  return (
    <main className='w-full flex flex-col items-center justify-start'>
      <div className='w-[73%] h-[85vh] flex items-center justify-center max-md:flex-col max-md:h-fit max-md:w-[90%]'>
        <div className='w-[50%] flex flex-col gap-[25px] items-start py-[80px] max-md:py-[112px] max-md:w-[75%] max-md:w-full max-md:items-center'>
          <h3 className='montserrat-bold text-secondaryCol text-base max-md:hidden'>CONTACT US
          </h3>
          <h1 className='montserrat-bold text-primaryCol text-[40px] max-md:text-center'>Get in touch <br /> today!</h1>
          <p className='montserrat-regular text-secondaryCol text-[20px] max-md:text-center'>We know how large objects will act,
            but things on a small scale</p>
          <div className='flex flex-col gap-[5px] items-start'>
            <h3 className='montserrat-bold text-primaryCol text-[20px]'>Phone : +451 215 215 </h3>
            <h3 className='montserrat-bold text-primaryCol text-[20px]'>Fax : +451 215 215</h3>
          </div>
          <div className='flex items-center justify-start gap-[20px]'>
            <FaFacebook className='text-primaryCol text-3xl' />
            <FaInstagram className='text-primaryCol text-3xl' />
            <FaTwitter className='text-primaryCol text-3xl' />
            <FaLinkedin className='text-primaryCol text-3xl' />
          </div>
        </div>
        <div className='w-[50%] h-full relative max-md:w-full max-md:h-[400px]'>
          <Image src={'/images/carousel5.svg'} alt='pic' layout='fill' className='absolute'></Image>
        </div>
      </div>
      <div className='w-[73%] flex flex-col items-center py-[60px] max-md:w-[90%]'>
        <div className='flex items-center flex-col gap-[10px] py-[36px]'>
          <h4 className='montserrat-bold text-primaryCol text-sm'>VISIT OUR OFFICE</h4>
          <h2 className='montserrat-bold text-primaryCol text-[40px] text-center w-[65%] max-md:w-[80%]'>We help small businesses
            with big ideas</h2>
        </div>
        <div className='flex gap-2 max-md:flex-col '>
        <div className='mb-8 max-md:mb-0 border-[1px] border-blueCol' >
          <Image src={'/images/contact1.svg'} alt='card' width={330} height={400}></Image>
        </div>
        <div>
          <Image src={'/images/contact2.svg'} alt='card' width={330} height={400}></Image>
        </div>

        <div className='mb-8 max-md:mb-0 border-[1px] border-blueCol'>
          <Image src={'/images/contact3.svg'} alt='card' width={330} height={400}></Image>
        </div>
        </div>


      </div>
      <div className='w-[73%] flex py-[80px] items-center justify-center'>
            <div className='flex flex-col items-center gap-[20px]'>
            <PiArrowBendRightDownBold className='text-blueCol text-8xl' />
                <h2 className='montserrat-bold text-base text-primaryCol text-center'>WE CANT WAIT TO MEET YOU</h2>
                <h1 className='montserrat-bold text-[58px] text-primaryCol max-md:text-[40px]'>LETS TALK</h1>
                <button className='bg-blueCol rounded-[5px] py-[15px] px-[40px] text-white text-sm montserrat-bold'>Try it free now</button>
            </div>
        </div>
    </main>
  )
}

export default page
