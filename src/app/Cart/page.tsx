'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Group } from '@chakra-ui/react';
import { StepsItem, StepsList, StepsRoot } from '@/components/ui/steps';
import { LuUser, LuWallet } from 'react-icons/lu';
import useCartStore from '../stores/useCartStore';
import useSyncCart from '../hooks/useSyncCart';
import { toast } from 'react-toastify';
import useAuthStore from '../stores/useAuthStore';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Checkout = dynamic(() => import('../Checkout/Checkout'), { ssr: false });

const CartPage = () => {
  const { items } = useCartStore();
  const { user } = useAuthStore();
  const userId = user?.sub;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  useSyncCart(userId);

  const updateQuantity = async (productId: string, delta: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const currentItem = items.find((item: any) => item.product._id === productId);
      if (currentItem && currentItem.quantity + delta < 1) {
        alert('Quantity cannot be less than 1');
        return;
      }

      const response = await axios.post('/api/update-quantity', {
        userId,
        productId,
        delta,
      });

      if (response.status === 200) {
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
  };

  const totalPrice = items.reduce((acc, product) => acc + product.product?.price * product.quantity, 0);

  const handleCheckoutSuccess = () => {
    setStep(3);
  };

  const clearCarts = async (userId: string) => {
    useCartStore.getState().clearCart();
    try {
      const response = await axios.delete('/api/cart/clear', { data: { userId } });
      if (response.status === 200) {
        toast.success('Cart cleared successfully!');
      } else {
        const cart = await axios.get('/api/cart', { params: { userId } });
        useCartStore.getState().syncCart(cart.data.items);
        toast.error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const removeFromCart = async (userId: string, productId: string) => {
    useCartStore.getState().removeItem(productId);
    try {
      const response = await axios.delete('/api/cart', { data: { userId, productId } });
      if (response.status === 200) {
        toast.success('Product removed from cart!');
      } else {
        toast.error('Failed to remove product from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove product from cart');
    }
  };

  const component = () => {
    if (step === 1) {
      return (
        <div className="w-full flex flex-col items-center justify-start gap-4">
          <ul className="w-full h-[8vh] flex justify-between items-center border-b-2 border-secondaryCol">
            <li className="montserrat-semibold w-[40%] flex items-center justify-center text-secondaryCol text-base">
              Product Name
            </li>
            <li className="montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base">
              Quantity
            </li>
            <li className="montserrat-semibold w-[20%] flex items-center justify-center text-secondaryCol text-base">
              Sub-Total
            </li>
            <li className="montserrat-semibold w-[10%] flex items-center justify-center text-secondaryCol text-base">
              Cancel
            </li>
          </ul>
          <ul className="w-full h-[70vh] flex flex-col justify-start items-center overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {items?.length > 0 ? (
              items?.map((product: any) => (
                <li
                  key={product.product?.id || product?.id}
                  className="w-full min-h-[18vh] flex items-center justify-between border-b-2 border-[#f3f3f3]"
                >
                  <div className="flex items-center gap-2 w-[40%]">
                    <div className="relative w-[80px] h-[80px]">
                      <Image
                        src={product?.product?.images[0]?.asset?.url || product?.image}
                        alt={product.product?.title || product?.title}
                        width={80}
                        height={80}
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-4 h-[80px]">
                      <h3 className="montserrat-bold text-primaryCol text-base">{product.product?.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-[20%]">
                    <button
                      className="px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]"
                      disabled={product.quantity <= 1 || loading}
                      onClick={() => updateQuantity(product.product._id, -1)}
                    >
                      -
                    </button>
                    <p className="p-[15px] rounded-[18px] text-black montserrat-semibold text-center">
                      {product?.quantity}
                    </p>
                    <button
                      className="px-[15px] py-[12px] rounded-[12px] text-black bg-[#f3f3f3]"
                      disabled={loading}
                      onClick={() => updateQuantity(product.product._id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-center w-[20%]">
                    <h3 className="text-black montserrat-medium text-lg">
                      ${(parseFloat(product.product.price) * product.quantity).toFixed(2)}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center w-[10%]">
                    <button
                      className="h-[30px] w-[30px] bg-red-500 rounded-[50%] text-white text-center"
                      onClick={() => removeFromCart(userId, product.product?._id)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="montserrat-bold text-primaryCol text-xl">Your Cart Is Empty</p>
            )}
          </ul>
          <div className="h-[10vh] w-full flex items-center justify-between">
            <div className="w-[70%] flex items-center justify-start">
              <h3 className="montserrat-bold text-2xl text-blueCol">Total: ${totalPrice.toFixed(2)}</h3>
            </div>
            <button onClick={() => clearCarts(userId)} className="montserrat-semibold text-blueCol text-lg">
              Clear Cart
            </button>
          </div>
        </div>
      );
    } else if (step === 2) {
      return <Checkout user={userId} order={items} onSuccess={handleCheckoutSuccess} />;
    }
  };

  return (
    <>
      <Head>
        <title>Cart - My Store</title>
        <meta name="description" content="View and manage your shopping cart at My Store." />
      </Head>
      <section className="w-full h-fit flex items-start justify-center gap-10 py-10">
        <div className="w-[60%] h-full flex flex-col items-end">
          <div className="w-full h-full flex items-center justify-center">{component()}</div>
          {step === 1 && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={items.length <= 0}
              className="flex items-center justify-center rounded-lg bg-blueCol px-8 py-2 text-md uppercase montserrat-medium text-white disabled:bg-blue-300"
            >
              Checkout
            </button>
          )}
        </div>
        <div className="w-[20%] px-10">
          <StepsRoot orientation="vertical" height={400} step={step} onStepChange={(e) => setStep(e.step)} count={3}>
            <StepsList>
              <StepsItem index={0} title="My Cart" icon={<LuUser />} />
              <StepsItem index={1} title="Address Confirmation" icon={<LuUser />} />
              <StepsItem index={2} title="Billing" icon={<LuWallet />} />
            </StepsList>
          </StepsRoot>
        </div>
      </section>
    </>
  );
};

export default CartPage;