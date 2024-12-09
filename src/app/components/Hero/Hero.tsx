import React from 'react'


function Hero() {
  return (
    <section className='w-full h-[80vh] bg-blueCol flex items-center justify-center py-[112px] relative'>
      <div className='w-[73%] flex items-center relative z-10'>
        <div className='flex flex-col py-[48px] gap-[35px] items-start max-md:items-center'>
          <h3 className='montserrat-bold text-white text-base'>SUMMER 2020</h3>
          <h1 className='montserrat-bold text-white text-[58px] max-md:text-[40px] max-md:px-8 max-md:text-center'>NEW COLLECTION</h1>
          <p className='montserrat-regular text-white text-[20px] tracking-[0.2px] w-[70%] max-md:w-full max-md:text-center max-md:px-8'>We know how large objects will act
          but things on a small scale</p>
          <button className='bg-[#2DC071] py-[15px] px-[40px] montserrat-bold text-[20px] text-white rounded-[5px] hover:bg-[#26a05e]'>SHOP NOW</button>
        </div>
      </div>
      <div className='w-full h-full absolute bg-[url("/images/product-slide-1.svg")] bg-center bg-cover'></div>
      {/* <Image className='absolute' src={'/images/carousel.svg'} alt='Carousel' layout='fill'></Image> */}
        
    </section>
  )
}

export default Hero
