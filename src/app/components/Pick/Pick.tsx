import React from 'react'
import Image from 'next/image'
function Pick() {
    return (
        <section className='w-full flex items-center justify-center'>
            <div className='w-[73%] flex gap-[48px] py-[80px] items-center flex-col'>
                <div className='w-full flex flex-col items-center gap-[10px]'>
                    <h1 className='montserrat-bold text-primaryCol text-[24px]'>EDITORS PICK</h1>
                    <p className='montserrat-regular text-secondaryCol text-sm'>Problems trying to resolve the conflict between </p>
                </div>
                <div className='w-full h-[500px] grid gap-[30px] grid-rows-4 grid-cols-4 grid-flow-col'>
                    <div className='relative col-span-2 row-span-4'>
                        <Image src={'/images/pick1.svg'} alt='image' layout='fill' className='absolute'></Image>
                    </div>
                    <div className='relative col-span-1 row-span-4'>
                        <Image src={'/images/pick2.svg'} alt='image' layout='fill' className='absolute'></Image>
                    </div>
                    <div className='relative col-span-1 row-span-2'>
                        <Image src={'/images/pick3.svg'} alt='image' layout='fill' className='absolute'></Image>
                    </div>
                    <div className='relative col-span-1 row-span-2'>
                        <Image src={'/images/pick4.svg'} alt='image' layout='fill' className='absolute'></Image>
                    </div>


                </div>

            </div>

        </section>
    )
}

export default Pick
