import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const containerStyle = {
  // backgroundColor: "#7f6576",
  marginTop: "5vh", // Centra verticalmente usando un margen superior del 50% del viewport
  maxHeight: "550px", // Ajusta la altura máxima deseada para el contenedor
};

const AgendaContactos = () => {
  const [contactos, setContactos] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  const nav = useNavigate();

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (!userSession) {
      nav("/");
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
    // Realizar la petición GET a la API de Laravel para obtener el listado de contactos
    fetch("http://localhost:8000/api/listar-clientes")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado de los contactos con los datos recibidos
        setContactos(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener el listado de contactos:", error);
      });
  }, []);

  // Función para eliminar un contacto por su ID
  const eliminarContacto = async (id) => {
    console.log("recibiendo en eliminarContacto", id);
    try {
      // Realiza la petición DELETE a tu API de Laravel para eliminar el contacto
      await fetch(`http://localhost:8000/api/eliminar-cliente/${id}`, {
        method: "DELETE",
      });
      // Muestra una alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Cliente eliminado",
        showConfirmButton: false,
        timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
      });

      // Si la petición es exitosa, actualiza el estado de los contactos
      setContactos((prevContactos) =>
        prevContactos.filter((contacto) => contacto.id_cliente !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  // Función para manejar el evento de clic en el enlace de editar
  const handleEditarClick = (contacto) => {
    console.log(contacto);
    // Navegar a la ruta de edición del contacto
    navigate(`/formulario/clientes/editar`, { state: { contacto: contacto } });
  };

  return (
    <>
      <h1 className="font-bold text-center mt-5 text-3xl">
        Nails & Beauty <br /> <span className="text-sm">By Paola Juárez</span>
      </h1>

      <div
        className="container mt-5 mx-auto py-32 px-10 md:py-44 md:px-52 text-center rounded-[30px]  relative"
        style={containerStyle}
      >
        <h1 className="text-black font-bold text-2xl md:text-3xl mb-1 md:mb-0 border-b-2 border-black mx-5 absolute top-0 left-1/2 transform -translate-x-1/2 mt-0">
          Lista de Clientes
        </h1>

        <div className="max-h-[350px] w-full overflow-y-auto rounded-xl absolute top-12 left-1/2 transform -translate-x-1/2 mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2 ">Nombre</th>
                <th className="px-4 py-2">Apellido</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>

            <tbody className="w-full overflow-x-auto">
              {contactos.map((contacto) => (
                <tr
                  key={contacto.id_cliente}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2 font-bold">{contacto.nombre}</td>
                  <td className="px-4 py-2">{contacto.apellido}</td>
                  <td className="px-4 py-2">{contacto.telefono}</td>
                  <td className="px-4 py-2">
                    {/* Use the handleEditarClick function to navigate to the edit route */}
                    <button
                      type="button"
                      onClick={() => handleEditarClick(contacto)}
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 first-letter:focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 mb-2 dark:focus:ring-yellow-900 w-20"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-20"
                      onClick={() => eliminarContacto(contacto.id_cliente)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav
          className=" bg-[#a77e98] hover:bg-[#836779]
            runded-full font-bold text-2xl w-full mt-80 md:mt-64 cursor-pointer transition-colors rounded-[13px] py-1 mb-4"
        >
          <Link to="/menu">Regresar</Link>
        </nav>
      </div>
    </>
  );
};

export default AgendaContactos;
