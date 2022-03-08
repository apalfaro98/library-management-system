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
const prestarLibro = (titulo, email) => {
  return fetch(`${url}api/admin/prestamo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      email,
    }),
  });
};
const devolverLibro = (titulo, email) => {
  return fetch(`${url}api/admin/return-book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      email,
    }),
  });
};
const borrarLibro = (titulo, cantidad) => {
  return fetch(`${url}api/admin/delete-book`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      cantidad,
    }),
  });
};
const borrarEstudiante = (email) => {
  return fetch(`${url}api/admin/delete-student`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
};
const showBooks = () => {
  return fetch(`${url}api/admin/show-books`);
};
const showStudents = () => {
  return fetch(`${url}api/admin/show-student`);
};

export default {
  auth,
  registro,
  addBook,
  showBooks,
  showStudents,
  prestarLibro,
  devolverLibro,
  borrarLibro,
  borrarEstudiante,
};
