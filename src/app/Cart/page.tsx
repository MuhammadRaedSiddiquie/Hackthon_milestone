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
import useCartStore from '../stores/useCartStore';
import useSyncCart from '../hooks/useSyncCart';




const CartPage = () => {
  //const { user } = useUser();
  const { items } = useCartStore();
  const userId = 'google-oauth2|102988815370920618477';
  const [cartItem, setCartItem] = useState([]);
  const [step, setStep] = useState(1)
  useSyncCart(userId);


  // const fetchData = async () => {
  //   try {
  //     const query = `*[_type == "cart" && userId == $userId][0] {
  //       items[] {
  //         _key,
  //         quantity,
  //         price,
  //         product-> {
  //           id,
  //           _id,
  //           title,
  //           images[0]{ asset->{url} }
  //         }
  //       }
  //     }`;

  //     const cartStored = await client.fetch(query, { userId });
  //     console.log(cartStored, 'items')

  //     if (cartStored?.items) {
  //       setCartItem([...cartStored.items]); // ✅ Ensure state updates
  //     } else {
  //       setCartItem([]); // Empty cart if no items
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart data:", error);
  //   }

  // }
  // useEffect(() => {
  //   fetchData();

  // }, [userId])


  // async function removeFromCart(userId, product) {
  //   const _id = product;
  //   try {
  //     const response = await axios.delete('/api/remove-cart', {
  //       data: { userId, productId: _id }
  //     });

  //     if (response.status == 200) {
  //       setCartItem((prevItems) =>
  //         prevItems.filter((item) => item.product._id !== _id)
  //       );
  //     } else {
  //       alert('failed to remove')
  //     }
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //     alert('Failed to add product to cart.');
  //   }
  // }


  // async function clearCart(userId, product) {
  //   try {
  //     const response = await axios.delete('/api/clear-cart', {
  //       data: { userId, product }
  //     });

  //     if (response.status == 200) {
  //       await fetchData();
  //       alert('Cart cleared successfully!');
  //       setCartItem([]);
  //     } else {
  //       alert('failed to remove')
  //     }
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //     alert('Failed to add product to cart.');
  //   }
  // }
  const [loading, setLoading] = useState(false);

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
        alert('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  }


  // async function updateQuantity(productId, delta) {
  //   try {

  //     console.log(userId, productId, delta, '2 console')
  //     const response = await axios.post('/api/update-cart', {
  //       userId,
  //       productId,
  //       delta,
  //     });

  //     if (response.status === 200) {
  //       console.log(response.data.updatedItems, "updated cart ites")
  //       const updatedCart = response.data.updatedItems;


  //       setCartItem((prevCart:any) =>
  //         prevCart.map((item:any) =>
  //           item.product._id === productId
  //             ? { ...item, quantity: item.quantity + delta }
  //             : item
  //         )
  //       );

  //     } else {
  //       alert('Failed to update quantity.');
  //     }
  //   } catch (error) {
  //     console.error('Error updating quantity:', error);
  //     alert('Failed to update quantity.');
  //   }
  // }

  useEffect(() => {
    console.log(items[0]?.product, 'itemssss')
  }, [items])
  useEffect(() => {
    console.log(step, 'stepsss')
  }, [step])

  const clearCarts = async (userId: string) => {
    // Optimistically update local state
    useCartStore.getState().clearCart();

    try {
      const response = await axios.delete('/api/cart/clear', {
        data: { userId },
      });

      if (response.status === 200) {
        alert('Cart cleared successfully!');
      } else {
        // Revert local state if API call fails
        const cart = await axios.get('/api/cart', { params: { userId } });
        useCartStore.getState().syncCart(cart.data.items);
        alert('Failed to clear cart');
      }
    } catch (error) {
      const cart = await axios.get('/api/cart', { params: { userId } });
      useCartStore.getState().syncCart(cart.data.items);
      console.error('Error clearing cart:', error);
      alert('Failed to clear cart');
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
        alert('Product removed from cart!');
      } else {
        // Revert local state if API call fails
        const cart = await axios.get('/api/cart', { params: { userId } });
        useCartStore.getState().syncCart(cart.data.items);
        alert('Failed to remove product from cart');
      }
    } catch (error) {
      const cart = await axios.get('/api/cart', { params: { userId } });
      useCartStore.getState().syncCart(cart.data.items);
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart');
    }
  };
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
            {items?.length > 0 ? (
              items?.map((product: any) => (
                <li key={product.product?.id||product?.id} className='w-full h-[18vh] flex items-center justify-between border-b-2 border-[#f3f3f3]'>
                  <div className='flex items-center gap-2 w-[40%]'>
                    <div className='relative w-[80px] h-[80px]'>
                      <Image src={product?.product?.images?.asset?.url||product?.image} alt={product.product?.title||product?.title} layout='fill' className='absolute object-fill object-center'></Image>
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
                    <button
                      className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]'
                      disabled={product.quantity <= 1 || loading} // Disable if quantity is 1 or loading
                      onClick={() => updateQuantity(product.product._id, -1)}
                    >
                      -
                    </button>
                    <p className='p-[15px] rounded-[18px] text-black montserrat-semibold text-center'>{product?.quantity}</p>
                    <button
                      className='px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]'
                      disabled={loading} // Disable if loading
                      onClick={() => updateQuantity(product.product._id, 1)}
                    >
                      +
                    </button>
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
          <div className='h-[20px] w-full flex items-center justify-end'>
            <button onClick={() => clearCarts(userId)} className='montserrat-bold text-blueCol text-base' >Clear Cart</button>
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
              <Button variant="outline" size="sm" disabled={step === 1 && items.length === 0}>
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
