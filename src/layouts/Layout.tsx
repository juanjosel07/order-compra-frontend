import Logo from "@/components/Logo";
import { Link, Outlet } from "react-router-dom";
// import { ToastContainer } from 'react-toastify'
// import Logo from '../components/Logo'

export default function Layout() {
  return (
    <>
      <header className="bg-gradient-to-r from-lime-900 to-lime-600">
        <div className="max-w-6xl py-3 flex justify-around items-center">
          <div className="w-64 ">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-300 ">
            Administrador Ordenes de compra
          </h1>
        </div>
      </header>
      {/* <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow"> */}
      <section className="max-w-7xl mx-auto mt-10 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados @{new Date().getFullYear()}
        </p>
      </footer>

      {/* <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} /> */}
    </>
  );
}
