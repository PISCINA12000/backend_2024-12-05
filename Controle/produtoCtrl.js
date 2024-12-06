import Produto from "../Modelo/produto.js"
import Categoria from "../Modelo/categoria.js"
import Fornecedor from "../Modelo/fornecedor.js"

export default class ProdutoCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json")
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const descricao = requisicao.body.descricao
            const precoCusto = requisicao.body.precoCusto
            const precoVenda = requisicao.body.precoVenda
            const qtdEstoque = requisicao.body.qtdEstoque
            const urlImagem = requisicao.body.urlImagem
            const dataValidade = requisicao.body.dataValidade
            const categoria = requisicao.body.categoria
            const fornecedor = requisicao.body.fornecedor

            const categ = new Categoria(categoria.codigo)
            const forn = new Fornecedor(fornecedor.codigo)

            categ.consultar(categoria.codigo).then((listaCategorias) => {
                if (listaCategorias.length > 0) {
                    //pseudo validação
                    forn.consultar(fornecedor.codigo).then((listaFornecedores) => {
                        if (listaFornecedores.length > 0) {
                            if (descricao && precoCusto > 0 && precoVenda > 0 && qtdEstoque >= 0 && urlImagem && dataValidade && categoria.codigo > 0 && fornecedor.codigo > 0) {
                                const pruduto = new Produto(0, descricao, precoCusto, precoVenda, qtdEstoque, urlImagem, dataValidade, categ, forn)
                                pruduto.incluir()
                                    .then(() => {
                                        resposta.status(200).json({
                                            "status": true,
                                            "mensagem": "Produto adicionado com sucesso!",
                                            "codigo": pruduto.codigo
                                        })
                                    })
                                    .catch((erro) => {
                                        resposta.status(500).json({
                                            "status": false,
                                            "mensagem": "Não foi possível incluir o produto: " + erro.message
                                        })
                                    })
                            }
                            else {
                                resposta.status(400).json(
                                    {
                                        "status": false,
                                        "mensagem": "Informe corretamente todos os dados de um produto conforme documentação da API"
                                    }
                                )
                            }

                        }
                        else {
                            resposta.status(400).json({
                                "status": false,
                                "mensagem": "o fornecedor informado não existe!"
                            })
                        }
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível validar o fornecedor" + erro.message
                        })

                    })
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "A categoria informada não existe!"
                    })
                }


            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
                })
            })
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
            const precoCusto = requisicao.body.precoCusto
            const precoVenda = requisicao.body.precoVenda
            const qtdEstoque = requisicao.body.qtdEstoque
            const urlImagem = requisicao.body.urlImagem
            const dataValidade = requisicao.body.dataValidade
            const categoria = requisicao.body.categoria
            const fornecedor = requisicao.body.fornecedor
            
            const categ = new Categoria(categoria.codigo)
            const forn = new Fornecedor(fornecedor.codigo)

            categ.consultar(categoria.codigo).then((listaCategorias) => {
                if (listaCategorias.length > 0) {
                    forn.consultar(fornecedor.codigo).then((listaFornecedores) => {
                        if (listaFornecedores.length > 0) {
                            if (codigo > 0 && descricao && precoCusto > 0 && precoVenda > 0 && qtdEstoque >= 0 && urlImagem && dataValidade && categoria.codigo > 0 && fornecedor.codigo > 0) {
                                const pruduto = new Produto(codigo, descricao, precoCusto, precoVenda, qtdEstoque, urlImagem, dataValidade, categ, forn)

                                pruduto.alterar()
                                    .then(() => {
                                        resposta.status(200).json({
                                            "status": true,
                                            "mensagem": "Produto alterado com sucesso!",
                                            "codigo": pruduto.codigo
                                        })
                                    })
                                    .catch((erro) => {
                                        resposta.status(500).json({
                                            "status": false,
                                            "mensagem": "Não foi possível alterar o produto: " + erro.message
                                        })
                                    })
                            }
                            else {
                                resposta.status(400).json(
                                    {
                                        "status": false,
                                        "mensagem": "Informe corretamente todos os dados de um produto conforme documentação da API"
                                    }
                                )
                            }
                        }
                        else {
                            resposta.status(400).json({
                                "status": false,
                                "mensagem": "o fornecedor informado não existe!"
                            })
                        }
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível validar o fornecedor" + erro.message
                        })
                    })
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "A categoria informada não existe!"
                    })
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
                })
            })
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
                const produto = new Produto(codigo)

                produto.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Produto excluído com sucesso!",
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o produto: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um produto conforme documentação da API."
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

            const produto = new Produto()

            produto.consultar(codigo)
                .then((listaProdutos) => {
                    resposta.status(200).json(listaProdutos)
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar produtos: " + erro.message
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