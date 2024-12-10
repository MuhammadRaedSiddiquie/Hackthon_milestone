
'use client'; 

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

function Card({ image, title, info, price, discount }: { image: string; title: string; info: string; price: number; discount: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = () => {
    setIsLoading(true);
    router.push(
      `/items/${title.replace(/\s+/g, '-').toLowerCase()}?title=${encodeURIComponent(title)}&info=${encodeURIComponent(info)}&price=${price}&discount=${discount}&image=${encodeURIComponent(image)}`
    );
  };

  return (

    <div className='w-[238px] h-[615px] flex flex-col items-center hover:scale-105 cursor-pointer duration-500' onClick={handleCardClick} >
      {isLoading && (
        <div className='absolute inset-0 flex justify-center items-center bg-gray-200 opacity-75 z-10'>
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        </div>
      )}
      <div className='w-full h-[427px] relative'>
        <Image src={image} alt='product' layout='fill'></Image>
      </div>
      <div className='flex flex-col items-center gap-[10px] px-[25px] pb-[35px] pt-[25px]'>
        <h2 className='montserrat-bold text-black text-base xxl:text-[22px]'>{title}</h2>
        <p className='montserrat-bold text-secondaryCol text-sm xxl:text-xl'>{info}</p>
        <div className='flex items-center gap-[5px]'>
          <p className='text-[#BDBDBD] montserrat-bold text-base xxl:text-[22px]'>${price}</p>
          <p className='text-[#23856D] montserrat-bold text-base xxl:text-[22px]'>${discount}</p>
        </div>
        <div className='flex items-center gap-[6px]'>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-blueCol'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-[#23856D]'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-[#E77C40]'></span>
          <span className='w-[16px] h-[16px] rounded-[50%] bg-primaryCol'></span>
        </div>
      </div>
      
    </ div>
      );
}

      export default Card;



