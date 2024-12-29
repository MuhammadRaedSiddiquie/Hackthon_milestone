'use client'
import React from 'react'
import { useState ,useEffect} from 'react';
import Card from '../components/Card/Card';



interface ProductProps {
    id: string;
    title: string;
    price: string;
    image: string;
    info:string;
    discount:string;
    color:string;
    isLiked:boolean;
    quantity: number;
  }
const LikePage = () => {

    const [cartItem,setCartItem]=useState([])

    useEffect(()=>{
        const cartStored = JSON.parse(localStorage.getItem('cart') || '[]')
        const updateCart=cartStored.filter((item:ProductProps)=>(item.isLiked)) 
        setCartItem(updateCart);
    },[])
    
    return (
    <section className='w-full h-fit flex items-start justify-center'>
        <div className='w-[73%] flex gap-[80px] py-[80px] items-center flex-col'>
                <div className='w-full flex flex-col items-center gap-[10px] max-md:text-center'>
                    <p className='montserrat-regular text-secondaryCol text-[20px] xxl:text-2xl'>Find Your Favourite Products Here</p>
                    <h1 className='montserrat-bold text-primaryCol text-[24px] xxl:text-4xl'>WHISLIST</h1>
                </div>
                <div className='w-full grid xx:grid-cols-4 gap-x-[30px] place-items-center grid-flow-row max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                   {
                    cartItem.map((item:ProductProps)=>(
                        <Card key={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        info={item.info}
                        discount={item.discount}
                        >
                        </Card>
                    ))
                   }
                </div>

            </div>
    </section>
  )
}

export default LikePage
