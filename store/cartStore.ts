import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: string | null;
  couponDiscount: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupon: null,
      couponDiscount: 0,

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
        );

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += newItem.quantity;
          set({ items: updated, isOpen: true });
        } else {
          set({ items: [...currentItems, newItem], isOpen: true });
        }
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        });
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        set({
          items: get().items.map((item) => {
            if (item.productId === productId && item.variantId === variantId) {
              return { ...item, quantity };
            }
            return item;
          }),
        });
      },

      clearCart: () => set({ items: [], appliedCoupon: null, couponDiscount: 0 }),
      setIsOpen: (isOpen) => set({ isOpen }),
      applyCoupon: (code, discount) => set({ appliedCoupon: code, couponDiscount: discount }),
      removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0 }),
    }),
    {
      name: "ayvo_cart_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
