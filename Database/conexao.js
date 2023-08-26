import mysql from 'mysql2/promise';

export default async function conectar(){

    if(global.conexao && global.conexao.status != "disconnected"){
        return global.conexao;
    }

    
    const conexao = await mysql.createConnection({
        host:"localhost",
        user:"aluno41-pfsii",
        port: 3306,
        password:"xFQgCV2A5RP3n2lj31yb",
        database:"injmusic-bd"
    });

    
    global.conexao = conexao;

    return conexao;

}