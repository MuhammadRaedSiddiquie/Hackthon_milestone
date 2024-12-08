import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import Card3 from '../components/Card3/Card3';
import Logos from '../components/Logos/Logos';


function page() {
    return (
        <main className='w-full flex flex-col items-center justify-start'>
            <div className='w-full flex items-center justify-center py-[24px]'>
                <div className='w-[73%] flex items-center justify-between max-md:flex-col max-md:gap-[30px]'>
                    <h2 className='montserrat-bold text-primaryCol text-[24px]'>SHOP</h2>
                    <div className='flex items-center gap-[4px]'>
                        <h3 className='montserrat-bold text-primaryCol text-sm'>Home</h3>
                        <IoIosArrowForward className='text-secondaryCol' />
                        <p className='montserrat-regular text-secondaryCol text-sm'>Shop</p>
                    </div>
                </div>
            </div>
            <div className='w-[73%] flex items-center gap-[15px] py-[24px] max-md:flex-col'>
                <div className='w-[20%] h-[223px] bg-center bg-cover bg-[url("/images/cat1.svg")] max-md:w-[90%]'></div>
                <div className='w-[20%] h-[223px] bg-center bg-cover bg-[url("/images/cat2.svg")] max-md:w-[90%]'></div>
                <div className='w-[20%] h-[223px] bg-center bg-cover bg-[url("/images/cat3.svg")] max-md:w-[90%]'></div>
                <div className='w-[20%] h-[223px] bg-center bg-cover bg-[url("/images/cat4.svg")] max-md:w-[90%]'></div>
                <div className='w-[20%] h-[223px] bg-center bg-cover bg-[url("/images/cat5.svg")] max-md:w-[90%]'></div>
            </div>
            <div className='w-[73%] py-[24px] flex items-center justify-between max-md:flex-col max-md:gap-[24px]'>
                <p className='montserrat-regular text-secondaryCol text-sm'>Show all 12 results</p>
                <div className='flex items-center gap-3'>
                    <p className='montserrat-regular text-secondaryCol text-sm'>Views:</p>
                    <div className='px-[15px] py-[15px] border-secondaryCol border-[1px] rounded-[5px]'></div>
                    <div className='px-[15px] py-[15px] border-secondaryCol border-[1px] rounded-[5px]'></div>

                </div>
                <div className='flex gap-2'>
                    <button className='bg-white border-secondaryCol border-[1px] text-sm text-secondaryCol rounded-[5px] py-[10px] px-[25px]'>Popularity</button>
                    <button className='bg-blueCol text-sm text-white rounded-[5px] py-[10px] px-[20px]'>Filter</button>
                </div>
            </div>
            <div className='w-[73%] h-fit'>
            <Logos></Logos>
            </div>
            <div className='w-[73%] grid grid-cols-4 grid-flow-row place-items-center max-md:grid-cols-1'>
            <Card3
                        image={'/images/product9.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3
                        image={'/images/product10.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3
                        image={'/images/product11.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3
                        image={'/images/product12.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-1.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-2.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-3.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-4.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-5.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-6.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-7.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>
                    <Card3 
                        image={'/images/product-8.svg'}
                        title={'Graphic Designer'}
                        info={'English Department'}
                        price={16.48}
                        discount={6.48}
                    ></Card3>


                </div>
                <div className='w-[73%] flex items-center justify-center py-[24px]'>
                    <div className='rounded-[5px] bg-white border-2 border-[#f3f3f3] flex items-center jusify-center'>
<button className='montserrat-bold text-sm text-secondaryCol bg-[#f3f3f3] p-[25px] border-r-2 border-[#f3f3f3]'>First</button>
<button className='montserrat-bold text-sm text-blueCol bg-white px-[20px] py-[25px]'>1</button>
<button className='montserrat-bold text-sm text-white bg-blueCol px-[20px] py-[25px]'>2</button>
<button className='montserrat-bold text-sm text-blueCol bg-white px-[20px] py-[25px]'>3</button>
<button className='montserrat-bold text-sm text-blueCol bg-white p-[25px] border-l-2 border-[#f3f3f3]'>Next</button>
                    </div>
                </div>

        </main>

    )
}

export default page
