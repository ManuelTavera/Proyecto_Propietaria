import { post, get, del, put } from "./api.service";

export function answerClaimComplaintRequest(data) {
  const value = JSON.parse(JSON.stringify(data));

  return post("api/answer/insertar", value);
}

export function getAnswersRequest(data = "") {
  return get(`api/answer/mostrar/${data}`);
}

export function getClaimsAnswersRequest(data = "") {
  return get(`api/answer/mostrarReclamacion/${data}`);
}

export function getComplaintsAnswersRequest(data = "") {
  return get(`api/answer/mostrarQueja/${data}`);
}

export function updateAnswerRequest(data) {
  const value = JSON.parse(JSON.stringify(data));

  return put(`api/answer/Actualizar`, value);
}
