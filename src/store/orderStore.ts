import { create } from "zustand";
import { OrderT, itemT } from "../types";

type OrderState = {
  currentOrder: OrderT | null;
  orders: OrderT[];
  order: OrderT | null;
  removeProductFromOrder: (productId: itemT["id"]) => void;
  additemToOrder: (product: itemT) => void;
  setCurrentOrder: (order: OrderT) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  order: null,
  currentOrder: null,
  orders: [],

  setCurrentOrder: (order: OrderT) => set({ currentOrder: order }),

  additemToOrder: (product: itemT) =>
    set((state) => {
      if (!state.currentOrder) return state;

      return {
        currentOrder: {
          ...state.currentOrder,
          order_items: [...state.currentOrder.order_items, { ...product }],
        },
      };
    }),

  removeProductFromOrder: (productId: itemT["id"]) =>
    set((state) => {
      if (!state.currentOrder) return state;

      console.log(state, "holi");
      return {
        currentOrder: {
          ...state.currentOrder,
          order_items: state.currentOrder.order_items.filter(
            (item) => item.product_id !== productId
          ),
        },
      };
    }),
}));
