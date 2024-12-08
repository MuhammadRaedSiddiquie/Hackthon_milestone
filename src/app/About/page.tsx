import React from 'react'
import Image from 'next/image'
import Team from '../components/Team/Team'
import Logos from '../components/Logos/Logos'

function page() {
  return (
    <main className='w-full flex flex-col items-center justify-start'>
      <div className='w-[73%] h-[80vh] flex items-center justify-center max-md:flex-col max-md:h-fit max-md:w-[90%]'>
        <div className='w-[50%] flex flex-col gap-[30px] items-start max-md:py-[112px] max-md:w-[75%] max-md:w-full max-md:items-center'>
          <h3 className='montserrat-bold text-secondaryCol text-base max-md:hidden'>ABOUT COMPANY</h3>
          <h1 className='montserrat-bold text-primaryCol text-[40px] max-md:text-center'>ABOUT US</h1>
          <p className='montserrat-regular text-secondaryCol text-[20px] max-md:text-center'>We know how large objects will act,
            but things on a small scale</p>
          <div className='flex gap-[10px] items-center max-md:flex-col max-md:gap-[25px]'>
            <button className='bg-blueCol py-[15px] px-[40px] montserrat-bold text-sm text-white rounded-[5px] max-md:bg-blueCol'>Get Quote Now</button>

          </div>
        </div>
        <div className='w-[50%] h-full relative max-md:w-full max-md:h-[400px]'>
          <Image src={'/images/carousel3.svg'} alt='carousel 3' layout='fill' className='absolute'></Image>
        </div>
      </div>
      <div className='w-[73%] py-[80px] flex items-center max-md:flex-col max-md:py-[112px] max-md:w-[95%] max-md:gap-[100px]'>
        <div className='flex flex-col items-center w-[25%] max-md:w-full'>
          <h1 className='montserrat-bold text-primaryCol text-[58px]'>15K</h1>
          <p className='montserrat-bold text-secondaryCol text-base text-center'>Happy Customers</p>
        </div>
        <div className='flex flex-col items-center w-[25%] max-md:w-full'>
          <h1 className='montserrat-bold text-primaryCol text-[58px]'>150K</h1>
          <p className='montserrat-bold text-secondaryCol text-base text-center'>Monthly Visitors</p>
        </div>
        <div className='flex flex-col items-center w-[25%] max-md:w-full'>
          <h1 className='montserrat-bold text-primaryCol text-[58px]'>15</h1>
          <p className='montserrat-bold text-secondaryCol text-bas text-centere'>Countries Worldwide</p>
        </div>
        <div className='flex flex-col items-center w-[25%] max-md:w-full'>
          <h1 className='montserrat-bold text-primaryCol text-[58px]'>100+</h1>
          <p className='montserrat-bold text-secondaryCol text-base text-center'>Top Partners</p>
        </div>

      </div>
      <div className='w-[73%] h-[80vh] relative max-md:h-[40vh] max-md:w-full'>
        <Image src={'/images/container.svg'} alt='container' layout='fill' className='absolute'></Image>
      </div>
      <Team></Team>
      <div className='w-[73%] flex flex-col gap-[10px] max-md:py-[80px] max-md:w-[60%]'>
      <div className='flex flex-col items-center justify-center gap-[30px] max-md:text-center'>
                <h1 className='montserrat-bold text-[40px] text-primaryCol'>Big Companies Are Here</h1>
                <p className='montserrat-regular w-[60%] text-sm text-secondaryCol text-center max-md:w-[100%]'>Problems trying to resolve the conflict between 
                the two major realms of Classical physics: Newtonian mechanics  </p>
            </div>
        <Logos></Logos>
        </div>
    </main>
  )
}

export default page
