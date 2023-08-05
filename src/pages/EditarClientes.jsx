import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/img/logo.png";
import FormularioEditar from "../componentes/FormularioEditar";
import { useEffect } from "react";
import Swal from "sweetalert2";

const containerStyle = {
  backgroundColor: "#7f6576",
  marginTop: "5vh", // Centra verticalmente usando un margen superior del 50% del viewport
};

const formContainerStyle = {
  backgroundColor: "#c7c2c5", // Color de fondo para el contenedor del formulario
};

function EditarClientes() {
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
        className="container mt-10 mx-auto h-[600px] md:h-[500px]  text-center rounded-[30px] shadow-md"
        style={containerStyle}
      >
        <h1 className="text-white font-bold text-3xl mb-3 md:mb-0 border-b-2 border-white mx-5">
          Editar Clientes
        </h1>

        {/* Segundo div con formulario */}
        <div className="grid md:grid-cols-2 h-[450px] rounded-[30px]">
          {/* Agrega aquí el contenido del formulario */}
          <div className="flex justify-center items-center order-2 md:order-1">
            <FormularioEditar />
          </div>

          {/* Imagen que sale de la parte superior */}
          <div className="flex justify-center items-center order-1 md:order-2">
            <img
              src={logo}
              alt="Imagen"
              className="md:w-[20rem] md:h-[20rem] w-[10rem] h-[10rem]"
            />
          </div>
        </div>
        <nav className="mt-28 md:mt-7 flex justify-between">
          <Link
            to="/menu"
            className=" bg-[#a77e98] hover:bg-[#836779]
            runded-full font-bold text-2xl w-full cursor-pointer transition-colors rounded-[13px] p-2 mx-6 md:mx-8"
          >
            Menú
          </Link>
          <Link
            to="/agenda"
            className=" bg-[#c2c2c2] hover:bg-[#727b79]
            runded-full font-bold text-2xl w-full cursor-pointer transition-colors rounded-[13px] p-2 mx-6 md:mx-8"
          >
            Regresar
          </Link>
        </nav>
      </div>
    </>
  );
}

export default EditarClientes;
