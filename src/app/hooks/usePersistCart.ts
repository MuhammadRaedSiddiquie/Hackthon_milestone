import { useEffect } from 'react';
import useCartStore from '../stores/useCartStore';

const usePersistCart = () => {
  const items = useCartStore((state) => state.items);
  const syncCart = useCartStore((state) => state.syncCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      syncCart(JSON.parse(savedCart));
    }
  }, [syncCart]);

  // Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
};

export default usePersistCart;