import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router.tsx";
import jszip from "jszip";
import jquery from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons-dt";
import DataTable from "datatables.net-dt";
import Swal from "sweetalert2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "datatables.net-buttons/js/buttons.html5.mjs";
declare global {
  interface Window {
    JSZip: any;
    $: any;
    Swal: any;
  }
}

window.JSZip = jszip;
window.$ = jquery;
window.Swal = Swal;

DataTable.Buttons.jszip(jszip);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>
);
