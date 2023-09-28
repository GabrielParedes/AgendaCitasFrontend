import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const FormulariomantServicios = () => {
  const [servicio, setServicio] = useState("");
  const [error, setError] = useState(false);
  const [mant, setMant] = useState([]);
  const [nombre, setNombre] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    // Realizar la petición GET a la API de Laravel para obtener el listado de servicios
    fetch("https://api-paolastudio.srv-sa.com/api/listar-servicios")
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado de los servicios con los datos recibidos
        setMant(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener el listado de servicios:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario

    if ([servicio].includes("")) {
      setError(true);
    } else {
      // Crear un objeto con los datos del formulario
      const formData = {
        nombre: servicio,
      };

      console.log("Formulario enviado");

      // Hacer la petición POST al backend de Laravel
      fetch("https://api-paolastudio.srv-sa.com/api/crear-servicio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setServicio("");
          setError(false);
          // Muestra una alerta de éxito
          Swal.fire({
            icon: "success",
            title: "Servicio agregado",
            showConfirmButton: false,
            timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
          });

          // Después de guardar, actualizar la tabla obteniendo los datos actualizados
          fetch("https://api-paolastudio.srv-sa.com/api/listar-servicios")
            .then((response) => response.json())
            .then((data) => {
              // Actualizar el estado de los servicios con los datos recibidos
              setMant(data);
              console.log(data);
            })
            .catch((error) => {
              console.error("Error al obtener el listado de servicios:", error);
            });
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        });
    }
  };

  // Modificaciones en tabla servicios

  // Función para eliminar un servicio por su ID
  const eliminarServicio = async (id) => {
    console.log("recibiendo en eliminar Servicio", id);
    try {
      // Realiza la petición DELETE a tu API de Laravel para eliminar el servicios
      await fetch(`https://api-paolastudio.srv-sa.com/api/eliminar-servicio/${id}`, {
        method: "DELETE",
      });

      // Muestra una alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Servicio eliminado",
        showConfirmButton: false,
        timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
      });

      // Si la petición es exitosa, actualiza el estado de los servicios
      setMant((prevMant) => prevMant.filter((mant) => mant.id_servicio !== id));
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  };

  // editar el servicio
  const editarServicio = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario

    if ([servicio].includes("")) {
      setError(true);
    } else {
      // Crear un objeto con los datos del formulario
      const formData = {
        id_servicio: id,
        nombre: servicio,
      };

      // Hacer la petición PUT al backend de Laravel para editar el servicio
      try {
        const response = await fetch(
          `https://api-paolastudio.srv-sa.com/api/actualizar-servicio/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          // actualizar el estado mant con los datos actualizados
          setMant((prevMant) =>
            prevMant.map((mant) =>
              mant.id_servicio === id ? { ...mant, nombre: servicio } : mant
            )
          );
          // Muestra una alerta de éxito
          Swal.fire({
            icon: "success",
            title: "Servicio editado",
            showConfirmButton: false,
            timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
          });

          setServicio("");
          setTimeout(() => {
            setId("");
          }, 3000);
          setError(false);
        } else {
          console.error("Error al editar el servicio:", response.statusText);
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    }
  };

  // Función para manejar el evento de clic en el enlace de editar
  const handleEditarClick = (mant) => {
    setId(mant.id_servicio);
    setServicio(mant.nombre);
  };

  return (
    <>
      <div className="container mt-5 grid gap-4 grid-cols-1 md:grid-cols-2 ">
        <div className="">
          <form onSubmit={handleSubmit} className="rounded-lg px-10 ">
            {error && (
              <h2 className="text-white font-bold rounded-md bg-red-800 p-2">
                Todos los campos son obligatorios
              </h2>
            )}

            <div className="mt-1">
              <label htmlFor="servicio" className="flex font-bold text-2xl">
                Servicio:
              </label>
              <input
                id="servicio"
                type="text"
                placeholder="Ingresa el nuevo servicio"
                className="border-2 w-full p-2 mt-2 rounded-md"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
              />
            </div>
            {id != "" ? (
              <div className="mt-4">
                <input
                  type="submit"
                  onClick={editarServicio}
                  className="bg-yellow-300 hover:bg-yellow-500
            runded-full font-bold text-2xl w-full mt-2 cursor-pointer transition-colors rounded-[13px] py-1 mb-4"
                  value="Confirmar"
                />
              </div>
            ) : (
              <div className="mt-4">
                <input
                  type="submit"
                  className="bg-[#a77e98] hover:bg-[#836779] hover:text-[#fdd0d2]
            runded-full font-bold text-2xl w-full mt-2 cursor-pointer transition-colors rounded-[13px] py-1 mb-4"
                  value="Guardar"
                />
              </div>
            )}
          </form>
        </div>

        <div className="max-h-[350px] w-full overflow-y-auto rounded-xl">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">Servicio</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>

            <tbody className="w-full overflow-x-auto">
              {mant.map((mant) => (
                <tr
                  key={mant.id_servicio}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{mant.nombre}</td>
                  <td className="px-4 py-2 flex justify-around">
                    {/* Use the handleEditarClick function to navigate to the edit route */}
                    <button
                      type="button"
                      onClick={() => handleEditarClick(mant)}
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 first-letter:focus:ring-yellow-300 
                      font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:focus:ring-yellow-900 w-20"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
                      rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-20"
                      onClick={() => eliminarServicio(mant.id_servicio)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav className="md:col-start-2 md:mt-32 lg:mt-2 mr-1">
          <Link
            to="/menu"
            className="bg-[#a77e98] hover:bg-[#836779] hover:text-[#fdd0d2] rounded-full 
          font-bold text-2xl max-w-[150px] text-center cursor-pointer transition-colors py-1 
          px-4"
          >
            Regresar
          </Link>
        </nav>
      </div>
    </>
  );
};

export default FormulariomantServicios;
