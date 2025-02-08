'use client'
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
// import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios'
import { Group } from "@chakra-ui/react"
import {
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps"
import {  LuUser, LuWallet } from "react-icons/lu"
import Checkout from '../Checkout/Checkout';
import useCartStore from '../stores/useCartStore';
import useSyncCart from '../hooks/useSyncCart';
import { toast } from 'react-toastify';

const CartPage = () => {
  //const { user } = useUser();
  const { items } = useCartStore();
  const userId = 'google-oauth2|102988815370920618477';
  const [cartItem, setCartItem] = useState([]);
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false);
  useSyncCart(userId);

  async function updateQuantity(productId: string, delta: number) {
    if (loading) return;
    setLoading(true);
    try {
      // Find the current item in the cart
      const currentItem = cartItem.find((item: any) => item.product._id === productId);

      // Check if the new quantity would be less than 1
      if (currentItem && currentItem.quantity + delta < 1) {
        alert('Quantity cannot be less than 1');
        return;
      }

      // Call the API to update the quantity
      const response = await axios.post('/api/update-quantity', {
        userId,
        productId,
        delta,
      });

      if (response.status === 200) {
        // Update local state to reflect the new quantity
        setCartItem((prevItems: any) =>
          prevItems.map((item: any) =>
            item.product._id === productId
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
        );
        useCartStore.getState().updateQuantity(productId, delta);
      } else {
        toast.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  }

  const totalPrice = items.reduce((acc, product) => {
    return acc + (product.product?.price * product.quantity);
  }, 0);

  // const handleClick = () => {
  //   switch (step) {
  //     case 1:
  //       setStep(prev => prev + 1)
  //       console.log('case 1', step)
  //       break;
  //     case 2:
  //       setStep(prev => prev + 1)
  //       console.log('case 2', step)
  //       break;
  //     case 3:
  //       setStep(prev => prev + 1)
  //       console.log('case 3', step)
  //       break;
  //   }
  // }

  const handleCheckoutSuccess = () => {
    setStep(3); 
  };

  const clearCarts = async (userId: string) => {
    // Optimistically update local state
    useCartStore.getState().clearCart();

    try {
      const response = await axios.delete('/api/cart/clear', {
        data: { userId },
      });

      if (response.status === 200) {
        toast.success('Cart cleared successfully!');
      } else {
        const cart = await axios.get('/api/cart', { params: { userId } });
        useCartStore.getState().syncCart(cart.data.items);
        toast.error('Failed to clear cart');
      }
    } catch (error) {
      const cart = await axios.get('/api/cart', { params: { userId } });
      useCartStore.getState().syncCart(cart.data.items);
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };
  const removeFromCart = async (userId: string, productId: string) => {
    // Optimistically update local state
    useCartStore.getState().removeItem(productId);

    try {
      const response = await axios.delete('/api/cart', {
        data: { userId, productId },
      });

      if (response.status === 200) {
        toast.success('Product removed from cart!');
      } else {
        // Revert local state if API call fails
        const cart = await axios.get('/api/cart', { params: { userId } });
        useCartStore.getState().syncCart(cart.data.items);
        toast.error('Failed to remove product from cart');
      }
    } catch (error) {
      const cart = await axios.get('/api/cart', { params: { userId } });
      useCartStore.getState().syncCart(cart.data.items);
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove product from cart');
    }
  };
  function component() {
    if (step === 1) {
      return (
        < div className='w-full flex flex-col items-center justify-start gap-4' >
          <ul className='w-full h-[8vh] flex justify-between items-center border-b-2 border-secondaryCol'>
            <li className='montserrat-semibold w-[40%] flex items-center justify-center text-secondaryCol text-base'>Product Name</li>
            <li className='montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base'>Quantity</li>
            <li className='montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base'>Sub-Total</li>
            <li className='montserrat-semibold w-[10%] flex items-center justify-center text-secondaryCol text-base'>Cancel</li>
          </ul>
          <ul className='w-full h-[70vh] flex flex-col justify-start items-center overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
            {items?.length > 0 ? (
              items?.map((product: any) => (
                <li key={product.product?.id || product?.id} className='w-full min-h-[18vh] flex items-center justify-between border-b-2 border-[#f3f3f3]'>
                  <div className='flex items-center gap-2 w-[40%]'>
                    <div className='relative w-[80px] h-[80px]'>
                      <Image src={product?.product?.images?.asset?.url || product?.image} alt={product.product?.title || product?.title} layout='fill' className='absolute object-fill object-center'></Image>
                    </div>
                    <div className='flex flex-col items-start justify-center gap-4 h-[80px]'>
                      <h3 className='montserrat-bold text-primaryCol text-base'>{product.product?.title}</h3>
                      {/* <div className='flex items-center gap-2'>
                          <p className='montserrat-semibold text-secondaryCol text-sm'>Color: </p>
                          <span style={{backgroundColor:`${product.color}`}} className='w-[20px] h-[20px] rounded-[50%]'></span>
                          </div> */}
                    </div>
                  </div>
                  <div className='flex items-center justify-center w-[20%]'>
                    <button className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]' disabled={product.quantity <= 1 || loading} 
                      onClick={() => updateQuantity(product.product._id, -1)}>-</button>
                    <p className='p-[15px] rounded-[18px] text-black montserrat-semibold text-center'>{product?.quantity}</p>
                    <button className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]'
                      disabled={loading} // Disable if loading
                      onClick={() => updateQuantity(product.product._id, 1)}>+</button>
                  </div>
                  <div className='flex items-center justify-center w-[20%]'>
                    <h3 className='text-black montserrat-medium text-lg'>{parseFloat(product.product.price) * product.quantity}$</h3>
                  </div>
                  <div className='flex items-center justify-center w-[10%]'>
                    <button className='h-[30px] w-[30px] bg-red-500 rounded-[50%] text-white text-center' onClick={() => removeFromCart(userId, product.product?._id)}>X</button>
                  </div>
                </li>
              ))
            ) : (
              <p className='montserrat-bold text-primaryCol text-xl'>Your Cart Is Empty</p>
            )
            }
          </ul>
          <div className='h-[10vh] w-full flex items-center justify-between'>
            <div className="w-[70%] flex items-center justify-start">
              <h3 className="montserrat-bold text-2xl text-blueCol">
                Total: ${totalPrice.toFixed(2)}
              </h3>
            </div>
            <button onClick={() => clearCarts(userId)} className='montserrat-semibold text-blueCol text-lg' >Clear Cart</button>
          </div>
        </div >
      )
    }
    else if (step === 2) {
      return (<Checkout
        user={userId}
        order={items}
        onSuccess={handleCheckoutSuccess}>
      </Checkout>)
    }
  }

  return (
    <section className='w-full h-fit flex items-start justify-center gap-10 py-10'>
      <div className='w-[60%] h-full flex flex-col items-end'>
        <div className='w-full h-full flex items-center justify-center'>
          {component()}
        </div>
        {step===1?<button onClick={() => setStep(step + 1)} disabled={items.length<=0} className='flex items-center justify-center rounded-lg bg-blueCol px-8 py-2 text-md uppercase montserrat-medium text-white disabled:bg-blue-300'>Checkout</button>:<></>}
      </div>
      <div className='w-[20%] px-10'>
        <StepsRoot orientation='vertical' height={400} step={step} onStepChange={(e) => setStep(e.step)} count={3}>
          <StepsList>
            <StepsItem index={0} title="My Cart" icon={<LuUser />}/>
            <StepsItem index={1} title="Address Confirmation" icon={<LuUser />}/>
            <StepsItem index={2} title="Billing" icon={<LuWallet />}/>
          </StepsList>

          {/* <StepsCompletedContent>Your Order Has Been Placed!</StepsCompletedContent> */}

          <Group>
            {/* <StepsPrevTrigger asChild>
              <Button variant="outline" size="sm" className='flex items-center justify-center rounded-lg bg-blueCol px-8 py-2 text-lg uppercase montserrat-semibold text-white hover:bg-blueHov'>
                Prev
              </Button>
            </StepsPrevTrigger>
            <StepsNextTrigger asChild>
              <Button variant="outline" size="sm" disabled={step === 1 && items.length === 0}>
                Next
              </Button>
            </StepsNextTrigger> */}
          </Group>
        </StepsRoot>
      </div>
    </section>

  )
}

export default CartPage
