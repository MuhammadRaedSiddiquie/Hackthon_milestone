// src/hooks/useSyncCart.ts
import { useEffect } from 'react';
import useCartStore from '../stores/useCartStore';
import axios from 'axios';

const useSyncCart = (userId: string) => {
  const syncCart = useCartStore((state) => state.syncCart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart', { params: { userId } });
        if (response.status === 200) {
          // Ensure the response data is an array
         
          const items = Array.isArray(response.data) ? response.data : [];
          syncCart(items);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId, syncCart]);
};

export default useSyncCart;