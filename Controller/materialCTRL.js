import Material from "../Model/material.js";

export default class MaterialCTRL {

    // requisiçao HTTP do tipo POST(GRAVAR)
    async gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;

            if (nome) {
                const material = new Material(nome);

                //grava no banco de dados
                //metodo assincrono -  then(entao)
                await material.gravar().then((resp) => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Material gravado com sucesso!",
                        id: resp,
                        material: material.toJSON()
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                })

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um material a ser gravado"
                })
            }


        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Metodo não permitido ou informaçao no formato JSON não fornecido"
            });
        }
    }

    // requisiçao HTTP do tipo GET(LER/CONSULTAR)
    consultar(requisicao, resposta) {
        resposta.type("application/json");
        let termo;
        if (requisicao.method === "GET") {
            
            const material = new Material();
            const id = requisicao.params.id;

            if (id != null) {
                termo = id;
            }
            //metodo assincrono -  then(entao)
            material.consultar(termo).then((dados) => {
                resposta.status(200).json(dados);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message

                });
            });
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Metodo não permitido ou informaçao no formato JSON não fornecido"
            });
        }

    }

    // requisiçao HTTP do tipo PUT(ATUALIZAR)
    async atualizar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const id = dados.id;
            if (nome) {
                const material = new Material(nome);
                material.id = id;
                //grava no banco de dados
                //metodo assincrono -  then(entao)
                material.atualizar().then((retorno) => {
                    let mensagemFinal;
                    if (retorno > 0) {
                        mensagemFinal = "Material atualizado com sucesso!";
                    } else {
                        mensagemFinal = "ID não encontrado!";
                    }
                    resposta.status(200).json({
                        status: true,
                        mensagem: mensagemFinal,
                        affectedRows: retorno
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });

            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um material a ser gravado"
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Metodo não permitido ou informaçao no formato JSON não fornecido"
            });
        }
    }

    // requisiçao HTTP do tipo DELETE(EXCLUIR)
    async excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;

            if (id) {
                // grava as informaçoes
                const material = new Material();
                material.id = id;
                //Remove no banco de dados
                //metodo assincrono -  then(entao)
                material.excluir().then((retorno) => {
                    let mensagemFinal;
                    if (retorno > 0) {
                        mensagemFinal = "Material excluído com sucesso!";
                    } else {
                        mensagemFinal = "ID não encontrado!";
                    }
                    resposta.status(200).json({
                        status: true,
                        mensagem: mensagemFinal,
                        affectedRows: retorno
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de uma material a ser excluída"
                })
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Metodo não permitido ou informaçao no formato JSON não fornecido"
            });
        }

    }


}
