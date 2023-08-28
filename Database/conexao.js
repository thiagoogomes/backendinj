import mysql from 'mysql2/promise';

export default async function conectar(){

    if(global.conexao && global.conexao.status != "disconnected"){
        return global.conexao;
    }


    const conexao = await mysql.createConnection({
        host:"127.0.0.1",
        user:"aluno41-pfsii",
        port: 3306,
        password:"xFQgCV2A5RP3n2lj31yb",
        database:"backendaluno41-pfsii"
    });

    
    global.conexao = conexao;

    return conexao;

}