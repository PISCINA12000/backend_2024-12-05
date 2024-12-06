import UsuarioDAO from "../Persistencia/usuarioDAO.js"
import Privilegio from "./privilegios.js"

export default class Usuario {
    #codigo
    #nome
    #endereco
    #telefone
    #senha
    #privilegio

    constructor(codigo = 0, nome = "", endereco = "", telefone = "", senha = "", privilegio = {}) {
        this.#codigo = codigo
        this.#nome = nome
        this.#endereco = endereco
        this.#telefone = telefone
        this.#senha = senha
        this.#privilegio = privilegio
    }

    get codigo() {
        return this.#codigo
    }
    set codigo(value) {
        this.#codigo = value
    }

    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }

    get endereco() {
        return this.#endereco
    }
    set endereco(value) {
        this.#endereco = value
    }

    get telefone() {
        return this.#telefone
    }
    set telefone(value) {
        this.#telefone = value
    }

    get senha() {
        return this.#senha
    }
    set senha(value) {
        this.#senha = value
    }

    get privilegio(){
        return this.#privilegio
    }
    set privilegio(novoPrivilegio){
        if (novoPrivilegio instanceof Privilegio){
            this.#privilegio = novoPrivilegio
        }
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "telefone": this.#telefone,
            "senha": this.#senha,
            "privilegio": this.#privilegio
        }
    }

    async gravar() {
        const usuarioDAO = new UsuarioDAO()
        await usuarioDAO.gravar(this)
    }
    async editar() {
        const usuarioDAO = new UsuarioDAO()
        await usuarioDAO.editar(this)
    }
    async excluir() {
        const usuarioDAO = new UsuarioDAO()
        await usuarioDAO.excluir(this)
    }
    async consultar(termo) {
        const usuarioDAO = new UsuarioDAO()
        return await usuarioDAO.consultar(termo)
    }
}