'use client'
// app/product/[id]/page.tsx
import { useSearchParams } from 'next/navigation';
import { IoIosArrowForward } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FaStar } from "react-icons/fa6";
import Image from 'next/image';
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Logos from '@/app/components/Logos/Logos';
import Products from '@/app/components/Products/Products';



export default function ProductDetails(/*{ params }: { params: { id: string } }*/) {
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    // const info = searchParams.get('info');
    const price = searchParams.get('price');
    // const discount = searchParams.get('discount');
    const image = searchParams.get('image') || '{}';

    return (
        <main className='w-full flex flex-col items-center justify-start'>

            <div className='w-[73%] flex items-center justify-start py-[24px] max-lg:justify-center max-lg:w-full'>

                <div className='flex items-center gap-[4px]'>
                    <h3 className='montserrat-bold text-primaryCol text-sm xxl:text-2xl'>Home</h3>
                    <IoIosArrowForward className='text-secondaryCol xxl:text-2xl' />
                    <p className='montserrat-regular text-secondaryCol text-sm xxl:text-2xl'>Shop</p>
                </div>
            </div>
            <div className='w-[73%] xl:h-[70vh] flex justify-around max-lg:flex-col max-lg:w-[90%] max-lg:h-fit lg:h-[50vh] xx:h-[60vh]'>
                <div className='w-[40%] relative max-lg:w-full max-lg:h-[400px]'>
                    <Image src={image} alt={'product'} layout='fill' className='object-cover object-center'></Image>
                </div>
                <div className='w-[50%] flex flex-col items-start justify-start py-[16px] max-lg:w-full xxl:gap-[15px]'>
                    <h3 className='montserrat-bold text-primaryCol text-[24px] mb-2 xxl:text-4xl'>{title}</h3>
                    <div className='flex ga-[5px] mb-4'>
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaRegStarHalfStroke className='text-[#F3CD03] xxl:text-3xl' />
                    </div>
                    <h3 className='montserrat-bold text-primaryCol text-[24px] mb-2 xxl:text-4xl'>${price}</h3>
                    <div className='flex gap-2'>
                        <p className='montserrat-bold text-primaryCol text-sm xxl:text-xl'>Availibility</p>
                        <p className='montserrat-regular text-blueCol text-sm xxl:text-xl'>In Stock</p>
                    </div>
                    <p className='montserrat-regular text-secondaryCol text-sm my-2 xxl:text-xl'>Met minim Mollie non desert Alamo est sit cliquey dolor
                        do met sent. RELIT official consequent door ENIM RELIT Mollie.
                        Excitation venial consequent sent nostrum met.</p>
                    <hr className='bg-[#f3f3f3] h-[2px] w-[90%] my-6' />
                    <div className='flex items-start gap-[6px]'>
                        <span className='w-[25px] h-[25px] rounded-[50%] bg-blueCol hover:border-[1px]'></span>
                        <span className='w-[25px] h-[25px] rounded-[50%] bg-[#23856D] hover:border-[1px]'></span>
                        <span className='w-[25px] h-[25px] rounded-[50%] bg-[#E77C40] hover:border-[1px]'></span>
                        <span className='w-[25px] h-[25px] rounded-[50%] bg-primaryCol hover:border-[1px]'></span>
                    </div>
                    <div className='flex gap-[10px] items-center justify-start mt-10'>
                        <button className='bg-blueCol text-sm text-white montserrat-bold rounded-[5px] py-[10px] px-[20px] hover:bg-blueHov xxl:text-xl'>Select Options</button>
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#e3e3e3]'><CiHeart /></div>
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#e3e3e3]'><CiShoppingCart /></div>
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#e3e3e3]'><FaEye /></div>
                    </div>
                </div>


            </div>
            <div className='w-[73%] flex flex-col items-start gap-[24px] pt-[100px] px-[20px] max-lg:items-center max-lg:w-[90%]'>
            <h2 className='montserrat-bold text-primaryCol text-[40px] max-md:text-[24px]'>Customer Reviews :</h2>
                <div className='w-full flex px-[20px] justify-between max-md:flex-col max-lg:gap-[25px]'>
                    <div className='w-[48%] h-[200px] flex flex-col items-start px-10 gap-[10px] justify-center bg-[#f3f3f3] rounded-[30px] max-md:items-center max-md:w-full'>
                    
                    <h1 className='montserrat-bold text-primaryCol text-[58px] leading-[3rem]'>4.2</h1>
                    <div className='flex gap-[5px]'>
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaRegStarHalfStroke className='text-[#F3CD03] text-3xl' />
                    </div>
                    <p className='montserrat-regular text-blueCol text-sm xxl:text-xl'>All from verified resources</p>
                </div>
                <div className='w-[48%] h-[200px] flex flex-col items-start px-10 gap-[10px] justify-center bg-[#f3f3f3] rounded-[30px] max-lg:w-full'>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base xxl:text-xl' />
                            

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>(99)</p>
                    </div>
                </div></div>
            </div>

            <Products></Products>
            <div className='w-[73%] max-lg:hidden'>
                <Logos></Logos>
            </div>


        </main>
    );
}
