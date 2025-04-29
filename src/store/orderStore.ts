import { create } from "zustand";
import { OrderT, itemT } from "../types";

type OrderState = {
  currentOrder: OrderT | null;
  orders: OrderT[];
  total: string;
  removeProductFromOrder: (productId: itemT["id"]) => void;
  additemToOrder: (product: itemT) => void;
  setCurrentOrder: (order: OrderT | null) => void;
  setTotal: (total: string) => void;
  reloadTable: () => void;
  setReloadTable: (fn: () => void) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  currentOrder: null,
  orders: [],
  total: "",
  reloadTable: () => {},
  setReloadTable: (fn) => set({ reloadTable: fn }),

  setCurrentOrder: (order: OrderT | null) => set({ currentOrder: order }),

  setTotal: (total: string) => set({ total }),

  additemToOrder: (product: itemT) =>
    set((state) => {
      if (!state.currentOrder?.order_items) {
        return {
          currentOrder: {
            id: 0,
            client_name: "",
            order_date: "",
            payment_method: "",
            discount: "",
            total: "",
            observations: "",
            order_items: [{ ...product }],
          },
        };
      }

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
