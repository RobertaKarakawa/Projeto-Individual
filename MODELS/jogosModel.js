var database = require("../DATABASE/config");

function salvar(idUsuario, idJogo, favorito, status, nota) {

    console.log(
        "ACESSEI O JOGOS MODEL \n\n" +
        "function salvar():",
        idUsuario,
        idJogo,
        favorito,
        status,
        nota
    );

    var instrucaoSql = `
        INSERT INTO biblioteca
        (fkUsuario, fkJogo, favorito, statusJogo, nota)

        VALUES
        ('${idUsuario}', '${idJogo}', ${favorito}, '${status}', ${nota})

        ON DUPLICATE KEY UPDATE

        favorito = ${favorito},
        statusJogo = '${status}',
        nota = ${nota};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    salvar
};