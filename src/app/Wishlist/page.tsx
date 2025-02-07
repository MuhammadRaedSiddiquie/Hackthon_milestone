'use client'
// import React, { useState } from 'react'
import Products from '../components/Products/Products'


const WishlistPage = () => {
   
    const userId = 'google-oauth2|102988815370920618477'
    const dataQuery = `
  *[_type == "wishlist" && userId==$params][0].products[]{
    id,
    title,
    price,
    rating,
    discountPercentage,
    description,
    image
  }
// `;
//     const [loading, setLoading] = useState(false)
//     const [product, setProduct] = useState < any > (null)
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
        <section className='w-full flex items-start justify-center'>
            <Products
                query={dataQuery}
                params={{userId}}
                view=''
            ></Products>
        </section>
    )
}

export default WishlistPage
