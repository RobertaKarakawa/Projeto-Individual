var database = require("../DATABASE/config")

function autenticar(email, senha) {

    console.log(
        "ACESSEI O USUARIO MODEL \n\n" +
        "function autenticar(): ",
        email,
        senha
    );

    var instrucaoSql = `
        SELECT idUsuario, nomeUsuario, email, senha
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {

    console.log(
        "ACESSEI O USUARIO MODEL \n\n" +
        "function cadastrar():",
        nome,
        email,
        senha
    );

    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};