import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Index } from "./pages/Index";
import Clientes from "./pages/Clientes";
import Citas from "./pages/Citas";
import Servicios from "./pages/Servicios";
import AgendaContactos from "./pages/AgendaContactos";
import EditarClientes from "./pages/EditarClientes";
import { ResumenCitas } from "./pages/ResumenCitas";
import Usuarios from "./pages/Usuarios";
import MantenimientoServicios from "./pages/MantenimientoServicios";
import EditarCita from "./pages/EditarCita";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/formulario/clientes",
    element: <Clientes />,
  },
  {
    path: "/formulario/clientes/editar",
    element: <EditarClientes />,
  },
  {
    path: "/formulario/citas/editar",
    element: <EditarCita />,
  },
  {
    path: "/menu",
    element: <Citas />,
  },
  {
    path: "/servicios",
    element: <Servicios />,
  },
  {
    path: "/agenda",
    element: <AgendaContactos />,
  },
  {
    path: "/resumen",
    element: <ResumenCitas />,
  },
  {
    path: "/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/mant/servicios",
    element: <MantenimientoServicios />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
