import express from 'express'
import rotaProduto from './Rotas/rotaProdutos.js'
import cors from 'cors'
import dotenv from 'dotenv'
import rotaCategoria from './Rotas/rotaCategoria.js'
import rotaFornecedor from './Rotas/rotaFornecedor.js'

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

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
})