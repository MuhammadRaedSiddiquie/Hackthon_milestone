import React from 'react'
import Image from 'next/image'
function Pick() {
    return (
        <section className='w-full flex items-center justify-center'>
            <div className='w-[75%] flex gap-[48px] py-[80px] items-center justify-center flex-col'>
                <div className='w-full flex flex-col items-center gap-[10px] max-md:text-center'>
                    <h1 className='montserrat-bold text-primaryCol text-[24px] xxl:text-4xl'>EDITORS PICK</h1>
                    <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Problems trying to resolve the conflict between </p>
                </div>
                <div className='w-full grid gap-x-[30px] gap-y-[30px] grid-rows-4 grid-cols-3 grid-flow-col max-md:grid-rows-6 max-md:gap-x-0 max-md:grid-cols-1'>
                    <div className='relative h-[500px] col-span-1 row-span-4 max-md:h-[500px] max-md:row-span-2 xxl:h-[600px]'>
                        <Image src={'/images/pick1.svg'} alt='image' layout='fill' className='absolute object-cover object-top'>
                        </Image>
                        <div className='w-full h-full bg-transparent flex items-end justify-start absolute z-10'>
                            <div className='py-[12px] px-[48px] bg-[#ffffff] flex items-center mb-[35px] ml-[30px] justify-center text-sm text-black montserrat-bold xxl:text-xl'>MEN</div>
                        </div>
                    </div>
                    <div className='relative h-[500px] col-span-1 row-span-4 max-md:h-[500px] max-md:row-span-2 xxl:h-[600px]'>
                        <Image src={'/images/pick2.svg'} alt='image' layout='fill' className='absolute object-cover object-top'></Image>
                        <div className='w-full h-full bg-transparent flex items-end justify-start absolute z-10'>
                            <div className='py-[12px] px-[48px] bg-[#ffffff] flex items-center mb-[35px] ml-[30px] justify-center text-sm text-black montserrat-bold xxl:text-xl'>WOMEN</div>
                        </div>
                    </div>
                    <div className='relative h-[235px] col-span-1 row-span-2 max-md:h-[250px] max-md:row-span-1 xxl:h-[285px]'>
                        <Image src={'/images/pick3.svg'} alt='image' layout='fill' className='absolute object-cover object-top'></Image>
                        <div className='w-full h-full bg-transparent flex items-end justify-start absolute z-10'>
                            <div className='py-[12px] px-[36px] bg-[#ffffff] flex items-center mb-[35px] ml-[30px] justify-center text-sm text-black montserrat-bold xxl:text-xl'>ACCESSORIES</div>
                        </div>
                    </div>
                    <div className='relative h-[235px] col-span-1 row-span-2 max-md:h-[250px] max-md:row-span-1 xxl:h-[285px]'>
                        <Image src={'/images/pick4.svg'} alt='image' layout='fill' className='absolute object-cover object-top'></Image>
                        <div className='w-full h-full bg-transparent flex items-end justify-start absolute z-10'>
                            <div className='py-[12px] px-[48px] bg-[#ffffff] flex items-center mb-[35px] ml-[30px] justify-center text-sm text-black montserrat-bold xxl:text-xl'>KIDS</div>
                        </div>
                    </div>


                </div>
                {/* <div className='w-full flex'>
                    <div className='relative w-[25%] h-[500px]'>
                    <Image src={'/images/pick1.svg'} alt='image' layout='fill' className='absolute'></Image>

                    </div>


                </div> */}

            </div>

        </section>
    )
}

export default Pick
