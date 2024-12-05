import Cliente from "../Modelo/cliente.js"

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json")
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome
            const endereco = requisicao.body.endereco
            const cidade = requisicao.body.cidade
            const cep = requisicao.body.cep

            if (nome && endereco && cidade && cep) {
                const cliente = new Cliente(0, nome, endereco, cidade, cep)
                cliente.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "cliente adicionado com sucesso!",
                            "codigo": cliente.codigo
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o cliente: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
                    }
                )
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "O cliente informado não existe!"
            })
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json")
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo
            const nome = requisicao.body.nome
            const endereco = requisicao.body.endereco
            const cidade = requisicao.body.cidade
            const cep = requisicao.body.cep

            if (codigo > 0 && nome && endereco && cidade && cep) {
                const cliente = new Cliente(codigo, nome, endereco, cidade, cep)

                cliente.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "cliente alterado com sucesso!",
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o cliente: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
                    }
                )
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            })
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json")
        if (requisicao.method == 'DELETE') {
            const codigo = requisicao.params.codigo

            if (codigo > 0) {
                const cliente = new Cliente(codigo)
                cliente.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "cliente excluído com sucesso!",
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o cliente: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um cliente conforme documentação da API."
                    }
                )
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json")
        if (requisicao.method == "GET") {
            let codigo = requisicao.params.codigo
            if (isNaN(codigo)) {
                codigo = ""
            }

            const cliente = new Cliente()
            cliente.consultar(codigo)
                .then((listaClientes) => {
                    resposta.status(200).json(listaClientes)
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar clientes: " + erro.message
                        }
                    )
                })
        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            )
        }
    }

}