import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/Layout";
import NewOrderView from "@/views/NewOrderView";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/orders/new" element={<NewOrderView />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
