import React from 'react'
import Image from 'next/image'
import { FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa";

function Card4({image,title,subtitle}:{image:string,title:string,subtitle:string}) {
  return (
    <div className='w-[320px] bg-[#ffffff] flex flex-col items-center justify-center gap-[24px] py-[5px] max-md:bg-[#f7f7f7] cursor-pointer hover:shadow-[0px_12px_17px_2px_#00000024]'>
    <div className='relative w-[320px] h-[230px]'>
        <Image className='absolute' src={image} alt={title} layout='fill'></Image>
    </div>
    <div className='w-full flex flex-col items-center gap-[10px]'>
        <h2 className='text-base montserrat-bold text-primaryCol xxl:text-[22px]'>{title}</h2>
        <h3 className='text-sm montserrat-bold text-secondaryCol xxl:text-xl'>{subtitle}</h3>
    </div>
    <div className='w-full flex items-end justify-center gap-[20px]'>
      <FaFacebook className='text-2xl text-blueCol hover:text-blueHov xxl:text-3xl' />
      <FaInstagram className='text-2xl text-blueCol hover:text-blueHov xxl:text-3xl' />
      <FaTwitter className='text-2xl text-blueCol hover:text-blueHov xxl:text-3xl' />
    </div>

  
</div>
  )
}

export default Card4
