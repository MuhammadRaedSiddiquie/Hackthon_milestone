import React from 'react'

function Carousel2() {
  return (
    <section className='w-full h-[80vh] bg-[#23856D] flex items-center justify-center py-[112px] relative max-lg:flex-col max-lg:h-fit max-lg:pb-0'>
      <div className='w-[73%] flex items-center relative z-10 max-md:w-[90%] max-lg:justify-center'>
        <div className='flex flex-col py-[48px] gap-[35px] items-start max-lg:items-center'>
          <h3 className='montserrat-bold text-white text-base xxl:text-[22px]'>SUMMER 2020</h3>
          <h1 className='montserrat-bold w-[90%] text-white text-[58px] max-md:text-[40px] max-lg:w-full max-lg:px-8 max-lg:text-center'>VITA CLASSIC PRODUCT</h1>
          <p className='montserrat-regular text-white text-[20px] tracking-[0.2px] w-[70%] max-lg:w-full max-lg:text-center max-lg:px-8 xxl:text-2xl'>We know how large objects will act
          but things on a small scale</p>
          <button className='bg-[#2DC071] py-[15px] px-[40px] montserrat-bold text-[20px] text-white rounded-[5px] hover:bg-[#26a05e] xxl:text-2xl'>ADD TO CART</button>
        </div>
      </div>
      <div className='w-[34%] absolute h-full bottom-0 right-8 bg-[url("/images/person.svg")] bg-bottom bg-contain bg-no-repeat max-lg:h-[60vh] max-lg:w-full max-lg:static'></div>
      {/* <Image className='absolute' src={'/images/carousel.svg'} alt='Carousel' layout='fill'></Image> */}
        
    </section>
  )
}

export default Carousel2
