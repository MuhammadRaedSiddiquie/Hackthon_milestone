'use client'
import React, { useEffect, useState } from 'react'
import Products from '../components/Products/Products'
import { fetchData } from '@/lib/fetchData';
import { dataset } from '@/sanity/env';

const WishlistPage = () => {
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
    const userId = 'google-oauth2|102988815370920618477'
    const dataQuery = `
  *[_type == "wishlist" && userId==$params][0].products[]{
    productId,
    title,
    price,
    rating,
    discountPercentage,
    description,
    image
  }
`;

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState < any > (null)
    //   useEffect(() => {
    //       setLoading(true)
    //       const userId = 'google-oauth2|102988815370920618477';
    //     try {
    //         const fetchWishlist = async () => {
    //             const dataQuery = `*[_type == "wishlist" && userId==$userId][0]{products[]{productId,title,price,rating,discountPercentage,description,image}}`;
    //             const data = await fetchData(dataQuery, { userId })
    //             setProduct(data.products)
    //             setLoading(false)
    //         }
    //         fetchWishlist();
    //     }
    //     catch (error) {
    //         console.error("Error fetching wishlist:", error);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }, [query])
    return (
        <section className='w-full h-screen flex items-start justify-center'>
            <Products
                query={dataQuery}
                params={userId}
            ></Products>
        </section>
    )
}

export default WishlistPage
