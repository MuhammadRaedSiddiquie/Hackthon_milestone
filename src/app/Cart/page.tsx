'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { client } from '@/sanity/lib/client';
import axios from 'axios'
import { Button, Group } from "@chakra-ui/react"
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "@/components/ui/steps"
import { LuCalendar, LuUser, LuWallet } from "react-icons/lu"
import Checkout from '../Checkout/Checkout';




const CartPage = () => {
  //const { user } = useUser();
  const userId = 'google-oauth2|102988815370920618477';
  const [cartItem, setCartItem] = useState([]);
  const [step, setStep] = useState(1)


  useEffect(() => {
    const query = `*[_type == "cart" && userId == $userId][0] {
  items[] {
    _key, // Include the unique key of each item
    quantity,
    price,
    product-> {
      id,
      _id,
      title,
      images[0]{
      asset->{url}
  }
      }
  }
}
    `
    const fetchData = async () => {
      const cartStored = await client.fetch(query, { userId })
      setCartItem(cartStored.items)
      
    }
    fetchData();

  }, [userId])

  async function removeFromCart(userId, product) {
    const _id = product;
    try {
      const response = await axios.delete('/api/remove-cart', {
        data: { userId, productId: _id }
      });

      if (response.status == 200) {
        alert('Product removed to cart successfully!');
      } else {
        alert('failed to remove')
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  }
  async function clearCart(userId, product) {
    try {
      const response = await axios.delete('/api/clear-cart', {
        data: { userId, product }
      });

      if (response.status == 200) {
        alert('Cart cleared successfully!');
      } else {
        alert('failed to remove')
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  }
  async function updateQuantity(productId, number) {
    try {
      
      console.log(userId, productId, number ,'2 console') 
      const response = await axios.post('/api/update-cart', {
        userId,
        productId,
        number,
      });
      
      if (response.status === 200) {
        console.log(response.data.updatedItems,"updated cart ites")
        setCartItem(response.data.updatedItems);
      } else {
        alert('Failed to update quantity.');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity.');
    }
  }

  
  useEffect(() => {
    console.log(step, 'stepsss')
  }, [step])
  function component() {
    if (step === 1) {
      return (
        < div className='w-full h-fit flex flex-col items-center justify-start gap-8' >
          <ul className='w-full h-[8vh] flex justify-between items-center border-b-2 border-secondaryCol'>
            <li className='montserrat-semibold w-[40%] flex items-center justify-center text-secondaryCol text-base'>Product Name</li>
            <li className='montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base'>Quantity</li>
            <li className='montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base'>Sub-Total</li>
            <li className='montserrat-semibold w-[10%] flex items-center justify-center text-secondaryCol text-base'>Cancel</li>

          </ul>
          <ul className='w-full flex flex-col justify-start items-center'>
            {cartItem.length > 0 ? (
              cartItem.map((product:any) => (
                <li key={product.product.id} className='w-full h-[18vh] flex items-center justify-between border-b-2 border-[#f3f3f3]'>
                  <div className='flex items-center gap-2 w-[40%]'>
                    <div className='relative w-[80px] h-[80px]'>
                      <Image src={product.product.images?.asset?.url} alt={product.product.title} layout='fill' className='absolute object-fill object-center'></Image>
                    </div>
                    <div className='flex flex-col items-start justify-center gap-4 h-[80px]'>
                      <h3 className='montserrat-bold text-primaryCol text-base'>{product.product.title}</h3>
                      {/* <div className='flex items-center gap-2'>
                          <p className='montserrat-semibold text-secondaryCol text-sm'>Color: </p>
                          <span style={{backgroundColor:`${product.color}`}} className='w-[20px] h-[20px] rounded-[50%]'></span>
                          </div> */}
                    </div>
                  </div>
                  <div className='flex items-center justify-center w-[20%]'>
                    <button className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]' disabled={product.product.quantity <= 1} onClick={() => { updateQuantity(product.product._id, -1) }}>-</button>
                    <p className='p-[15px] rounded-[18px] text-black montserrat-semibold text-center'>{product.quantity}</p>
                    <button className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]' onClick={() => { updateQuantity(product.product._id, 1) }}>+</button>
                  </div>
                  <div className='flex items-center justify-center w-[20%]'>
                    <h3 className='text-black montserrat-medium text-lg'>{parseFloat(product.price) * product.quantity}$</h3>
                  </div>
                  <div className='flex items-center justify-center w-[10%]'>
                    <button className='h-[30px] w-[30px] bg-red-500 rounded-[50%] text-white text-center' onClick={() => removeFromCart(userId, product.product._id)}>X</button>
                  </div>
                </li>
              ))
            ) : (
              <p className='montserrat-bold text-primaryCol text-xl'>Your Cart Is Empty</p>
            )
            }
          </ul>
          <div className='h-[20px] w-full flex items-center justify-end'>
            <button onClick={() => clearCart(userId, cartItem)} className='montserrat-bold text-blueCol text-base' >Clear Cart</button>
          </div>
        </div >
      )
    }
    else if (step === 2) {
      return (<Checkout
        user={userId}
        order={cartItem}></Checkout>)
    }
    else {
      return <h1>Billing form</h1>
    }


  }

  return (
    <section className='w-full flex items-start justify-center gap-10 py-10'>
      <div className='w-[60%]'>{component()}</div>
      <div className='w-[20%] px-10'>
        <StepsRoot orientation='vertical' height={400} step={step} onStepChange={(e) => setStep(e.step)} count={3}>
          <StepsList>
            <StepsItem index={0} title="Cart" />
            <StepsItem index={1} title="Checkout" />
            <StepsItem index={2} title="Billing" />
          </StepsList>

          <StepsCompletedContent>Your Order Has Been Placed!</StepsCompletedContent>

          <Group>
            <StepsPrevTrigger asChild>
              <Button variant="outline" size="sm">
                Prev
              </Button>
            </StepsPrevTrigger>
            <StepsNextTrigger asChild>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </StepsNextTrigger>
          </Group>
        </StepsRoot>
      </div>
    </section>
  )
}

export default CartPage
