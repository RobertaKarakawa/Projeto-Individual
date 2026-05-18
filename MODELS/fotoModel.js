var database = require("../database/config");

function salvarFoto(foto, idUsuario) {

    var instrucaoSql = `

        INSERT INTO fotoPerfil (foto, fkUsuario)
        VALUES ('${foto}', ${idUsuario})

        ON DUPLICATE KEY UPDATE
        foto = '${foto}';

    `;

    return database.executar(instrucaoSql);

}

function buscarFoto(idUsuario) {

    var instrucaoSql = `

        SELECT foto
        FROM fotoPerfil
        WHERE fkUsuario = ${idUsuario};

    `;

    return database.executar(instrucaoSql);

}

module.exports = {
    salvarFoto,
    buscarFoto
}