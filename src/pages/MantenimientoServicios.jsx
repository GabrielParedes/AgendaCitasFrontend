import React, { useEffect } from "react";
import FormulariomantServicios from "../componentes/FormulariomantServicios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const containerStyle = {
  // backgroundColor: "#7f6576",
  marginTop: "5vh", // Centra verticalmente usando un margen superior del 50% del viewport
};

const formContainerStyle = {
  backgroundColor: "#c7c2c5", // Color de fondo para el contenedor del formulario
};

const MantenimientoServicios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (!userSession) {
      navigate("/");
      // Muestra una alerta de éxito
      Swal.fire({
        icon: "error",
        title: "No has iniciado sesión",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, []);
  return (
    <>
      <h1 className="font-bold text-center mt-5 text-3xl">
        Nails & Beauty <br /> <span className="text-sm">By Paola Juárez</span>
      </h1>

      <div
        className="container mt-10 mx-auto md:w-9/12 h-[280px] text-center rounded-[30px]"
        style={containerStyle}
      >
        <h1 className="text-white font-bold text-3xl mb-3 md:mb-0 border-b-2 border-white mx-5">
          Mantenimiento de Servicios
        </h1>

        {/* Segundo div con formulario */}
        <div className="rounded-[30px] ">
          {/* Agrega aquí el contenido del formulario */}
          <div className="flex justify-center items-center order-2 md:order-1 ">
            <FormulariomantServicios />
          </div>
        </div>
      </div>
    </>
  );
};

export default MantenimientoServicios;
