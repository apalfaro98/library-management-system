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
const addBook = (titulo, autor, categoria, cantidad) => {
  return fetch(`${url}api/admin/add-book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      autor,
      categoria,
      cantidad,
    }),
  });
};

export default { auth, registro, addBook };
