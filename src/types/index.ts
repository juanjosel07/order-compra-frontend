import { z } from "zod";

// export type itemT = {
//   id: number;
//   product_name: string;
//   quantity: number;
//   iva: number;
//   unit_price: number;
// };

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  unit_price: z.string(),
  iva: z.string(),
});

export const ProductSchemaArray = z.array(ProductSchema);

export type ProductT = z.infer<typeof ProductSchema>;

export const itemSchema = z.object({
  id: z.number().optional(),
  product_name: z.string(),
  order_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  unit_price: z.string(),
  iva: z.string(),
  subtotal: z.string(),
  total: z.string(),
});

export type itemT = z.infer<typeof itemSchema>;

export const OrderSchema = z.object({
  id: z.number(),
  client_name: z.string(),
  order_date: z.string(),
  payment_method: z.string(),
  discount: z.string(),
  total: z.string(),
  observations: z.string().nullable(),
  order_items: z.array(itemSchema),
});

export const OrderFormData = z.object({
  client_name: z.string(),
  order_date: z.string(),
  payment_method: z.string(),
  discount: z.string(),
  total: z.string(),
  observations: z.string().nullable(),
  orderItems: z.array(
    z.object({
      id: z.number().optional(),
      product_id: z.number(),
      quantity: z.number(),
      unit_price: z.string(),
      iva: z.string(),
      subtotal: z.string(),
      total: z.string(),
    })
  ),
});

export type OrderT = z.infer<typeof OrderSchema>;

export type OrderFormSendDataT = z.infer<typeof OrderFormData>;

export type OrderFormDataT = {
  products: any[];
  billingDate: string;
  paymentMethod: string;
  clientName: string | undefined;
};
