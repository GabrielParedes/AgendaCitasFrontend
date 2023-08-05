import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioEditarCita = () => {
  const location = useLocation();
  const [cita, setCita] = useState({});
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [servicio, setServicio] = useState("");
  const [servicios, setServicios] = useState([]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (location.state && location.state.cita) {
      setCita(location.state.cita);
    }
  }, [location.state]);

  // Mover la inicialización de los estados dentro del useEffect
  useEffect(() => {
    setNombre(cita.nombre);
    setApellido(cita.apellido);
    setTelefono(cita.telefono);
    setServicio(cita.servicio);
    setFecha(cita.fecha_cita);
    setHora(cita.hora_cita);
    setId(cita.id_cita);
  }, [cita]);
  console.log(cita);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario

    // Crear un objeto con los datos del formulario
    const formData = {
      id_cita: id,
      servicio: servicio,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      fechaCita: fecha,
      horaCita: hora,
    };
    console.log(formData);
    console.log("Formulario enviado");

    // Hacer la petición POST al backend de Laravel
    fetch(`http://localhost:8000/api/actualizar-cita/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Muestra una alerta de éxito
        Swal.fire({
          icon: "success",
          title: "Cita editado",
          showConfirmButton: false,
          timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
        });

        navigate("/resumen");
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  return (
    <div className="w-full mt-5">
      <form onSubmit={handleSubmit} className="rounded-lg px-10 mt-2">
        <select
          className="text-1xl bg-gray-100 w-full rounded-md p-1"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
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
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
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
            font-bold text-2xl w-full mt-7 cursor-pointer transition-colors rounded-[13px] py-1 mb-4"
            value="Guardar Cambios"
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioEditarCita;
