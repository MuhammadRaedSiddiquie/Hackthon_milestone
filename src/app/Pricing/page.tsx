import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { PiToggleRightDuotone } from "react-icons/pi";
import Faq from '../components/Faq/Faq';
import Image from 'next/image';
import Trial from '../components/Trial/Trial';

function page() {
    return (
        <main className='w-full flex flex-col items-center justify-start'>
            <div className='w-[73%] flex flex-col items-center py-[50px] gap-[16px] max-md:w-[90%]'>
                <h4 className='montserrat-bold text-secondaryCol text-base'>PRICING</h4>
                <h3 className='montserrat-bold text-primaryCol text-[58px] max-md:text-[40px]'>SIMPLE PRICING</h3>
                <div className='w-full flex items-center justify-center py-[24px] max-md:justify-center'>
                    <div className='flex items-center gap-[4px]'>
                        <h3 className='montserrat-bold text-primaryCol text-sm'>Home</h3>
                        <IoIosArrowForward className='text-secondaryCol' />
                        <p className='montserrat-regular text-secondaryCol text-sm'>Pricing</p>
                    </div>
                </div>

            </div>
            <div className='w-[73%] flex flex-col py-[48px] items-center gap-[48px] max-md:w-[90%]'>
                <div className='flex flex-col items-center gap-[12px]'>
                    <h3 className='montserrat-bold text-primaryCol text-[40px]'>Pricing</h3>
                    <h4 className='montserrat-regular text-secondaryCol text-sm text-center'>Problems trying to resolve the conflict between
                        the two major realms of Classical physics: Newtonian mechanics </h4>
                </div>
                <div className='flex items-center gap-8'>
                    <div className='flex gap-2 items-center'>
                        <h4 className='montserrat-bold text-primaryCol text-sm'>Monthly</h4>
                        <PiToggleRightDuotone className='text-blueCol text-5xl' />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <h4 className='montserrat-semibold text-primaryCol text-sm'>Yearly</h4>
                        <button className='rounded-[38px] text-blueCol text-sm bg-[#B2E3FF] px-[20px] py-[10px]'>SAVE 20%</button>
                    </div>

                </div>
            </div>
            <div className='w-[73%] flex items-center gap-4 max-md:flex-col max-md:w-[90%]'>
                <div className='mt-8 max-md:mt-0 hover:scale-105 duration-500'>
                    <Image src={'/images/price1.svg'} width={330} alt='card' height={2000}></Image>
                </div>
                <div className='hover:scale-105 duration-500'>
                    <Image src={'/images/price2.svg'} width={330} alt='card' height={2000}></Image>
                </div>

                <div className='mt-8 max-md:mt-0 hover:scale-105 duration-500'>
                    <Image src={'/images/price3.svg'} width={330} alt='card' height={2000}></Image>
                </div>


            </div>
            <div className='w-[73%] flex flex-col items-center py-[24px] gap-[30px] max-md:w-[90%]'>
                <div className='w-full flex flex-col items-center py-[45px] gap-[10px]'>
                    <h2 className='montserrat-bold text-primaryCol text-[40px] max-md:text-[32px]'>Pricing FAQs</h2>
                    <p className='montserrat-regular text-secondaryCol text-[20px] text-center max-md:text-base'>Problems trying to resolve the conflict between
                        the two major realms of Classical physics</p>
                </div>
                <div className='w-full flex flex-wrap items-center'>
                    <Faq></Faq>
                    <Faq></Faq>
                    <Faq></Faq>
                    <Faq></Faq>
                    <Faq></Faq>
                    <Faq></Faq>

                </div>
        
            </div>
            <div className='w-[73%]'>
                <Trial></Trial>
            </div>
        </main>
    )
}

export default page
