import React from 'react'

function Logos() {
    return (
        <div className='w-full flex  items-center justify-center py-[50px] gap-[30px] max-md:flex-col'>
            <div className='w-[20%] h-[100px] bg-center bg-no-cover bg-no-repeat bg-[url("/images/logo1.svg")] max-md:w-[90%]'></div>
            <div className='w-[20%] h-[100px] bg-center bg-no-cover bg-no-repeat bg-[url("/images/logo2.svg")] max-md:w-[90%]'></div>
            <div className='w-[20%] h-[100px] bg-center bg-no-cover bg-no-repeat bg-[url("/images/logo3.svg")] max-md:w-[90%]'></div>
            <div className='w-[20%] h-[100px] bg-center bg-no-cover bg-no-repeat bg-[url("/images/logo4.svg")] max-md:w-[90%]'></div>
            <div className='w-[20%] h-[100px] bg-center bg-no-cover bg-no-repeat bg-[url("/images/logo5.svg")] max-md:w-[90%]'></div>
        </div>
    )
}

export default Logos
