'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';

function Card({id, image, title, info, price, discount,rating }: {id:string; image: string; title: string; info: string; price: number | string; discount: number | string ; rating:number;}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = async () => {
    setIsLoading(true);
    try {
      // await router.push(
      //   `/items/${title.replace(/\s+/g, '-').toLowerCase()}?title=${encodeURIComponent(title)}&info=${encodeURIComponent(info)}&price=${price}&discount=${discount}&image=${encodeURIComponent(image)}`
      // );
      await router.push(`/items/${id}`)
      console.log('id===',id)
    } catch (error) {
      console.error("Navigation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className='w-[238px] h-[480px] flex flex-col items-center cursor-pointer relative' onClick={handleCardClick} >
      {isLoading && (
        <div className='absolute inset-0 flex justify-center items-center bg-gray-200 opacity-75 z-10'>
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        </div>
      )}
      <div className='w-full h-[395px] relative hover:scale-105 duration-500'>
        <Image src={image} alt='product' layout='fill' className='object-contain'></Image>
      </div>
      <div className='flex flex-col items-start gap-[10px] px-[25px] pb-[35px] pt-[25px]'>
        <h2 className='montserrat-bold text-black text-base line-clamp-1 xxl:text-[22px]'>{title}</h2>
        <p className='montserrat-bold text-secondaryCol text-sm text-left line-clamp-2 xxl:text-xl'>{info}</p>
        <div className='flex items-center gap-[8px]'>
          <p className='text-[#23856D] montserrat-bold text-base text-left xxl:text-[22px]'>{price/*-((price/100)*discount)).toFixed(2)*/}$</p>
          <p className='text-[#BDBDBD] montserrat-semibold text-left text-sm xxl:text-[20px]'>-{discount}%</p>
        </div>
        <div className='flex mb-4 items-center'>
          <FaStar className='text-[#F3CD03] xxl:text-3xl' />
          <FaStar className='text-[#F3CD03] xxl:text-3xl' />
          <FaStar className='text-[#F3CD03] xxl:text-3xl' />
          <FaStar className='text-[#F3CD03] xxl:text-3xl' />
          <FaRegStarHalfStroke className='text-[#F3CD03] xxl:text-3xl' />
          <p className='text-[#BDBDBD] ml-1 montserrat-semibold text-left text-sm xxl:text-[20px]'>({rating})</p>
        </div>

        {/* <div className='flex items-center gap-[6px]'>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-blueCol'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-[#23856D]'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-[#E77C40]'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-primaryCol'></span>
        </div> */}
      </div>

    </ div>
  );
}

export default Card;



