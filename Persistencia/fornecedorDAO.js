import Fornecedor from "../Modelo/fornecedor.js"

import conectar from "./Conexao.js"
export default class FornecedorDAO {
    constructor() {
        this.init()
    }

    async init() {
        try{
            const conexao = await conectar()
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedor(
                    codigo_forn INT NOT NULL AUTO_INCREMENT,
                    nome_forn VARCHAR(200) NOT NULL,
                    cep_forn VARCHAR(200) NOT NULL,
                    cidade_forn VARCHAR(200) NOT NULL,
                    cnpj_forn VARCHAR(200) NOT NULL,
                    endereco_forn VARCHAR(200) NOT NULL,
                    telefone_forn VARCHAR(200) NOT NULL,

                    CONSTRAINT pk_fornecedor
                        PRIMARY KEY(codigo_forn)
                );`
            await conexao.execute(sql)
            await conexao.release()
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message)
        }
    }

    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar()
            const sql = `
                INSERT
                INTO fornecedor(nome_forn, cep_forn, cidade_forn, cnpj_forn, endereco_forn, telefone_forn)
                    values(?,?,?,?,?,?);`
            let parametros = [
                fornecedor.nome,
                fornecedor.cep,
                fornecedor.cidade,
                fornecedor.cnpj,
                fornecedor.endereco,
                fornecedor.telefone,
            ] 
            const resultado = await conexao.execute(sql, parametros)
            fornecedor.codigo = resultado[0].insertId
            
            await conexao.release()
        }
    }
    async editar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar()
            const sql = `
                UPDATE fornecedor
                SET nome_forn=?, cep_forn=?, cidade_forn=?, cnpj_forn=?, endereco_forn=?, telefone_forn=?
                WHERE codigo_forn = ?;`
            let parametros = [
                fornecedor.nome,
                fornecedor.cep,
                fornecedor.cidade,
                fornecedor.cnpj,
                fornecedor.endereco,
                fornecedor.telefone,
                fornecedor.codigo
            ]
            await conexao.execute(sql, parametros)
            await conexao.release()
        }
    }
    async consultar(termo) {
        //resuperar as linhas da tabela produto e transformá-las de volta em produtos
        const conexao = await conectar()
        let sql = ""
        let parametros = []
        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT *
                FROM fornecedor
                WHERE nome_forn LIKE ?;`
            parametros = ['%' + termo + '%']
        }
        else {
            sql = `
                SELECT *
                FROM fornecedor 
                WHERE codigo_forn = ?;`
            parametros = [termo]
        }
        const [linhas, campos] = await conexao.execute(sql, parametros)
        let listaFornecedores = []
        for (const linha of linhas) {
            const fornecedor = new Fornecedor(
                linha['codigo_forn'],
                linha['nome_forn'],
                linha['cep_forn'],
                linha['cidade_forn'],
                linha['cnpj_forn'],
                linha['endereco_forn'],
                linha['telefone_forn']
            )
            listaFornecedores.push(fornecedor)
        }
        await conexao.release()

        return listaFornecedores
    }
    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar()
            const sql = `
                DELETE
                FROM fornecedor
                WHERE codigo_forn = ?`
            let parametros = [
                fornecedor.codigo
            ]
            await conexao.execute(sql, parametros)
            await conexao.release()
        }
    }
}