import React from 'react'
import Card2 from '../Card2/Card2'

function Feature() {
    return (
        <section className='w-full flex items-center justify-center'>
            <div className='w-[73%] flex gap-[80px] py-[80px] items-center flex-col'>
                <div className='w-full flex flex-col items-center gap-[10px] max-md:text-center'>
                    <p className='montserrat-regular text-blueCol text-sm xxl:text-xl'>Practice Advice</p>
                    <h1 className='montserrat-bold text-primaryCol text-[40px] xxl:text-4xl'>FEATURED POSTS</h1>
                    <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Problems trying to resolve the conflict between
                        the two major realms of Classical physics: Newtonian mechanics </p>
                </div>
                <div className='w-full flex items-center justify-center gap-[30px] max-md:flex-col'>
                    <Card2
                        image='/images/feature1.svg'
                        title='Loudest la Madison 1
                    Lintegral'
                        info='We focus on ergonomics and meeting
                    you where you work. Its only a
                    keystroke away'></Card2>

                    <Card2
                        image='/images/feature2.svg'
                        title='Loudest la Madison 1
                    Lintegral'
                        info='We focus on ergonomics and meeting
                    you where you work. Its only a
                    keystroke away'></Card2>
                    <Card2
                        image='/images/feature3.svg'
                        title='Loudest la Madison 1
                    Lintegral'
                        info='We focus on ergonomics and meeting
                    you where you work. Its only a
                    keystroke away'></Card2>
                </div>

            </div>

        </section>
    )
}

export default Feature
