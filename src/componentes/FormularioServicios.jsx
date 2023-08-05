import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormularioServicios = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [calendario, setCalendario] = useState("");
  const [servicios, setServicios] = useState([]);
  const [tipo, setTipo] = useState("");
  const [hora, setHora] = useState("");
  const [guardar, setGuardar] = useState(false);
  const [error, setError] = useState(false);

  // Obtener los servicios para el select
  useEffect(() => {
    fetch(`http://localhost:8000/api/listar-servicios`)
      .then((response) => response.json())
      .then((data) => {
        setServicios(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario

    if ([tipo, nombre, apellido, telefono, calendario, hora].includes("")) {
      setError(true);
    } else {
      setError(false);
      // Crear un objeto con los datos del formulario
      const formData = {
        servicio: tipo,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        fechaCita: calendario,
        horaCita: hora,
      };

      console.log("Formulario enviado");

      // Hacer la petición POST al backend de Laravel
      fetch("http://localhost:8000/api/crear-cita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("datos devueltos", data);
          setNombre("");
          setApellido("");
          setTelefono("");
          setCalendario("");
          setHora("");

          // Muestra una alerta de éxito
          Swal.fire({
            icon: "success",
            title: "Cita agregada",
            showConfirmButton: false,
            timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
          });
        })
        .catch((error) => {
          alert("Error al enviar el formulario:", error);
        });
    }
  };

  return (
    <div className="w-full mt-2">
      <form onSubmit={handleSubmit} className="rounded-lg px-10 mt-0">
        {error ? (
          <h2 className="text-white font-bold rounded-md bg-red-800 p-2">
            Todos los campos son obligatorios
          </h2>
        ) : (
          // Coloca el bloque fuera del bloque "else"
          servicios.length > 0 && (
            <h2 className="text-white text-bold text-2xl">
              Servicio de{" "}
              <span className="font-bold text-2xl">
                {servicios.find((servicio) => servicio.nombre === tipo)
                  ?.nombre || ""}
              </span>
            </h2>
          )
        )}

        <select
          className="text-1xl bg-gray-100 w-full rounded-md p-1"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Selecciona un servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio.id} value={servicio.nombre}>
              {servicio.nombre}
            </option>
          ))}
        </select>

        <div className="my-3">
          <label htmlFor="nombre" className="flex font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tú nombre"
            className="border-2 w-full p-1 mt-1 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="apellido" className="flex font-bold">
            Apellido
          </label>
          <input
            id="apellido"
            type="text"
            placeholder="Ingresa tú apellido"
            className="border-2 w-full p-1 mt-1 rounded-md"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <label htmlFor="telefono" className="flex font-bold">
            Télefono
          </label>
          <input
            id="telefono"
            type="number"
            placeholder="Ingresa tú télefono"
            className="border-2 w-full p-1 mt-1 rounded-md"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label htmlFor="fecha" className="flex font-bold">
            Fecha de Cita
          </label>
          <input
            id="fecha"
            type="date"
            placeholder="23/04/2023"
            className="border-2 w-full p-1 mt-1 rounded-md"
            value={calendario}
            onChange={(e) => setCalendario(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label htmlFor="hora" className="flex font-bold">
            Horario
          </label>
          <input
            id="hora"
            type="time"
            placeholder="00:00"
            className="border-2 w-full p-1 mt-1 rounded-md"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

        <div>
          <input
            type="submit"
            className="bg-[#fdd0d2] hover:bg-[#eda2b6]
            runded-full font-bold text-2xl w-full mt-1 cursor-pointer transition-colors rounded-[13px] py-1 mb-4"
            value="Guardar"
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioServicios;
