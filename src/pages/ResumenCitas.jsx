import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const containerStyle = {
  // backgroundColor: "#7f6576",
  marginTop: "5vh", // Centra verticalmente usando un margen superior del 50% del viewport
  maxHeight: "500px",
};

const formContainerStyle = {
  backgroundColor: "#c7c2c5", // Color de fondo para el contenedor del formulario
};

export const ResumenCitas = () => {
  // Estado para almacenar el tipo de cita y fecha seleccionados
  const [tipoCita, setTipoCita] = useState("");
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState([]);

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

  useEffect(() => {
    // Realizar la petición GET a la API de Laravel para obtener el listado de servicios
    fetch("http://localhost:8000/api/listar-citas")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado de los servicios con los datos recibidos
        setResultados(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener el listado de citas:", error);
      });
  }, []);

  // Función para manejar el envío del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la llamada a la API de Laravel para obtener los resultados de búsqueda
    // Reemplaza 'URL_DE_TU_API' con la URL de tu backend Laravel
    fetch(
      `http://localhost:8000/api/buscar-citas?nombreCliente=${nombre}&servicio=${tipoCita}&fechaCita=${fecha}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con los resultados de la búsqueda
        setResultados(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los resultados:", error);
      });
  };

  // Función para manejar el evento de clic en el enlace de editar
  const handleEditarClick = (cita) => {
    // console.log(cita);
    // Navegar a la ruta de edición de la cita
    navigate(`/formulario/citas/editar`, { state: { cita: cita } });
  };

  // Función para eliminar una cita por su ID
  const eliminarCita = async (cita) => {
    try {
      // Realiza la petición DELETE a tu API de Laravel para eliminar la cita
      await fetch(`http://localhost:8000/api/eliminar-cita/${cita.id_cita}`, {
        method: "DELETE",
      });

      // Muestra una alerta de éxito utilizando SweetAlert
      Swal.fire({
        icon: "success",
        title: "Cita eliminada correctamente",
        showConfirmButton: false,
        timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
      });

      // Si la petición es exitosa, actualiza el estado de los resultados
      setResultados((prevResultados) =>
        prevResultados.filter((item) => item.id_cita !== cita.id_cita)
      );
    } catch (error) {
      console.error("Error al eliminar la cita:", error);

      // Muestra una alerta de error utilizando SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error al eliminar la cita",
        text: "Ha ocurrido un error al intentar eliminar la cita. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
    <>
      <h1 className="font-bold text-center mt-5 text-3xl">
        Paola Studio <br /> {/* <span className="text-sm">By Paola Juárez</span> */}
      </h1>
      {/* Inicia Contenedor Cafe */}

      <h1 className="text-white font-bold text-3xl mb-1 md:mb-0 border-b-2 border-white mx-10 text-center">
        Lista de Citas
      </h1>
      <div
        className="container grid lg:grid-cols-2 gap-4 py-4 mt-2 mx-auto h-[600px] md:h-[400px]  text-center rounded-[30px]"
        style={containerStyle}
      >
        <div className="">
          <div className=" ">
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-2">
              <div className="mx-2 col-span-3 md:col-span-1 lg:col-span-3 flex md:flex-row items-center">
                <label className="font-bold w-40">Nombre:</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="border-2 w-full p-2 mt-2 rounded-md"
                />
              </div>

              <div className="mx-2 col-span-3 lg:col-span-3 md:col-span-1 flex items-center">
                <label className="font-bold w-40">Tipo de Cita:</label>
                <input
                  type="text"
                  value={tipoCita}
                  onChange={(e) => setTipoCita(e.target.value)}
                  className="border-2 w-full p-2 mt-2 rounded-md"
                />
              </div>

              <div className="mx-2 col-span-3 lg:col-span-3 md:col-span-1 flex items-center">
                <label className="font-bold w-40">Fecha:</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="border-2 w-full p-2 mt-2 rounded-md"
                />
              </div>
              <div className="mx-2 mt-2 col-span-3">
                <button
                  type="submit"
                  className="bg-[#a77e98] hover:bg-[#836779] hover:text-[#fdd0d2]
            runded-full  font-bold text-2xl w-full mt-2 cursor-pointer transition-colors rounded-[13px] py-1 mb-1"
                >
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Inicio Tabla */}
        <div className="h-[350px] lg:h-[370px] min-h-[200px] w-full overflow-y-auto rounded-xl">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Apellido</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Telefono</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Hora</th>
                <th className="px-4 py-2">Acciones</th>
                {/* Agrega más encabezados de columnas según tus datos */}
              </tr>
            </thead>
            <tbody className="w-full overflow-x-auto">
              {resultados.map((cita) => (
                <tr
                  key={cita.id_cita}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {cita.nombre}
                  </td>
                  <td className="px-4 py-2">{cita.apellido}</td>
                  <td className="px-4 py-2">{cita.servicio}</td>
                  <td className="px-4 py-2">{cita.telefono}</td>
                  <td className="px-4 py-2">{cita.fecha_cita}</td>
                  <td className="px-4 py-2">{cita.hora_cita}</td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleEditarClick(cita)}
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 first-letter:focus:ring-yellow-300 
                      font-medium rounded-lg text-sm w-16 px-2 py-2 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminarCita(cita)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
                      font-medium w-16 rounded-lg text-sm px-2 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                  {/* Agrega más celdas según tus datos */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fin contenedor cafe */}
      </div>
      <nav className="flex items-center justify-end mr-14 mt-2 lg:mt-2 ml-auto">
        <Link
          to="/menu"
          className="bg-[#a77e98] hover:bg-[#836779] hover:text-[#fdd0d2] rounded-full 
          font-bold mt-32 lg:mt-2 mb-2 text-2xl max-w-[150px] text-center cursor-pointer transition-colors py-1 
          px-4"
        >
          Regresar
        </Link>
      </nav>
    </>
  );
};
