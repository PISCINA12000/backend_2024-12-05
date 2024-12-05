import Usuario from "../Modelo/usuario.js"
import conectar from "./Conexao.js"

export default class UsuarioDAO {
    constructor() {
        this.init()
    }

    async init() {
        try{
            const conexao = await conectar() //retorna uma conexão
            const sql = 
                `
                CREATE TABLE IF NOT EXISTS usuario(
                    codigo_user INT NOT NULL AUTO_INCREMENT,
                    nome_user VARCHAR(200) NOT NULL,
                    endereco_user VARCHAR(200) NOT NULL,
                    telefone_user VARCHAR(200) NOT NULL,

                    CONSTRAINT pk_usuario
                        PRIMARY KEY(codigo_user)
                );`
            await conexao.execute(sql)
            await conexao.release()
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message)
        }
    }

    async gravar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar()
            const sql = `
                INSERT INTO usuario(nome_user, endereco_user, telefone_user)
                    values(?,?,?);`
            let parametros = [
                usuario.nome,
                usuario.endereco,
                usuario.telefone
            ] 
            const resultado = await conexao.execute(sql, parametros)
            usuario.codigo = resultado[0].insertId
            await conexao.release()
        }
    }
    async editar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar()
            const sql = `
                UPDATE usuario SET nome_user=?, endereco_user=?, telefone_user=?
                    WHERE codigo_user = ?;`
            let parametros = [
                usuario.nome,
                usuario.endereco,
                usuario.telefone,
                usuario.codigo
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
                SELECT * FROM usuario
                   WHERE codigo_user LIKE ?;`
            parametros = ['%' + termo + '%']
        }
        else {
            sql = `
                SELECT * FROM usuario
                   WHERE codigo_user = ?;`
            parametros = [termo]
        }
        const [linhas, campos] = await conexao.execute(sql, parametros)
        let listaUsuarios = []
        for (const linha of linhas) {
            const usuario = new Usuario(
                linha['codigo_user'],
                linha['nome_user'],
                linha['endereco_user'],
                linha['telefone_user']
            )
            listaUsuarios.push(usuario)
        }
        await conexao.release()

        return listaUsuarios
    }
    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar()
            const sql = `
                DELETE
                FROM usuario
                WHERE codigo_user = ?;`
            let parametros = [
                usuario.codigo
            ]
            await conexao.execute(sql, parametros)
            await conexao.release()
        }
    }
}