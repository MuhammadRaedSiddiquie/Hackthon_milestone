'use client'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { client } from '@/sanity/lib/client'
import product from '@/sanity/schemaTypes/product';


interface Image {
    _key: string; // Unique identifier for the image
    asset: {
        url: string; // URL of the image from Sanity
    };
}
interface Product {
    id: string; // ID of the product
    title: string; // Title of the product
    description: string; // Description of the product
    images: Image[]; // Array of images
    category: string; // Product category
    price: number; // Price of the product
    discountPercentage: number; // Discount percentage
    rating: number; // Rating of the product
    tags: string[]; // Array of tags
    stock: number; // Number of items in stock
    brand: string; // Brand of the product
    availabilityStatus: 'available' | 'out-of-stock'; // Availability status
}


function Products({
    query,
    params = {},
    view,
  }: {
    query: string;
    params?: Record<string, any>;
    view:string;
  }) {
    const [data, setData] = useState < Product[] > ([]);
    const [style,setStyle]= useState('')
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.fetch < Product[] > (query,{params});
                setData(response);
              

            } catch (error) {
                console.error("Error fetching data:", error);
                console.log('error in data fetched successfully')
            }
        };

        fetchData();
        console.log('fetched data products:',data)

    }, [query,params]); // Empty dependency array ensures it runs only once
useEffect(()=>{
if(view==='inline'){
    setStyle(view)
    console.log('view change to inline')
}
console.log(view)
},[view])






    return (
        <section className='w-full flex items-center justify-center'>
            <div className='w-[73%] flex gap-[80px] py-[80px] items-center flex-col'>
                <div className='w-full flex flex-col items-center gap-[10px] max-md:text-center'>
                    <p className='montserrat-regular text-secondaryCol text-[20px] xxl:text-2xl'>Featured Products</p>
                    <h1 className='montserrat-bold text-primaryCol text-[24px] xxl:text-4xl'>BEST SELLER PRODUCTS</h1>
                    <p className='montserrat-regular text-secondaryCol text-sm xxl:text-xl'>Problems trying to resolve the conflict between </p>
                </div>
                <div className='w-full grid xx:grid-cols-4 gap-x-[30px] place-items-center grid-flow-row max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                    {data?.map((product) => (
                        <Card
                            id={product.id}
                            image={product.images?.[0]?.asset?.url||product.image}
                            title={product.title}
                            info={product.description}
                            price={product.price}
                            discount={product.discountPercentage}
                            rating={product.rating}
                            display={style==='inline'?'inline':''}
                        ></Card>
                    ))}



                </div>

            </div>

        </section>
    )
}

export default Products
