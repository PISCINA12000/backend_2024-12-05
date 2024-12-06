import PrivilegioDAO from "../Persistencia/privilegiosDAO.js"

export default class Privilegio {
    #codigo
    #descricao

    constructor(codigo, descricao) {
        this.#codigo = codigo
        this.#descricao = descricao
    }

    get codigo() {
        return this.#codigo
    }
    set codigo(value) {
        this.#codigo = value
    }

    get descricao() {
        return this.#descricao
    }
    set descricao(value) {
        this.#descricao = value
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao
        }
    }

    async gravar(){
        const pvlDAO = new PrivilegioDAO()
        await pvlDAO.gravar(this)
    }
    async editar(){
        const pvlDAO = new PrivilegioDAO()
        await pvlDAO.editar(this)
    }
    async excluir(){
        const pvlDAO = new PrivilegioDAO()
        await pvlDAO.excluir(this)
    }
    async consultar(termo){
        const pvlDAO = new PrivilegioDAO()
        return await pvlDAO.consultar(termo)
    }
}