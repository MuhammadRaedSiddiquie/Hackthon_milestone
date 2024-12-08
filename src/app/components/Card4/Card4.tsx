import React from 'react'
import Image from 'next/image'
import { FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa";

function Card4({image,title,subtitle}:{image:string,title:string,subtitle:string}) {
  return (
    <div className='w-[320px] bg-[#ffffff] flex flex-col items-center justify-center gap-[24px] py-[5px] max-md:bg-[#f7f7f7]'>
    <div className='relative w-[320px] h-[230px]'>
        <Image className='absolute' src={image} alt={title} layout='fill'></Image>
    </div>
    <div className='w-full flex flex-col items-center gap-[10px]'>
        <h2 className='text-base montserrat-bold text-primaryCol'>{title}</h2>
        <h3 className='text-sm montserrat-bold text-secondaryCol'>{subtitle}</h3>
    </div>
    <div className='w-full flex items-end justify-center gap-[20px]'>
      <FaFacebook className='text-2xl text-blueCol' />
      <FaInstagram className='text-2xl text-blueCol' />
      <FaTwitter className='text-2xl text-blueCol' />
    </div>

  
</div>
  )
}

export default Card4
