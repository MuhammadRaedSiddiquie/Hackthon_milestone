'use client'; 

import { useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image'

function Card({image,title,info,price,discount}:{image:string,title:string,info:string,price:number,discount:number}) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(
      `/items/${title.replace(/\s+/g, '-').toLowerCase()}?title=${encodeURIComponent(title)}&info=${encodeURIComponent(info)}&price=${price}&discount=${discount}&image=${encodeURIComponent(image)}`
    );
  };
  
  return (
    <div className='w-[238px] h-fit flex flex-col items-center hover:scale-105 duration-500 cursor-pointer' onClick={handleCardClick}>
      <div className='w-[238px] h-[300px] relative'>
        <Image src={image} alt='product' layout='fill' className='object-cover object-top'></Image>
      </div>
      <div className='flex flex-col items-center gap-[10px] px-[25px] pb-[35px] pt-[25px]'>
        <h2 className='montserrat-bold text-black text-base'>{title}</h2>
        <p className='montserrat-bold text-secondaryCol text-sm'>{info}</p>
        <div className='flex items-center gap-[5px]'>
          <p className='text-[#BDBDBD] montserrat-bold text-base'>${price}</p>
          <p className='text-[#23856D] montserrat-bold text-base'>${discount}</p>
        </div>
        <div className='flex items-center gap-[6px]'>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-blueCol'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-[#23856D]'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-[#E77C40]'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-primaryCol'></span>
        </div>
      </div>
      
    </div>
  )
}

export default Card
