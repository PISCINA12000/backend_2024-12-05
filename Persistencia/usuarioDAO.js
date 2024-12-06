import Usuario from "../Modelo/usuario.js"
import conectar from "./Conexao.js"

export default class UsuarioDAO {
    constructor() {
        this.init()
    }

    async init() {
        try{
            const conexao = await conectar() //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario(
                    codigo_user INT NOT NULL AUTO_INCREMENT,
                    nome_user VARCHAR(200) NOT NULL,
                    endereco_user VARCHAR(200) NOT NULL,
                    telefone_user VARCHAR(200) NOT NULL,
                    codigo_pvl INT NOT NULL,

                    CONSTRAINT pk_usuario
                        PRIMARY KEY (codigo_user),
                    CONSTRAINT fk_privilegio
                        FOREIGN KEY (codigo_pvl) REFERENCES privilegio (codigo_pvl)
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
                INSERT
                INTO usuario(nome_user, endereco_user, telefone_user, codigo_pvl)
                    values(?,?,?,?);`
            let parametros = [
                usuario.nome,
                usuario.endereco,
                usuario.telefone,
                usuario.privilegio.codigo
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
                UPDATE usuario
                SET nome_user=?, endereco_user=?, telefone_user=?, codigo_pvl=?
                WHERE codigo_user = ?;`
            let parametros = [
                usuario.nome,
                usuario.endereco,
                usuario.telefone,
                usuario.privilegio.codigo,
                usuario.codigo
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
                FROM usuario
                WHERE nome_user LIKE ?
                ORDER BY nome_user;`
            parametros = ['%' + termo + '%']
        }
        else {
            sql = `
                SELECT *
                FROM usuario
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
                linha['telefone_user'],
                linha['codigo_pvl']
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