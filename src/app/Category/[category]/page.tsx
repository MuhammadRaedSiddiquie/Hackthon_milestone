'use client'
import Products from '@/app/components/Products/Products';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



const CategoryPage = () => {
  const params = useParams();
  const productCategory = params?.category
  const categoryMappings: Record<string, string[]> = {
    "fashion-accessories": [
      "mens-shirts", "mens-shoes", "mens-watches", "sunglasses",
      "womens-bags", "womens-dresses", "womens-jewellery",
      "womens-shoes", "womens-watches", "tops"
    ],
    "beauty-personal-care": ["beauty", "skin-care", "fragrances"],
    "electronics-gadgets": ["laptops", "mobile-accessories", "smartphones", "tablets"],
    "home-living": ["furniture", "home-decoration", "kitchen-accessories", "groceries"],
    "sports-automotive": ["motorcycle", "sports-accessories", "vehicle"],
  };
  const [categoryQuery, setCategoryQuery] = useState('')
  // const userId = 'google-oauth2|102988815370920618477'


  useEffect(() => {
    const category = Array.isArray(productCategory) ? productCategory[0] : productCategory;
    if (typeof category === "string" && categoryMappings[category]) {
      setCategoryQuery(category); // Set categoryQuery dynamically
    }
  }, [productCategory,categoryMappings]);
  

  const selectedCategories = categoryMappings[categoryQuery] || [];


  const dataQuery = `*[_type == "product" && category in $params]{
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

  // const [loading, setLoading] = useState(false)
  // const [product, setProduct] = useState<any>(null)
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
      {selectedCategories?.length>0?
        <Products
        query={dataQuery}
        params={selectedCategories}
        view=''
      ></Products>
      :'no products found'}
    </section>
  )
}

export default CategoryPage
