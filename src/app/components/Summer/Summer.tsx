import React from 'react'
import Image from 'next/image'

function Summer() {
    return (
        <section className='w-full flex items-center justify-center gap-[30px]'>
            <div className='relative h-[700px] w-[700px]'>
                <Image className='absolute' src={'/images/image1.svg'} alt='Image' layout='fill'></Image>
            </div>
            <div className='flex flex-col gap-[30px] items-start'>
                <h3 className='montserrat-bold text-secondaryCol text-base'>SUMMER 2020</h3>
                <h1 className='montserrat-bold text-primaryCol text-[40px]'>Part of the Neural <br />Universe</h1>
                <p className='montserrat-regular text-secondaryCol text-[20px]'>We know how large objects will act,
                    but things on a small scale.</p>
                <div className='flex gap-[10px] items-center'>
                    <button className='bg-[#2DC071] py-[15px] px-[40px] montserrat-bold text-sm text-white rounded-[5px]'>BUY NOW</button>
                    <button className='bg-white py-[15px] px-[40px] montserrat-bold text-[#2DC071] text-sm border-[1px] border-[#2DC071] rounded-[5px]'>READ MORE</button>
                </div>
            </div>

        </section>
    )
}

export default Summer
