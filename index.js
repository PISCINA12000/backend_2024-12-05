import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rotaProduto from './Rotas/rotaProdutos.js'
import rotaCategoria from './Rotas/rotaCategoria.js'
import rotaFornecedor from './Rotas/rotaFornecedor.js'
import rotaUsuario from './Rotas/rotaUsuario.js'
import rotaCliente from './Rotas/rotaCliente.js'
import rotaPrivilegio from './Rotas/rotaPrivilegios.js'

dotenv.config()

const host = "0.0.0.0"
const porta = 4000
const app = express()

app.use(express.json())
app.use(cors({
    "origin":"*",
    "Access-Control-Allow-Origin":'*'
}))
app.use(express.static('./publico'))
app.use("/produto",rotaProduto)
app.use("/categoria",rotaCategoria)
app.use("/fornecedor", rotaFornecedor)
app.use("/usuario", rotaUsuario)
app.use("/cliente", rotaCliente)
app.use("/privilegios", rotaPrivilegio)

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
})