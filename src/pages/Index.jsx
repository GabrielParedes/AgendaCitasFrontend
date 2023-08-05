import { useState } from "react";
import logo from "../assets/img/logo.png";
import Formulario from "../componentes/Formulario";

const containerStyle = {
  // backgroundColor: "#7f6576",
  marginTop: "5vh", // Centra verticalmente usando un margen superior del 50% del viewport
};

const formContainerStyle = {
  backgroundColor: "#c7c2c5", // Color de fondo para el contenedor del formulario
};

const imageStyle = {
  position: "absolute",
  top: "-85px", // Ajusta esta distancia para controlar cuánto se muestra la imagen fuera del contenedor
  left: "50%", // Centra horizontalmente la imagen en el contenedor del formulario
  transform: "translateX(-50%)", // Ajusta para centrar la imagen
  width: "15rem", // Ajusta el ancho de la imagen
  height: "15rem", // Ajusta la altura de la imagen
  borderRadius: "50%", // Hace que la imagen sea circular (opcional)
};

export const Index = () => {
  return (
    <>
      <h1 className="font-bold text-center mt-5 text-3xl">
        Nails & Beauty <br /> <span className="text-sm">By Paola Juárez</span>
      </h1>

      <div
        className="container mt-10 mx-auto py-36 px-10 md:py-14 md:px-52 text-center rounded-[30px]"
        style={containerStyle}
      >
        {/* Segundo div con formulario */}
        <div
          className="relative flex justify-center items-center h-[380px] rounded-[30px]"
          style={formContainerStyle}
        >
          {/* Imagen que sale de la parte superior */}
          <img src={logo} alt="Imagen" style={imageStyle} />

          {/* formulario */}
          <Formulario />
        </div>
      </div>
    </>
  );
};
