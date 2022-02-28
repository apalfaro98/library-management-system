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

export default { auth };
