import React from 'react'
import Image from 'next/image'

function Summer() {
    return (
        <section className='w-full flex items-center justify-center gap-[30px] max-lg:flex-col-reverse'>
            <div className='relative h-[700px] w-[700px] max-lg:w-full max-xs:h-[430px] xs:h-[60vh]'>
                <Image className='absolute xs:object-cover xs:object-top' src={'/images/image1.svg'} alt='Image' layout='fill'></Image>
            </div>
            <div className='flex flex-col gap-[30px] items-start  max-lg:w-full max-lg:items-center max-lg:pt-[120px]'>
                <h3 className='montserrat-bold text-secondaryCol text-base xxl:text-[22px]'>SUMMER 2020</h3>
                <h1 className='montserrat-bold text-primaryCol text-[40px] max-lg:text-center'>Part of the Neural <br />Universe</h1>
                <p className='montserrat-regular text-secondaryCol text-[20px] max-lg:text-center xxl:text-2xl'>We know how large objects will act,
                    but things on a small scale.</p>
                <div className='flex gap-[10px] items-center max-lg:flex-col max-lg:gap-[25px]'>
                    <button className='bg-[#2DC071] py-[15px] px-[40px] montserrat-bold text-sm text-white rounded-[5px] hover:bg-[#26a05e] max-md:bg-blueCol xxl:text-xl'>BUY NOW</button>
                    <button className='bg-white py-[15px] px-[40px] montserrat-bold text-[#2DC071] text-sm border-[1px] border-[#2DC071] rounded-[5px] hover:bg-[#2DC071] hover:text-white max-md:border-blueCol max-md:text-blueCol xxl:text-xl'>READ MORE</button>
                </div>
            </div>

        </section>
    )
}

export default Summer
