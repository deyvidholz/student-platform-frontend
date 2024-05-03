export const numbersOnly = (input) =>
  !input || /^\d+$/.test(String(input)) || "Apenas números são permitidos";

export const lettersOnly = (input) =>
  !input || /^[A-Za-z]+$/.test(String(input)) || "Apenas letras são permitidas";

export const lettersAndSpacesOnly = (input) =>
  !input ||
  /^[A-Za-z ]+$/.test(String(input)) ||
  "Apenas letras e espaços são permitidas";

export const username = (input) =>
  !input || /^\w+\.?\w+$/.test(String(input)) || "Nome de usuário inválido";

export const email = (input) =>
  !input ||
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(input)) ||
  "E-mail inválido";

export const password = (input) =>
  !input ||
  !input.length >= 6 ||
  !input.length <= 24 ||
  "São necessários 6 a 24 caracteres";

export const required = (input) =>
  !input || /^.+$/.test(String(input)) || "Campo obrigatório";
