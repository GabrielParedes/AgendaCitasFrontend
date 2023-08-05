import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const containerStyle = {
  backgroundColor: "#7f6576",
  marginTop: "2vh", // Centra verticalmente usando un margen superior del 50% del viewport
};

const Citas = () => {
  const [tipo, setTipo] = useState("");
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

  const handleLogout = () => {
    localStorage.removeItem("userSession"); // Elimina la sesión
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión exitosamente.",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/"); // Redirige a la página de inicio de sesión u otra página deseada
  };

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <button
          className="bg-[#a77e98] hover:bg-[#836779] hover:text-[#fdd0d2] font-bold py-2 px-4 rounded-full"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>

      <h1 className="font-bold text-center mt-0 text-3xl">
        Nails & Beauty <br /> <span className="text-sm">By Paola Juárez</span>
      </h1>

      {/* Inicia Contenedor Cafe */}
      <div
        className="container mt-5 mx-auto h-[660px] md:h-[500px]  text-center rounded-[30px] shadow-md"
        style={containerStyle}
      >
        <h1 className="text-white font-bold text-3xl mb-3 md:mb-0 border-b-2 border-white mx-5">
          Menú
        </h1>
        {/* Contenedor de servicios */}
        <div className="grid md:grid-cols-2 h-[450px] rounded-[30px] mt-4 font-bold text-xl">
          <div className="bg-[#fdd0d2] mx-2 mt-3 rounded-[30px] mb-5">
            <h1 className="text-3xl">Citas</h1>
            <nav className="grid mt-2">
              <Link
                to="/servicios"
                className=" bg-transparent hover:bg-[#836779] hover:text-[#fdd0d2]
                            runded-full font-bold text-1xl mt-4 mb-2 cursor-pointer 
                            transition-colors py-1 w-11/12 mx-auto border-2 border-[#c0aab7]
                            hover:border-transparent rounded-[13px]"
              >
                Agendar Cita
              </Link>

              <Link
                to="/mant/servicios"
                className=" bg-transparent hover:bg-[#836779] hover:text-[#fdd0d2]
                            runded-full font-bold text-1xl mt-4 mb-2 cursor-pointer 
                            transition-colors py-1 w-11/12 mx-auto border-2 border-[#c0aab7]
                            hover:border-transparent rounded-[13px]"
              >
                Configuración de Servicios
              </Link>
            </nav>
          </div>
          <div className="bg-[#c7c2c5] m-2 rounded-[30px] mb-5">
            <h1 className="text-3xl">Clientes</h1>
            <nav className="grid mt-2">
              <Link
                to="/formulario/clientes"
                className=" bg-transparent hover:bg-[#836779] hover:text-[#fdd0d2]
                            runded-full font-bold text-1xl mt-4 md:mt-4 mb-2 cursor-pointer 
                            transition-colors py-1 w-11/12 mx-auto border-2 border-[#c0aab7]
                            hover:border-transparent rounded-[13px]"
              >
                Agregar Cliente
              </Link>

              <Link
                to="/agenda"
                className=" bg-transparent hover:bg-[#836779] hover:text-[#fdd0d2]
                            runded-full font-bold text-1xl mt-4 md:mt-4 mb-2 cursor-pointer 
                            transition-colors py-1 w-11/12 mx-auto border-2 border-[#c0aab7]
                            hover:border-transparent rounded-[13px]"
              >
                Lista de Clientes
              </Link>

              <Link
                to="/usuarios"
                className=" bg-transparent hover:bg-[#836779] hover:text-[#fdd0d2]
                            runded-full font-bold text-1xl mt-4 md:mt-4 mb-2  cursor-pointer 
                            transition-colors py-1 w-11/12 mx-auto border-2 border-[#c0aab7]
                            hover:border-transparent rounded-[13px]"
              >
                Agregar Usuario
              </Link>
            </nav>
          </div>
          <div className="bg-[#f0e3d3] m-2 rounded-[30px] mb-5 md:col-span-2">
            <h1 className="text-3xl">Resumen</h1>
            <nav className="grid mt-2">
              <Link
                to="/resumen"
                className=" bg-transparent hover:bg-[#836779] hover:text-[#fdd0d2]
                            runded-full font-bold text-1xl mt-4 mb-2 cursor-pointer 
                            transition-colors py-1 w-11/12 mx-auto border-2 border-[#c0aab7]
                            hover:border-transparent rounded-[13px]"
              >
                Resumen de Citas
              </Link>
            </nav>
          </div>
        </div>

        {/* Fin Contenedor de servicios */}
      </div>

      {/* Fin contenedor cafe */}
    </>
  );
};

export default Citas;
