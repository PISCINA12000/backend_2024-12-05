import Cliente from "../Modelo/cliente.js"
import conectar from "./Conexao.js"

export default class ClienteDAO {
    constructor() {
        this.init()
    }

    async init() {
        try {
            const conexao = await conectar()
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    codigo_cli INT NOT NULL AUTO_INCREMENT,
                    nome_cli VARCHAR(200) NOT NULL,
                    endereco_cli VARCHAR(200) NOT NULL,
                    cidade_cli VARCHAR(200) NOT NULL,
                    cep_cli VARCHAR(200) NOT NULL,

                    CONSTRAINT pk_produto
                        PRIMARY KEY(codigo_cli)
                );`
            await conexao.execute(sql)
            await conexao.release()
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message)
        }
    }

    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar()
            const sql = `
                INSERT
                INTO cliente(nome_cli, endereco_cli, cidade_cli, cep_cli)
                    values(?,?,?,?);`
            let parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.cidade,
                cliente.cep,
            ]
            const resultado = await conexao.execute(sql, parametros)
            cliente.codigo = resultado[0].insertId

            await conexao.release()
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar()
            const sql = `
                UPDATE cliente
                SET nome_cli=?, endereco_cli=?, cidade_cli=?, cep_cli=?
                WHERE codigo_cli = ?;`
            let parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.cidade,
                cliente.cep,
                cliente.codigo
            ]
            await conexao.execute(sql, parametros)

            await conexao.release()
        }
    }

    async consultar(termo) {
        const conexao = await conectar()
        let sql = ""
        let parametros = []

        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT *
                FROM cliente
                WHERE nome_cli LIKE ?;`
            parametros = ['%' + termo + '%']
        }
        else {
            sql = `
                SELECT *
                FROM cliente c
                WHERE codigo_cli = ?;`
            parametros = [termo]
        }
        const [linhas, campos] = await conexao.execute(sql, parametros)
        let listaClientes = []
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha['codigo_cli'],
                linha['nome_cli'],
                linha['endereco_cli'],
                linha['cidade_cli'],
                linha['cep_cli'],
            )
            listaClientes.push(cliente)
        }
        await conexao.release()
        return listaClientes
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar()
            const sql = `
                DELETE
                FROM cliente
                WHERE codigo_cli = ?;`
            let parametros = [
                cliente.codigo
            ]
            await conexao.execute(sql, parametros)
            await conexao.release()
        }
    }
}