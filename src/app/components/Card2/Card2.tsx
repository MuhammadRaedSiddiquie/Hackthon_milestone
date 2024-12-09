import React from 'react'
import Image from 'next/image'
import { ImStatsBars } from "react-icons/im";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";



function Card2({ image, title, info}: { image: string, title: string, info: string}) {
    return (
        <div className='w-[328px] h-[606px] flex flex-col items-center border-b-[1px] border-secondaryCol cursor-pointer hover:scale-105 duration-500'>
            <div className='w-full h-[300px] relative'>
                <Image src={image} alt='product' layout='fill'></Image>
            </div>
            <div className='flex flex-col items-start gap-[10px] px-[20px] pt-[25px] pb-[35px]'>
                <div className='flex items-center gap-[15px]'>
                    <p className='montserrat-regular text-[14px] text-blueCol'>Google</p>
                    <p className='montserrat-regular text-[14px] text-secondaryCol hover:text-blueCol'>Trending</p>
                    <p className='montserrat-regular text-[14px] text-secondaryCol hover:text-blueCol'>New</p>
                </div>
                <h3 className='montserrat-regular text-[22px] text-primaryCol'>{title}</h3>
                <p className='montserrat-regular text-base text-secondaryCol'>{info}</p>
                <div className='w-full flex items-center justify-between py-[15px]'>
                    <div className='flex items-center gap-[4px]'>
                        <LuAlarmClock className='text-blueCol' />
                        <p className='montserrat-regular text-[12px] text-secondaryCol'>12 April 2021</p>
                    </div>
                    <div className='flex items-center gap-[4px]'>
                    <ImStatsBars className='text-[#23856D]' />
                        <p className='montserrat-regular text-[12px] text-secondaryCol'>10 comments</p>
                    </div>
                    

                </div>
                    <div className='flex items-center gap-[5px]'>
                        <p className='montserrat-bold text-sm text-primaryCol'>Learn More</p>
                        <IoIosArrowForward className='text-blueCol' />

                    </div>

            </div>

        </div>
    )
}

export default Card2
