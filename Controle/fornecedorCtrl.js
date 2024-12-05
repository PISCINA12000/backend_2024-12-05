import Fornecedor from "../Modelo/fornecedor.js"

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json")
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome
            const cep = requisicao.body.cep
            const cidade = requisicao.body.cidade
            const cnpj = requisicao.body.cnpj
            const endereco = requisicao.body.endereco
            const telefone = requisicao.body.telefone
            //pseudo validação
            if (nome && cnpj && cidade && cep && endereco && telefone) {
                const fornecedor = new Fornecedor(0, nome, cep, cidade, cnpj, endereco, telefone)
                fornecedor.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor adicionada com sucesso!",
                            "codigo": fornecedor.codigo
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
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
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json")
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo
            const nome = requisicao.body.nome
            const cep = requisicao.body.cep
            const cidade = requisicao.body.cidade
            const cnpj = requisicao.body.cnpj
            const endereco = requisicao.body.endereco
            const telefone = requisicao.body.telefone
            //pseudo validação
            if (codigo > 0 && nome && cep && cidade && cnpj && endereco && telefone) {
                //alterar a categoria
                const fornecedor = new Fornecedor(codigo, nome, cep, cidade, cnpj, endereco, telefone)
                fornecedor.editar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "fornecedor alterado com sucesso!",
                    })
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                        })
                    })
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
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
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json")
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE') {
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo
            //pseudo validação
            if (codigo > 0) {

                const fornecedor = new Fornecedor(codigo)
                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "fornecedor excluída com sucesso!",
                        })
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
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
            //evitar que código tenha valor undefined
            if (isNaN(codigo)) {
                codigo = ""
            }

            const fornecedor = new Fornecedor()
            //método consultar retorna uma lista de categorias
            fornecedor.consultar(codigo)
                .then((listaFornecedor) => {
                    resposta.status(200).json(listaFornecedor
                    )
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar fornecedor:" + erro.message
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