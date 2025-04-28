import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout";
import NewOrderView from "@/views/NewOrderView";
import OrderListView from "@/views/OrderListView";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<OrderListView />}></Route>
          <Route path="/orders/new" element={<NewOrderView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
