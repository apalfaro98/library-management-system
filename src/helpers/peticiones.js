const url = "https://reqres.in/";

const auth = (usuario, contrasena) => {
  return fetch(`${url}api/login`, {
    method: "POST",
    body: JSON.stringify({
      usuario: usuario,
      password: contrasena,
    }),
  });
};

export default { auth };
