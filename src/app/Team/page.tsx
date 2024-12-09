import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Card4 from '../components/Card4/Card4'
import Trial from '../components/Trial/Trial'

function page() {
    return (
        <main className='w-full flex flex-col items-center justify-start'>
            <div className='w-full flex items-center flex-col'>
                <div className='w-[73%] flex flex-col items-center gap-[16px] py-[50px]'>
                    <h4 className='montserrat-bold text-base text-secondaryCol'>WHAT WE DO</h4>
                    <h1 className='montserrat-bold text-[58px] text-primaryCol text-center max-md:text-[40px]'>Innovation Tailored For You</h1>
                    <div className='flex items-center gap-[4px]'>
                        <h3 className='montserrat-bold text-primaryCol text-sm'>Home</h3>
                        <IoIosArrowForward className='text-secondaryCol' />
                        <p className='montserrat-regular text-secondaryCol text-sm'>Team</p>
                    </div>
                </div>
                <div className='w-full h-[530px] flex justify-between max-md:flex-col'>
                    <div className='w-[49.5%] h-full bg-[url("/images/grid1.svg")] bg-top bg-cover max-md:w-full'></div>
                    <div className='w-[49.5%] h-full flex justify-between items-center flex-wrap max-md:w-full'>
                        <div className='w-[49%] h-[48%] bg-[url("/images/grid2.svg")] bg-top bg-cover'></div>
                        <div className='w-[49%] h-[48%] bg-[url("/images/grid3.svg")] bg-top bg-cover'></div>
                        <div className='w-[49%] h-[48%] bg-[url("/images/grid4.svg")] bg-top bg-cover'></div>
                        <div className='w-[49%] h-[48%] bg-[url("/images/grid5.svg")] bg-top bg-cover'></div>
                    </div>

                </div>
            </div>
            <div className='w-[73%] flex flex-col items-center justify-center gap-[112px] py-[112px] max-md:gap-[30px]'>
                <div className='flex flex-col items-center justify-center gap-[10px] max-md:w-[95%] max-md:text-center'>
                    <h1 className='montserrat-bold text-[40px] text-primaryCol max-md:text-[32px]'>Meet Our Team</h1>
                </div>
                <div className='w-full flex items-center gap-[112px] flex-col max-md:gap-[30px]'>

                    <div className='w-full flex items-center gap-[30px] max-md:flex-col'>
                        <Card4
                            image={'/images/media-9.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                        <Card4
                            image={'/images/media-8.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                        <Card4
                            image={'/images/media-1.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                    </div>
                    <div className='w-full flex items-center gap-[30px] max-md:flex-col'>
                        <Card4
                            image={'/images/media-2.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                        <Card4
                            image={'/images/media-3.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                        <Card4
                            image={'/images/media-4.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                    </div>
                    <div className='w-full flex items-center gap-[30px] max-md:flex-col'>
                        <Card4
                            image={'/images/media-5.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                        <Card4
                            image={'/images/media-6.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                        <Card4
                            image={'/images/media-7.svg'}
                            title={'Username'}
                            subtitle={'Profession'}></Card4>
                    </div>



                </div>


            </div>
            <div className='w-[73%]'>
<Trial></Trial>
            </div>


        </main>
    )
}

export default page
