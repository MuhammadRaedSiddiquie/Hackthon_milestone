import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'

function Trial() {
    return (
        <div className='w-full flex py-[80px] items-center justify-center'>
            <div className='flex flex-col items-center gap-[30px]'>
                <h2 className='montserrat-bold text-[40px] text-primaryCol text-center'>Start your 14 days free trial</h2>
                <p className='montserrat-regular text-sm text-secondaryCol text-center w-[60%] max-md:w-[80%]'>Met minim Mollie non desert Alamo est sit cliquey dolor
                    do met sent. RELIT official consequent</p>
                <button className='bg-blueCol rounded-[5px] py-[15px] px-[40px] text-white text-sm montserrat-bold'>Try it now</button>
                <div className='flex items-center gap-[30px]'>
                    <FaFacebook className='text-primaryCol text-4xl' />
                    <FaInstagram className='text-primaryCol text-4xl' />
                    <FaTwitter className='text-primaryCol text-4xl' />
                    <FaLinkedin className='text-primaryCol text-4xl' />
                </div>
            </div>
        </div>
    )
}

export default Trial
