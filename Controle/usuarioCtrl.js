import Usuario from "../Modelo/usuario.js"

export default class UsuarioCtrl{

    gravar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json")
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")){
            const nome  = requisicao.body.nome
            const endereco = requisicao.body.endereco
            const telefone = requisicao.body.telefone
            //pseudo validação
            if (nome && endereco && telefone)
            {
                const usuario = new Usuario(0, nome, endereco, telefone)
                usuario.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"usuario adicionado com sucesso!",
                        "codigo": usuario.codigo
                    })
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível incluir o usuario: " + erro.message
                    })
                })
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um usuario conforme documentação da API."
                    }
                )
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            })

        }

    }

    editar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json")
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo
            const nome  = requisicao.body.nome
            const endereco = requisicao.body.endereco
            const telefone = requisicao.body.telefone
            //pseudo validação
            if (codigo > 0 && nome && endereco && telefone)
            {
                //alterar a categoria
                const usuario = new Usuario(codigo, nome, endereco, telefone)
                usuario.editar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"usuario alterado com sucesso!",
                    })
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível alterar o usuario: " + erro.message
                    })
                })
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um usuario conforme documentação da API."
                    }
                )
            }
        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            })

        }
    }

    excluir(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json")
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE'){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo
            //pseudo validação
            if (codigo > 0)
            {
                const usuario = new Usuario(codigo)
                usuario.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"usuario excluído com sucesso!",
                    })
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível excluir o usuario: " + erro.message
                    })
                })
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe um código válido de uma categoria conforme documentação da API."
                    }
                )
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            })

        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json")
        if (requisicao.method=="GET"){
            let codigo = requisicao.params.codigo
            //evitar que código tenha valor undefined
            if (isNaN(codigo)){
                codigo = ""
            }

            const usuario = new Usuario()
            //método consultar retorna uma lista de categorias
            usuario.consultar(codigo)
            .then((listaUsuarios) =>{
                resposta.status(200).json(listaUsuarios)
            })
            .catch((erro) => {
                resposta.status(500).json(
                    {
                        "status":false,
                        "mensagem":"Erro ao consultar usuario:" + erro.message    
                    }
                )
            })

        }
        else
        {
            resposta.status(400).json(
                {
                    "status":false,
                    "mensagem":"Requisição inválida! Consulte a documentação da API."
                }
            )
        }
    }

}