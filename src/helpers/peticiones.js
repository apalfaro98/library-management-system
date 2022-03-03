const url = "http://localhost:8000/";

const auth = (usuario, contrasena) => {
  return fetch(`${url}api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: usuario,
      password: contrasena,
    }),
  });
};

const registro = (nombre, apellido, carnet, email, carrera, anio) => {
  return fetch(`${url}api/student/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      apellido,
      carnet,
      email,
      carrera,
      anio,
    }),
  });
};

export default { auth, registro };
