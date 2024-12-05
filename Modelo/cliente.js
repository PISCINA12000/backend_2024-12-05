import ClienteDAO from "../Persistencia/clienteDAO.js"

export default class Cliente {
    #codigo
    #nome
    #endereco
    #cidade
    #cep

    get codigo() {
        return this.#codigo
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo
    }

    get nome() {
        return this.#nome
    }
    set nome(novoNome) {
        this.#nome = novoNome
    }

    get endereco() {
        return this.#endereco
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco
    }

    get cidade() {
        return this.#cidade
    }
    set cidade(novoCidade) {
        this.#codigo = novoCidade
    }

    get cep() {
        return this.#cep
    }
    set cep(novoCep) {
        this.#cep = novoCep
    }

    constructor(codigo = 0, nome = "", endereco = "", cidade = "", cep = "") {
        this.#codigo = codigo
        this.#nome = nome
        this.#endereco = endereco
        this.#cidade = cidade
        this.#cep = cep
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "cidade": this.#cidade,
            "cep": this.#cep
        }
    }

    async gravar() {
        const clienteDAO = new ClienteDAO()
        await clienteDAO.gravar(this)
    }
    async consultar(termo) {
        const clienteDAO = new ClienteDAO()
        return await clienteDAO.consultar(termo)
    }
    async excluir() {
        const clienteDAO = new ClienteDAO()
        await clienteDAO.excluir(this)
    }
    async alterar() {
        const clienteDAO = new ClienteDAO()
        await clienteDAO.alterar(this)
    }
}