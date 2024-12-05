import Categoria from "../Modelo/categoria.js"

export default class CategoriaCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json")
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const descricao = requisicao.body.descricao

            if (descricao) {
                const categoria = new Categoria(0, descricao)
                categoria.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Categoria adicionada com sucesso!",
                            "codigo": categoria.codigo
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir a categoria: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de uma categoria conforme documentação da API."
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

    editar(requisicao, resposta) {
        resposta.type("application/json")
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo
            const descricao = requisicao.body.descricao

            if (codigo > 0 && descricao) {
                const categoria = new Categoria(codigo, descricao)
                categoria.editar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "categoria alterada com sucesso!",
                    })
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar a categoria: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de uma categoria conforme documentação da API."
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
                const categoria = new Categoria(codigo)
                categoria.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "categoria excluída com sucesso!",
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o categoria: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de uma categoria conforme documentação da API."
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

            const categoria = new Categoria()
            categoria.consultar(codigo)
                .then((listaCategorias) => {
                    resposta.status(200).json(listaCategorias)
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar categorias:" + erro.message
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