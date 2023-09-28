import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Formulario = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto al enviar el formulario

    // Crear un objeto con los datos del formulario
    const formData = {
      usuario: usuario,
      password: password,
    };

    console.log("Formulario enviado", formData);

    // Hacer la petición POST al backend de Laravel
    fetch(
      `https://api-paolastudio.srv-sa.com/api/login?usuario=${usuario}&contrasena=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.sesion) {
          console.log("dentro de data session");
          localStorage.setItem("userSession", JSON.stringify(data));
          navigate("/menu");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        console.log(data);
        setUser(data);
        setPassword("");
        setUsuario("");
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  return (
    <div className="w-full mt-5">
      <h1 className=" text-white font-bold text-xl">Registra</h1>
      <form onSubmit={handleSubmit} className="rounded-lg py-10 px-10 mt-20">
        <div className="my-5">
          <label htmlFor="usuario" className="flex font-bold">
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            placeholder="Ingresa tu usuario"
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="flex font-bold">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="border-2 w-full p-2 mt-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="submit"
            className="bg-[#fdd0d2] hover:bg-[#eda2b6]
            runded-full font-bold text-2xl w-full mt-7 cursor-pointer transition-colors rounded-full py-1 mb-4"
            value="Iniciar"
          />
        </div>
      </form>
    </div>
  );
};

export default Formulario;
