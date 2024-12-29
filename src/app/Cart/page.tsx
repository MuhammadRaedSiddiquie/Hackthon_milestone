'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image';

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

const CartPage = () => {
  const [cartItem, setCartItem] = useState < ProductProps[] > ([]);
  useEffect(() => {
    const cartStored: ProductProps[] = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItem(cartStored);
 
  }, [])

  const clearCart=()=>{
    localStorage.setItem('cart', JSON.stringify([]));
    const cartStored: ProductProps[] = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItem(cartStored);
    // alert('Product removed from cart!');
  }
  const removeCartItem = (productId: string) => {
    const cartStored: ProductProps[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const updateCart = cartStored.filter(item => item.id !== productId)
    localStorage.setItem('cart', JSON.stringify(updateCart))
    setCartItem(updateCart);
    // alert('Product removed from cart!');

  }
  const updateQuantity = (id:string,num:number) => {
    const updateCart =cartItem.map((product)=>{
      if(product.id===id){
        const newQuantity=product.quantity+num;
        return {...product,quantity:newQuantity>0?newQuantity:0}
      }
      return product
    })
    localStorage.setItem('cart', JSON.stringify(updateCart))
    setCartItem(updateCart);
  
  }


  return (
    <section className='w-full h-screen flex items-start justify-center'>
      {
        <div className='w-[80%] h-fit flex flex-col items-center justify-start gap-8'>
          <ul className='w-full h-[8vh] flex justify-between items-center border-b-2 border-secondaryCol'>
            <li className='montserrat-semibold w-[40%] flex items-center justify-center text-secondaryCol text-base'>Product Name</li>
            <li className='montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base'>Quantity</li>
            <li className='montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base'>Sub-Total</li>
            <li className='montserrat-semibold w-[10%] flex items-center justify-center text-secondaryCol text-base'>Cancel</li>
            
          </ul>
          <ul className='w-full flex flex-col justify-start items-center'>
            {cartItem.length > 0 ? (
              cartItem.map((product) => (
                <li key={product.id} className='w-full h-[18vh] flex items-center justify-between border-b-2 border-[#f3f3f3]'>
                  <div className='flex items-center gap-2 w-[40%]'>
                    <div className='relative w-[80px] h-[80px]'>
                      <Image src={product.image} alt={product.title} layout='fill' className='absolute object-fill object-center'></Image>
                    </div>
                    <div className='flex flex-col items-start justify-start gap-4 h-[80px]'>
                      <h3 className='montserrat-bold text-primaryCol text-base'>{product.title}</h3>
                      <div className='flex items-center gap-2'>
                        <p className='montserrat-semibold text-secondaryCol text-sm'>Color: </p>
                        <span style={{backgroundColor:`${product.color}`}} className='w-[20px] h-[20px] rounded-[50%]'></span>
                        </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-center w-[20%]'>
                    <button className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]' disabled={product.quantity<=1} onClick={()=>{updateQuantity(product.id,-1)}}>-</button>
                    <p className='p-[15px] rounded-[18px] text-black montserrat-semibold text-center'>{product.quantity}</p>
                    <button className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]' onClick={()=>{updateQuantity(product.id,1)}}>+</button>
                  </div>
                  <div className='flex items-center justify-center w-[20%]'>
                    <h3 className='text-black montserrat-semibold text-lg'>{parseInt(product.price)*product.quantity}</h3>
                  </div>
                  <div className='flex items-center justify-center w-[10%]'>
                  <button className='h-[30px] w-[30px] bg-red-500 rounded-[50%] text-white text-center' onClick={() => removeCartItem(product.id)}>X</button>
                  </div>
                </li>
              ))
            ) : (
              <p className='montserrat-bold text-primaryCol text-xl'>Your Cart Is Empty</p>
            )
            }
          </ul>
          <div className='h-[20px] w-full flex items-center justify-end'>
            <button className='montserrat-bold text-blueCol text-base' onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      }
    </section>
  )
}

export default CartPage
