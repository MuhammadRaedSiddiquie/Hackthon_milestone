'use client'
// app/product/[id]/page.tsx
import axios from 'axios'
import { useParams } from 'next/navigation';
import { IoIosArrowForward } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import Image from 'next/image';
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Logos from '@/app/components/Logos/Logos';
import Products from '@/app/components/Products/Products';
import { useEffect, useState } from 'react';
import { fetchData } from '@/lib/fetchData';
import { useUser } from '@auth0/nextjs-auth0/client';
import { UserColorManagerProvider } from 'sanity';


export default function ProductDetails() {
    const params = useParams();
    const [product, setProduct] = useState < any > (null)
    const [loading, setLoading] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)
    const [selectedCol, setColor] = useState('#23A6F0');
    const { user } = useUser();
    const userId = user?.sub;


    const query = `*[_type == "product"]{
        id,
        title,
        description,
        images[]{
          _key,
          asset->{url} // This fetches the image URL from the asset reference
        },
        category,
        price,
        discountPercentage,
        rating,
        tags[],
        stock,
        brand,
        availabilityStatus
      }`;
    useEffect(() => {
        const id = params?.id;

        setLoading(true)
        if (id) {

            const fetchProduct = async () => {
                const dataQuery = `*[_type == "product" && id == $id]{id,title,description,images[]{_key,asset->{url} },category,price,discountPercentage,rating,tags[],stock,brand,availabilityStatus}`;
                const data = await fetchData(dataQuery, { id })
                setProduct(data[0])
                setLoading(false)

            }
            fetchProduct();
        }
        else {
            setLoading(false);
        }
    }, [params.id])

    useEffect(() => {
        if (userId && product) {
            console.log('Checking wishlist with:', { userId, productId: product.id });
            checkWishlist();
        }
    }, [userId, product]);

    const checkWishlist = async () => {
        const { id } = product;
        try {
            const response = await axios.get('/api/check-wishlist', {
                params: {
                    userId,
                    productId: id,
                },
            });
            console.log('API Response:', response.data);
            setIsInWishlist(response.data.isInWishlist);
        } catch (error) {
            console.error('Error checking wishlist:', error);
        }
    };



    async function addToCart(userId, product) {
        const { image, id, price } = product;

        try {
            const response = await axios.post('/api/add-to-cart', {
                userId,
                productId: id,
                quantity: 1,
                price,
                image,
            });

            if (response.data.success) {
                alert('Product added to cart successfully!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart.');
        }
    }
    async function addToWishlist(userId, product) {
        const { images, id, price, title, description, discountPercentage, rating } = product;
        const image = images[0]?.asset?.url;
        try {
            const response = await axios.post('/api/add-to-wishlist', {
                userId,
                productId: id,
                price,
                title,
                description,
                image,
                discountPercentage,
                rating
            });
            setIsInWishlist(true)
            if (response.data.success) {
                alert('Product added to cart successfully!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart.');
        }
    }
    async function removeFromWishlist(userId, product) {

        const { id } = product;

        try {
            const response = await axios.delete('/api/remove-wishlist', {
                data: {
                    userId,
                    productId: id,
                }
            });
            setIsInWishlist(false)
            if (response.data.success) {
                alert('Product removed from wishlist successfully!');
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            alert('Failed to remove product from wishlist.');
        }
    }


    return (
        <main className='w-full flex flex-col items-center justify-start'>
            {loading && (
                <div className='absolute inset-0 flex justify-center items-center bg-gray-200 opacity-75 z-10'>
                    <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
                </div>
            )}
            <div className='w-[73%] flex items-center justify-start py-[24px] max-lg:justify-center max-lg:w-full'>
                <div className='flex items-center gap-[4px]'>
                    <h3 className='montserrat-bold text-primaryCol text-sm xxl:text-2xl'>Home</h3>
                    <IoIosArrowForward className='text-secondaryCol xxl:text-2xl' />
                    <p className='montserrat-regular text-secondaryCol text-sm xxl:text-2xl'>Shop</p>
                </div>
            </div>
            {product ? <div className='w-[73%] xl:h-[70vh] flex justify-around max-lg:flex-col max-lg:w-[90%] max-lg:h-fit lg:h-[50vh] xx:h-[60vh]'>
                <div className='w-[40%] relative max-lg:w-full max-lg:h-[400px]'>
                    <Image src={product.images?.[0]?.asset?.url} alt={'product'} layout='fill' className='object-contain object-top'></Image>
                </div>
                <div className='w-[50%] flex flex-col items-start justify-start py-[16px] max-lg:w-full xxl:gap-[15px]'>
                    <h3 className='montserrat-bold text-primaryCol text-[24px] mb-2 xxl:text-4xl'>{product.title}</h3>
                    <div className='flex ga-[5px] mb-4'>
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaStar className='text-[#F3CD03] xxl:text-3xl' />
                        <FaRegStarHalfStroke className='text-[#F3CD03] xxl:text-3xl' />
                    </div>
                    <h3 className='montserrat-bold text-primaryCol text-[24px] mb-2 xxl:text-4xl'>${product.price}</h3>
                    <div className='flex gap-2'>
                        <p className='montserrat-bold text-primaryCol text-sm xxl:text-xl'>Availibility</p>
                        <p className='montserrat-regular text-blueCol text-sm xxl:text-xl'>In Stock</p>
                    </div>
                    <p className='montserrat-regular text-secondaryCol text-sm my-2 xxl:text-xl'>Met minim Mollie non desert Alamo est sit cliquey dolor
                        do met sent. RELIT official consequent door ENIM RELIT Mollie.
                        Excitation venial consequent sent nostrum met.</p>
                    <hr className='bg-[#f3f3f3] h-[2px] w-[90%] my-6' />
                    <div className='flex items-start gap-[6px]'>

                        {
                            ['#23A6F0', '#23856D', '#E77C40', '#252B42'].map((col, index) => (
                                <span style={{ backgroundColor: `${col}` }} key={index} className={` ' w-[25px] h-[25px] rounded-[50%] outline-[2px] outline-none ' ${col === selectedCol ? 'outline-[#c1c1c1]' : ''} `} onClick={() => { setColor(col) }} aria-label={`Color option ${col}`} role='Button'></span>
                            ))
                        }
                    </div>
                    <div className='flex gap-[10px] items-center justify-start mt-10'>

                        <button onClick={() => addToCart(userId, product)} className='bg-blueCol text-sm text-white montserrat-bold rounded-[5px] py-[10px] px-[20px] hover:bg-blueHov xxl:text-xl'>
                            Select Options</button>
                        <button onClick={() => {
                            isInWishlist ? removeFromWishlist(userId, product) : addToWishlist(userId, product);
                        }} className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#e3e3e3]'>
                            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        {/* <div onClick={() => addToWishlist(userId, product)} className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#e3e3e3]'>{isInWishlist ? <FaHeart /> : <FaRegHeart />}</div> */}
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#e3e3e3]'><CiShoppingCart /></div>
                        <div className='px-[10px] py-[10px] rounded-[50%] border-[1px] border-primaryCol hover:bg-[#e3e3e3]'><FaEye /></div>
                    </div>
                </div>


            </div> : 'no products available'}
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
                    </div>
                </div>
            </div>
            <Products
                query={query}></Products>
            <div className='w-[73%] max-lg:hidden'>
                <Logos></Logos>
            </div>
        </main>
    );
}
