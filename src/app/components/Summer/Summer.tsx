import React from 'react'
import Image from 'next/image'

function Summer() {
    return (
        <section className='w-full flex items-center justify-center gap-[30px] max-md:flex-col-reverse'>
            <div className='relative h-[700px] w-[700px] max-md:w-full max-md:h-[430px]'>
                <Image className='absolute' src={'/images/image1.svg'} alt='Image' layout='fill'></Image>
            </div>
            <div className='flex flex-col gap-[30px] items-start  max-md:w-full max-md:items-center max-md:pt-[120px]'>
                <h3 className='montserrat-bold text-secondaryCol text-base'>SUMMER 2020</h3>
                <h1 className='montserrat-bold text-primaryCol text-[40px] max-md:text-center'>Part of the Neural <br />Universe</h1>
                <p className='montserrat-regular text-secondaryCol text-[20px] max-md:text-center'>We know how large objects will act,
                    but things on a small scale.</p>
                <div className='flex gap-[10px] items-center max-md:flex-col max-md:gap-[25px]'>
                    <button className='bg-[#2DC071] py-[15px] px-[40px] montserrat-bold text-sm text-white rounded-[5px] max-md:bg-blueCol'>BUY NOW</button>
                    <button className='bg-white py-[15px] px-[40px] montserrat-bold text-[#2DC071] text-sm border-[1px] border-[#2DC071] rounded-[5px] max-md:border-blueCol max-md:text-blueCol'>READ MORE</button>
                </div>
            </div>

        </section>
    )
}

export default Summer
