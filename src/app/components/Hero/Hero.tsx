import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <section className='w-full h-[80vh] bg-blueCol flex items-center py-[112px] relative'>
      {/* <div className='w-full flex items-center'>
        <div className='flex flex-col py-[48px] gap-[35px] items-start'>
          <h3 className='montserrat-bold text-white text-base'>SUMMER 2020</h3>
          <h1 className='montserrat-bold text-white text-[58px]'>NEW COLLECTION</h1>
          <p className='montserrat-regular text-white text-[20px]'>We know how large objects will act, 
          but things on a small scale</p>
          <button className='bg-[#2DC071] py-[15px] px-[40px] montserrat-bold text-[24px] text-white'>SHOP NOW</button>
        </div>
      </div> */}
      <Image className='absolute' src={'/images/carousel.svg'} alt='Carousel' layout='fill'></Image>
        
    </section>
  )
}

export default Hero
