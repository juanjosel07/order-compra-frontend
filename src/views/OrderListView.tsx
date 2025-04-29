import { use, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import $ from "jquery";
import { deleteOrder } from "@/services/OrderApi";
import { toast } from "react-toastify";
import type { Api } from "datatables.net";
import { Link, useNavigate } from "react-router-dom";
import EditOrderData from "@/components/EditOrderData";
import { useOrderStore } from "@/store/orderStore";
import { formatNumber } from "../helpers";

export default function OrderListView() {
  const setReloadTable = useOrderStore((state) => state.setReloadTable);

  const tableRef = useRef<HTMLTableElement>(null);
  const tableInstanceRef = useRef<Api | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setReloadTable(() => {
      if (tableInstanceRef.current) {
        tableInstanceRef.current.ajax.reload();
      }
    });
  }, []);

  useEffect(() => {
    mountedDataTable();

    return () => {
      if (tableInstanceRef.current) {
        tableInstanceRef.current.destroy();
      }
    };
  }, []);

  const { mutate } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data) => {
      tableInstanceRef.current.ajax.reload();
      if (data) toast.success(data.message);
    },

    onError: (error) => {
      if (typeof error === "object") {
        Object.values(error).forEach((errorMessages) => {
          errorMessages.forEach((message: string) => {
            toast.error(message);
          });
        });
      } else {
        toast.error(error);
      }
    },
  });

  const handleAction = (e: React.MouseEvent<HTMLTableSectionElement>) => {
    const button = (e.target as HTMLElement).closest("button");
    const OrderId = button?.getAttribute("data-id") as string;
    if (button?.getAttribute("role") === "edit") {
      navigate(location.pathname + `?editOrder=${OrderId}`);
    } else {
      mutate(+OrderId);
    }
  };

  const mountedDataTable = () => {
    if (!tableRef.current) {
      console.error("tableRef is null");
      return;
    }
    const table = $(tableRef.current).DataTable({
      destroy: true,
      dom: '<"flex justify-between items-center mb-4"Bf>rt<"flex justify-between items-center mt-4"pi>',
      processing: true,
      serverSide: true,
      scrollX: true,
      order: [[3, "desc"]],
      autoWidth: true,
      language: {
        search: "",
        searchPlaceholder: "🔍 Buscar ...",
      },
      buttons: [
        {
          extend: "csv",
          text: "CSV",
          className:
            "bg-transparent cursor-pointer hover:bg-blue-500 text-blue-900 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded",
        },
        {
          extend: "excel",
          text: "Excel",
          className:
            "bg-transparent cursor-pointer hover:bg-green-500 text-green-900 hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded",
        },
      ],
      ajax: "http://localhost:8000/api/orders",
      columns: [
        { data: "id", name: "ID", orderable: true, searchable: true },
        {
          data: "client_name",
          name: "client_name",
          orderable: true,
          searchable: true,
        },
        {
          data: "payment_method",
          name: "payment_method",
          orderable: true,
          searchable: true,
        },
        {
          data: "order_date",
          name: "order_date",
          orderable: true,
          searchable: true,
        },
        {
          data: "discount",
          name: "discount",
          orderable: true,
          searchable: true,
        },
        {
          data: "observations",
          name: "observations",
          orderable: true,
          searchable: true,
        },
        {
          name: "total",
          orderable: true,
          searchable: true,
          render: (data, type, row, meta) => {
            return `$ ${formatNumber(row.total)}`;
          },
        },
        {
          name: "actions",
          orderable: false,
          searchable: false,
          render: (data, type, row, meta) => {
            return `
              <div class="flex justify-center gap-2">
                <button 
                  onclick="event.preventDefault()" 
                  data-id="${row.id}" 
                  role="edit"
                  class=" font-bold py-1 cursor-pointer  px-2 rounded text-sm transform transition duration-300 ease-in-out hover:scale-130 "
                >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </button>
                <button 
                  onclick="event.preventDefault()" 
                  data-id="${row.id}" 
                  role="delete"
                  class="text-red-500  cursor-pointer font-bold py-1 px-2 rounded text-sm transform transition duration-300 ease-in-out hover:scale-130 "
                >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </button>
              </div>
            `;
          },
        },
      ],
    });
    tableInstanceRef.current = table;
  };

  return (
    <>
      <div className="p-4 overflow-x-auto flex flex-col gap-10">
        <nav className="self-end ">
          <Link
            to="/orders/new"
            className="font-bold cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Crear ODC
          </Link>
        </nav>
        <table
          ref={tableRef}
          className=" min-w-full rounded-lg divide-y divide-gray-200 border border-none text-sm text-gray-700"
        >
          <thead className="bg-slate-200 text-sm ">
            <tr>
              <th className="px-4 py-2 text-left">Orden #</th>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Método de Pago</th>
              <th className="px-4 py-2 text-left">Fecha de Orden</th>
              <th className="px-4 py-2 text-left">Descuento</th>
              <th className="px-4 py-2 text-left">Observaciones</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody
            className="bg-white divide-y divide-gray-200"
            onClick={handleAction}
          ></tbody>
        </table>
      </div>
      <EditOrderData />
    </>
  );
}
