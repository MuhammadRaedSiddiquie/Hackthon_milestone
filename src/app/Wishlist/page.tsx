'use client'
import React, { useEffect, useState } from 'react';
import useWishlistStore from '../stores/useWishlistStore';
import axios from 'axios';
import Card from '../components/Card/Card';
import { IoIosArrowForward } from 'react-icons/io';

const WishlistPage = () => {
    const { items, syncWishlist } = useWishlistStore();
    const [display,setDisplay]=useState('')

    const userId = 'google-oauth2|102988815370920618477'; // Replace with dynamic user ID

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('/api/wishlist', { params: { userId } });
                if (response.status === 200) {
                    syncWishlist(response.data.items);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, [userId, syncWishlist]);

    return (
        <section className='w-full flex flex-col items-center justify-start'>
            <div className='w-full flex items-center justify-center py-[24px]'>
                <div className='w-[73%] flex items-center justify-between max-md:flex-col max-md:gap-[30px]'>
                    <h2 className='montserrat-bold text-primaryCol text-[24px] xxl:text-4xl'>SHOP</h2>
                    <div className='flex items-center gap-[4px]'>
                        <h3 className='montserrat-bold text-primaryCol text-sm xxl:text-xl'>Home</h3>
                        <IoIosArrowForward className='text-secondaryCol' />
                        <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Shop</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col items-center gap-[10px] max-md:text-center'>
                    <p className='montserrat-regular text-secondaryCol text-[20px] xxl:text-2xl'>Featured Products</p>
                    <h1 className='montserrat-bold text-primaryCol text-[24px] xxl:text-4xl'>WISHLIST</h1>
                    {/* <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Problems trying to resolve the conflict between </p> */}
                </div>
            <div className={` 'w-[73%] grid gap-x-[30px] place-items-center grid-flow-row max-sm:grid-cols-1 ' ${display === 'inline' ? 'sm:grid-cols-1 lg:grid-cols-1 xx:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3 xx:grid-cols-4'}`}>
                {items?.map((product: any) => (
                    <Card
                        key={product.id}
                        id={product.id}
                        image={product.images?.[0]?.asset?.url || product.image}
                        title={product.title}
                        info={product.description}
                        price={product.price}
                        discount={product.discountPercentage}
                        rating={product.rating}
                        display={display}
                    ></Card>
                ))}



            </div>
        </section>
    );
};

export default WishlistPage;
// 'use client'

// import Products from "@/app/components/Products/Products";
// import useAuthStore from "../stores/useAuthStore";





// const WishlistPage = () => {
//     const { user } = useAuthStore();
//     const userId = user?.sub;
//     console.log(user,userId)
//     const dataQuery = `
//   *[_type == "wishlist" && userId==$params][0].products[]{
//     id,
//     title,
//     price,
//     rating,
//     discountPercentage,
//     description,
//     image
//   }
// // `;
//     return (
//         <section className='w-full flex items-start justify-center'>
//             {user?(<Products
//                 query={dataQuery}
//                 params={userId}
//                 view=''
//             ></Products>):"login please"}
//         </section>
//     )
// }

// export default WishlistPage
