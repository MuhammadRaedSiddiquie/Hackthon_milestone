import React from 'react'

function Carousel2() {
  return (
    <section className='w-full h-[80vh] bg-[#23856D] flex items-center justify-center py-[112px] relative max-md:flex-col max-md:h-fit max-md:pb-0'>
      <div className='w-[73%] flex items-center relative z-10 max-md:w-[90%]'>
        <div className='flex flex-col py-[48px] gap-[35px] items-start max-md:items-center'>
          <h3 className='montserrat-bold text-white text-base'>SUMMER 2020</h3>
          <h1 className='montserrat-bold w-[90%] text-white text-[58px] max-md:text-[40px] max-md:w-full max-md:px-8 max-md:text-center'>VITA CLASSIC PRODUCT</h1>
          <p className='montserrat-regular text-white text-[20px] tracking-[0.2px] w-[70%] max-md:w-full max-md:text-center max-md:px-8'>We know how large objects will act
          but things on a small scale</p>
          <button className='bg-[#2DC071] py-[15px] px-[40px] montserrat-bold text-[20px] text-white rounded-[5px] hover:bg-[#26a05e]'>ADD TO CART</button>
        </div>
      </div>
      <div className='w-[34%] absolute h-full bottom-0 right-8 bg-[url("/images/person.svg")] bg-top bg-cover max-md:h-[70vh] max-md:w-full max-md:static'></div>
      {/* <Image className='absolute' src={'/images/carousel.svg'} alt='Carousel' layout='fill'></Image> */}
        
    </section>
  )
}

export default Carousel2
