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

            <div className='w-[73%] flex items-center justify-start py-[24px] max-md:justify-center max-md:w-full'>

                <div className='flex items-center gap-[4px]'>
                    <h3 className='montserrat-bold text-primaryCol text-sm'>Home</h3>
                    <IoIosArrowForward className='text-secondaryCol' />
                    <p className='montserrat-regular text-secondaryCol text-sm'>Shop</p>
                </div>
            </div>
            <div className='w-[73%] h-[70vh] flex justify-around max-md:flex-col max-md:w-[90%] max-md:h-fit'>
                <div className='w-[40%] relative max-md:w-full max-md:h-[400px]'>
                    <Image src={image} alt={'product'} layout='fill' className='object-cover'></Image>
                </div>
                <div className='w-[50%] flex flex-col items-start justify-start py-[16px] max-md:w-full'>
                    <h3 className='montserrat-bold text-primaryCol text-[24px] mb-2'>{title}</h3>
                    <div className='flex ga-[5px] mb-4'>
                        <FaStar className='text-[#F3CD03]' />
                        <FaStar className='text-[#F3CD03]' />
                        <FaStar className='text-[#F3CD03]' />
                        <FaStar className='text-[#F3CD03]' />
                        <FaRegStarHalfStroke className='text-[#F3CD03]' />
                    </div>
                    <h3 className='montserrat-bold text-primaryCol text-[24px] mb-2'>${price}</h3>
                    <div className='flex gap-2'>
                        <p className='montserrat-bold text-primaryCol text-sm'>Availibility</p>
                        <p className='montserrat-regular text-blueCol text-sm'>In Stock</p>
                    </div>
                    <p className='montserrat-regular text-secondaryCol text-sm my-2'>Met minim Mollie non desert Alamo est sit cliquey dolor
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
                        <button className='bg-blueCol text-sm text-white montserrat-bold rounded-[5px] py-[10px] px-[20px] hover:bg-blueHov'>Select Options</button>
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#f3f3f3]'><CiHeart /></div>
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#f3f3f3]'><CiShoppingCart /></div>
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#f3f3f3]'><FaEye /></div>
                    </div>
                </div>


            </div>
            <div className='w-full flex flex-col items-start gap-[24px] pt-[100px] px-[20px] max-md:items-center'>
            <h2 className='montserrat-bold text-primaryCol text-[40px] max-md:text-[24px]'>Customer Reviews :</h2>
                <div className='w-full flex px-[20px] justify-between max-md:flex-col max-md:gap-[25px]'>
                    <div className='w-[48%] h-[200px] flex flex-col items-start px-10 gap-[10px] justify-center bg-[#f3f3f3] rounded-[30px] max-md:items-center max-md:w-full'>
                    
                    <h1 className='montserrat-bold text-primaryCol text-[58px] leading-[3rem]'>4.2</h1>
                    <div className='flex gap-[5px]'>
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaStar className='text-[#F3CD03] text-3xl' />
                        <FaRegStarHalfStroke className='text-[#F3CD03] text-3xl' />
                    </div>
                    <p className='montserrat-regular text-blueCol text-sm'>All from verified resources</p>
                </div>
                <div className='w-[48%] h-[200px] flex flex-col items-start px-10 gap-[10px] justify-center bg-[#f3f3f3] rounded-[30px] max-md:w-full'>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />
                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base' />
                            <FaStar className='text-[#F3CD03] text-base' />

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm'>(99)</p>
                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <div className='flex gap-[5px]'>
                            <FaStar className='text-[#F3CD03] text-base' />
                            

                        </div>
                        <p className='montserrat-regular text-secondaryCol text-sm'>(99)</p>
                    </div>
                </div></div>
            </div>

            <Products></Products>
            <div className='w-[73%] max-md:hidden'>
                <Logos></Logos>
            </div>


        </main>
    );
}
