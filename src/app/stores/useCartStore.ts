import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  _key: string;
  product: {
    _id: string;
    title: string;
    price: number;
    images: { asset: { url: string } }[];
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  syncCart: (items:CartItem[]) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product._id === item.product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.product._id === item.product._id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        })),
      updateQuantity: (productId, delta) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === productId
              ? { ...i, quantity: i.quantity + delta }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      syncCart: (items) => set({ items }),
    }),
    {
      name: 'cart-storage', // Unique name for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useCartStore;