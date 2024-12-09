import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

function Faq() {
    return (
        <div className='w-[50%] px-[20px] py-[24px] gap-[12px] flex items-start max-md:w-full hover:shadow-[0px_3px_20px_0px_#00000024]'>
            <div className='w-[10%] flex items-center justify-start'>
                <IoIosArrowForward className='text-blueCol text-3xl' />
            </div>
            <div className='w-[90%] flex flex-col items-start gap-[10px]'>
                <h4 className='montserrat-bold text-primaryCol text-base'>The quick fox jumps over the lazy dog</h4>
                <p className='montserrat-regular text-secondaryCol text-sm'>Met minim Mollie non desert Alamo est sit cliquey
                    dolor do met sent. RELIT official consequent door ENIM
                    RELIT Mollie. Excitation venial consequent sent
                    nostrum met.</p>
            </div>
        </div>
    )
}

export default Faq
