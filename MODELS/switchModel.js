var database = require("../database/config");

function melhorPreco(){

    var instrucaoSql = `

        SELECT
        nome,
        site,
        precoSwitch AS preco
        FROM loja
        ORDER BY precoSwitch ASC;

    `;

    return database.executar(instrucaoSql);

}


function status(idUsuario){

    var instrucaoSql = `

        SELECT
        statusJogo,
        COUNT(*) AS quantidade
        FROM biblioteca
        WHERE fkUsuario = ${idUsuario}
        GROUP BY statusJogo;

    `;

    return database.executar(instrucaoSql);

}

module.exports = {

    melhorPreco,
    status

}