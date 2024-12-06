import Categoria from "../Modelo/categoria.js"
import conectar from "./Conexao.js"

export default class CategoriaDAO{

    constructor(){
        this.init()
    }

    async init(){
        try{
            const conexao = await conectar()
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    codigo_cat INT NOT NULL AUTO_INCREMENT,
                    descricao_cat VARCHAR(50) NOT NULL,

                    CONSTRAINT pk_categoria
                        PRIMARY KEY(codigo_cat)
                );`
            await conexao.execute(sql)
            await conexao.release()

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela categoria!")
        }
    }

    async gravar(categoria){
        if (categoria instanceof Categoria){
            const conexao = await conectar()
            const sql = `
                INSERT
                INTO categoria(descricao_cat)
                    VALUES (?);`
            const parametros = [categoria.descricao]
            const resultado = await conexao.execute(sql,parametros)
            categoria.codigo = resultado[0].insertId
            await conexao.release()
        }
    }
    
    async editar(categoria){
        if (categoria instanceof Categoria){
            const conexao = await conectar()
            const sql = `
                UPDATE categoria
                SET descricao_cat = ?
                WHERE codigo_cat = ?;`
            const parametros = [categoria.descricao, categoria.codigo]
            await conexao.execute(sql,parametros)
            await conexao.release()
        }
    }

    async excluir(categoria){
        if (categoria instanceof Categoria){
            const conexao = await conectar()
            const sql = `
                DELETE
                FROM categoria
                WHERE codigo_cat = ?;`
            const parametros = [categoria.codigo]
            await conexao.execute(sql,parametros)
            await conexao.release()
        }
    }

    async consultar(termo){
        let sql = ""
        let parametros = []
        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT *
                FROM categoria
                WHERE descricao_cat LIKE ?
                ORDER BY descricao_cat;`
            parametros.push("%"+termo+"%")
        }
        else{
            sql = `
                SELECT *
                FROM categoria
                WHERE codigo_cat = ?;`
            parametros.push(termo)
        }
        const conexao = await conectar()
        const [registros, campos] = await conexao.query(sql, parametros)
        await conexao.release()
        let listaCategorias=[]

        for (const registro of registros){
            const categoria = new Categoria(
                registro['codigo_cat'],
                registro['descricao_cat']    
            )
            listaCategorias.push(categoria)
        }
        
        return listaCategorias
    }
}