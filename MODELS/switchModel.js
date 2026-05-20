var database = require("../database/config");

function melhorPreco() {

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


function status(idUsuario) {

    var instrucaoSql = `

        SELECT
        statusJogo,
        COUNT(*) AS quantidade
        FROM biblioteca
        WHERE fkUsuario = ${idUsuario}
        GROUP BY statusJogo

        UNION ALL

        SELECT
        'Não iniciado' AS statusJogo,
        (
            SELECT COUNT(*)
            FROM jogo
        )
        -
        (
            SELECT COUNT(*)
            FROM biblioteca
            WHERE fkUsuario = ${idUsuario}
        )
        AS quantidade;

    `;

    return database.executar(instrucaoSql);

}

module.exports = {

    melhorPreco,
    status

}