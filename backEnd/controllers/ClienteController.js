// Controller de clientes: só o CRUD padrão (listar, buscar, criar, atualizar, deletar).

import { criarControllerCrud } from "../utils/controllerCrud.js";

export function criarClienteController({ clienteService }) {
    return criarControllerCrud({ service: clienteService, nome: "Cliente" });
}
