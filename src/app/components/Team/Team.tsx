import React from 'react'
import Card4 from '../Card4/Card4'

function Team() {
    return (
        <div className='w-[73%] flex flex-col items-center justify-center gap-[112px] py-[112px] max-md:py-[36px] max-md:gap-[48px]'>
            <div className='flex flex-col items-center justify-center gap-[10px] max-md:w-[95%] max-md:text-center'>
                <h1 className='montserrat-bold text-[40px] text-primaryCol'>Our Team</h1>
                <p className='montserrat-bold text-sm text-secondaryCol xxl:text-xl'>Problems trying to resolve the conflict between
                    the two major realms of Classical physics: Newtonian mechanics </p>
            </div>
            <div className='w-full flex items-center justify-center gap-[30px] max-l:flex-wrap'>

                <Card4
                    image={'/images/person-1.svg'}
                    title={'Username'}
                    subtitle={'Profession'}></Card4>
                <Card4
                    image={'/images/person-2.svg'}
                    title={'Username'}
                    subtitle={'Profession'}></Card4>
                <Card4
                    image={'/images/person-3.svg'}
                    title={'Username'}
                    subtitle={'Profession'}></Card4>



            </div>


        </div>
    )
}

export default Team
