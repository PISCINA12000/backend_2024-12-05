import Produto from "../Modelo/produto.js"
import Categoria from "../Modelo/categoria.js"
import Fornecedor from "../Modelo/fornecedor.js"
import conectar from "./Conexao.js"

export default class ProdutoDAO {
    constructor() {
        this.init()
    }

    async init() {
        try 
        {
            const conexao = await conectar()
            const sql = `
            CREATE TABLE IF NOT EXISTS produto(
                codigo_prod INT NOT NULL AUTO_INCREMENT,
                descricao_prod VARCHAR(200) NOT NULL,
                precoCusto_prod DECIMAL(10,2) NOT NULL,
                precoVenda_prod DECIMAL(10,2) NOT NULL,
                qtdEstoque_prod INT NOT NULL DEFAULT 0,
                urlImagem_prod VARCHAR(250),
                dataValidade_prod VARCHAR(250) NOT NULL,
                codigo_cat INT NOT NULL,
                codigo_forn INT NOT NULL,

                CONSTRAINT pk_produto
                    PRIMARY KEY(codigo_prod),
                CONSTRAINT fk_categoria
                    FOREIGN KEY(codigo_cat)
                    REFERENCES categoria(codigo_cat),
                CONSTRAINT fk_fornecedor
                    FOREIGN KEY(codigo_forn)
                    REFERENCES fornecedor(codigo_forn) 
            );`
            await conexao.execute(sql)
            await conexao.release()
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message)
        }
    }

    async incluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar()
            const sql = `
                INSERT
                INTO
                    produto(
                        descricao_prod,
                        precoCusto_prod,
                        precoVenda_prod,
                        qtdEstoque_prod,
                        urlImagem_prod,
                        dataValidade_prod,
                        codigo_cat,
                        codigo_forn
                    ) values(?,?,?,?,?,?,?,?);`
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.categoria.codigo,
                produto.fornecedor.codigo
            ]
            const resultado = await conexao.execute(sql, parametros)
            produto.codigo = resultado[0].insertId
            await conexao.release()
        }
    }
    async alterar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar()
            const sql = `
                UPDATE produto
                SET
                    descricao_prod = ?,
                    precoCusto_prod = ?,
                    precoVenda_prod = ?,
                    qtdEstoque_prod = ?,
                    urlImagem_prod = ?,
                    dataValidade_prod = ?,
                    codigo_cat = ?,
                    codigo_forn = ?
                WHERE prod_codigo = ?;`
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.categoria.codigo,
                produto.fornecedor.codigo,
                produto.codigo
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
                FROM produto p
                INNER JOIN categoria c ON p.codigo_cat = c.codigo_cat
                INNER JOIN fornecedor f ON p.codigo_forn = f.codigo_forn
                WHERE descricao_prod LIKE ?;`
            parametros = ['%' + termo + '%']
        }
        else {
            sql = `
                SELECT *
                FROM produto p
                INNER JOIN categoria c ON p.codigo_cat = c.codigo_cat
                INNER JOIN fornecedor f ON p.codigo_forn = f.codigo_forn
                WHERE codigo_prod = ?;`
            parametros = [termo]
        }
        const [linhas, campos] = await conexao.execute(sql, parametros)
        let listaProdutos = []
        for (const linha of linhas) {
            const categoria = new Categoria(
                linha['codigo_cat'],
                linha['descricao_cat']
            )   
            const fornecedor = new Fornecedor(
                linha['codigo_forn'],
                linha['nome_forn'],
                linha['cep_forn'],
                linha['cidade_forn'],
                linha['cnpj_forn'],
                linha['endereco_forn'],
                linha['telefone_forn']
            )
            const produto = new Produto(
                linha['codigo_prod'],
                linha['descricao_prod'],
                linha['precoCusto_prod'],
                linha['precoVenda_prod'],
                linha['qtdEstoque_prod'],
                linha['urlImagem_prod'],
                linha['dataValidade_prod'],
                categoria,
                fornecedor
            )
            listaProdutos.push(produto)
        }
        await conexao.release()

        return listaProdutos
    }
    async excluir(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar()
            const sql = `
                DELETE
                FROM produto
                WHERE codigo_prod = ?;`
            let parametros = [
                produto.codigo
            ]
            await conexao.execute(sql, parametros)
            await conexao.release()
        }
    }
}