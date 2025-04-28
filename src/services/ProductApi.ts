import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ProductSchemaArray } from "../types";

export async function getAllProducts() {
  try {
    const { data } = await api("/products");
    const response = ProductSchemaArray.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const responseError =
        error.response.data.errors || error.response.data.error;
      throw responseError;
    }
  }
}
