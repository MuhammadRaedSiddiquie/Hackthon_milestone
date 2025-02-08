import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  discountPercentage: number;
  rating: number;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  syncWishlist: (items: WishlistItem[]) => void;
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return state; // Item already exists, do nothing
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        })),
      syncWishlist: (items) => set({ items }),
    }),
    {
      name: 'wishlist-storage', // Unique name for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useWishlistStore;