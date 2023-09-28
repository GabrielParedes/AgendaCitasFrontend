import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormularioEditar = () => {
  const location = useLocation();
  const [contacto, setContacto] = useState({});
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.contacto) {
      setContacto(location.state.contacto);
    }
  }, [location.state]);

  // Mover la inicialización de los estados dentro del useEffect
  useEffect(() => {
    setNombre(contacto.nombre);
    setApellido(contacto.apellido);
    setTelefono(contacto.telefono);
    setId(contacto.id_cliente);
  }, [contacto]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario

    // Crear un objeto con los datos del formulario
    const formData = {
      id_cliente: id,
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
    };

    console.log("Formulario enviado");

    // Hacer la petición POST al backend de Laravel
    fetch(`https://api-paolastudio.srv-sa.com/api/actualizar-cliente/${id}`, {
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
          title: "Cliente editado",
          showConfirmButton: false,
          timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
        });
        navigate("/agenda");
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  return (
    <div className="w-full mt-5">
      <form onSubmit={handleSubmit} className="rounded-lg px-10 mt-2">
        <div className="my-5">
          <label htmlFor="nombre" className="flex font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tú nombre"
            className="border-2 w-full p-2 mt-2 rounded-md"
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
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="telefono" className="flex font-bold">
            Télefono
          </label>
          <input
            id="telefono"
            type="text"
            placeholder="Ingresa tú télefono"
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
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

export default FormularioEditar;
