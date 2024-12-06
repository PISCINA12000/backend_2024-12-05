import Privilegio from "../Modelo/privilegios.js"
import conectar from "./Conexao.js"

export default class PrivilegioDAO{

    constructor(){
        this.init()
    }

    async init(){
        try{
            const conexao = await conectar()
            const sql = `
                CREATE TABLE IF NOT EXISTS privilegio(
                    codigo_pvl INT NOT NULL AUTO_INCREMENT,
                    descricao_pvl VARCHAR(50) NOT NULL,

                    CONSTRAINT pk_privilegio
                        PRIMARY KEY(codigo_pvl)
                );`
            await conexao.execute(sql)
            await conexao.release()

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela privilegio!")
        }
    }

    async gravar(privilegio){
        if (privilegio instanceof Privilegio){
            const conexao = await conectar()
            const sql = `
                INSERT
                INTO privilegio(descricao_pv)
                    VALUES (?);`
            const parametros = [privilegio.descricao]
            const resultado = await conexao.execute(sql,parametros)
            privilegio.codigo = resultado[0].insertId
            await conexao.release()
        }
    }
    
    async editar(privilegio){
        if (privilegio instanceof Privilegio){
            const conexao = await conectar()
            const sql = `
                UPDATE privilegio
                SET descricao_pvl = ?
                WHERE codigo_pvl = ?;`
            const parametros = [privilegio.descricao, privilegio.codigo]
            await conexao.execute(sql,parametros)
            await conexao.release()
        }
    }

    async excluir(privilegio){
        if (privilegio instanceof Privilegio){
            const conexao = await conectar()
            const sql = `
                DELETE
                FROM privilegio
                WHERE codigo_pvl = ?;`
            const parametros = [privilegio.codigo]
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
                FROM privilegio
                WHERE descricao_pvl LIKE ?
                ORDER BY descricao_pvl;`
            parametros.push("%"+termo+"%")
        }
        else{
            sql = `
                SELECT *
                FROM privilegio
                WHERE codigo_pvl = ?;`
            parametros.push(termo)
        }
        const conexao = await conectar()
        const [registros, campos] = await conexao.query(sql, parametros)
        await conexao.release()
        let listaPrivilegios=[]

        for (const registro of registros){
            const privilegio = new Privilegio(
                registro['codigo_pvl'],
                registro['descricao_pvl']
            )
            listaPrivilegios.push(privilegio)
        }
        
        return listaPrivilegios
    }
}