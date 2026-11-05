// Controller de profissionais: só o CRUD padrão (listar, buscar, criar, atualizar, deletar).

import { criarControllerCrud } from "../utils/controllerCrud.js";

export function criarProfissionalController({ profissionalService }) {
    return criarControllerCrud({ service: profissionalService, nome: "Profissional" });
}
