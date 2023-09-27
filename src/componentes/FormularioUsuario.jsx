import { useState } from "react";
import Swal from "sweetalert2";

const FormularioUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario

    if ([nombre, usuario, password].includes("")) {
      setError(true);
    } else {
      // Crear un objeto con los datos del formulario
      const formData = {
        nombre: nombre,
        usuario: usuario,
        contrasena: password,
      };

      // Hacer la petición POST al backend de Laravel
      fetch("http://localhost:8000/api/crear-usuario", {
        method: "POST",
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
            title: "Usuario agregado",
            showConfirmButton: false,
            timer: 1500, // La alerta se cerrará automáticamente después de 1.5 segundos
          });
          console.log(data);
          setError(false);
          setNombre("");
          setUsuario("");
          setPassword("");
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        });
    }
  };

  return (
    <div className="w-full mt-5">
      <form onSubmit={handleSubmit} className="rounded-lg px-10 mt-2">
        {error && (
          <h2 className="text-white font-bold rounded-md bg-red-800 p-2">
            Todos los campos son obligatorios
          </h2>
        )}
        <div className="my-5">
          <label htmlFor="nombre" className="flex font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Ingresa el nombre"
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="usuario" className="flex font-bold">
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            placeholder="Ingresa el usuario"
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="flex font-bold">
            Password
          </label>
          <input
            id="password"
            type="text"
            placeholder="Ingresa la contraseña"
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            type="submit"
            className="bg-[#fdd0d2] hover:bg-[#eda2b6]
            runded-full font-bold text-2xl w-full mt-7 cursor-pointer transition-colors rounded-[13px] py-1 mb-4"
            value="Guardar"
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioUsuario;
