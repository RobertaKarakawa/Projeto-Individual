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

function listar(idUsuario) {

    var instrucaoSql = `
        SELECT *
        FROM biblioteca
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}



function ranking(){

    var instrucaoSql = `

        SELECT 
            jogo.nomeJogo,
            ROUND(AVG(biblioteca.nota), 1) AS mediaNota
        FROM biblioteca
        JOIN jogo
            ON biblioteca.fkJogo = jogo.idJogo
        WHERE biblioteca.nota IS NOT NULL
        GROUP BY jogo.idJogo
        ORDER BY mediaNota DESC
        LIMIT 5;

    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}


function favoritos(){

    var instrucaoSql = `

        SELECT 
            jogo.nomeJogo,
            COUNT(DISTINCT biblioteca.fkJogo) AS quantidadeFavoritos
        FROM biblioteca
        JOIN jogo
            ON biblioteca.fkJogo = jogo.idJogo
        WHERE biblioteca.favorito = true
        GROUP BY jogo.idJogo
        ORDER BY quantidadeFavoritos DESC
        LIMIT 10;

    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}


function maisJogados(){

    var instrucaoSql = `

        SELECT 
            jogo.nomeJogo,
            COUNT(biblioteca.fkJogo) AS quantidadeJogadores
        FROM biblioteca
        JOIN jogo
            ON biblioteca.fkJogo = jogo.idJogo
        WHERE biblioteca.statusJogo != 'Não iniciado'
        GROUP BY jogo.idJogo
        ORDER BY quantidadeJogadores DESC
        LIMIT 10;

    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}

function kpis(){

    var instrucaoSql = `

        SELECT

        -- MAIOR NOTA
        (
            SELECT jogo.nomeJogo
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            GROUP BY jogo.idJogo
            ORDER BY AVG(biblioteca.nota) DESC
            LIMIT 1
        ) AS jogoMaiorNota,

        (
            SELECT ROUND(AVG(biblioteca.nota), 1)
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            GROUP BY jogo.idJogo
            ORDER BY AVG(biblioteca.nota) DESC
            LIMIT 1
        ) AS valorMaiorNota,


        -- MAIS JOGADO
        (
            SELECT jogo.nomeJogo
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE statusJogo != 'Não iniciado'
            GROUP BY jogo.idJogo
            ORDER BY COUNT(DISTINCT biblioteca.fkUsuario) DESC
            LIMIT 1
        ) AS jogoMaisJogado,

        (
            SELECT COUNT(DISTINCT biblioteca.fkUsuario)
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE statusJogo != 'Não iniciado'
            GROUP BY jogo.idJogo
            ORDER BY COUNT(DISTINCT biblioteca.fkUsuario) DESC
            LIMIT 1
        ) AS valorMaisJogado,


        -- MAIS ZERADO
        (
            SELECT jogo.nomeJogo
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE statusJogo = 'Zerado'
            GROUP BY jogo.idJogo
            ORDER BY COUNT(*) DESC
            LIMIT 1
        ) AS jogoMaisZerado,

        (
            SELECT COUNT(*)
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE statusJogo = 'Zerado'
            GROUP BY jogo.idJogo
            ORDER BY COUNT(*) DESC
            LIMIT 1
        ) AS valorMaisZerado,


        -- MAIS PLATINADO
        (
            SELECT jogo.nomeJogo
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE statusJogo = 'Platinado'
            GROUP BY jogo.idJogo
            ORDER BY COUNT(*) DESC
            LIMIT 1
        ) AS jogoMaisPlatinado,

        (
            SELECT COUNT(*)
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE statusJogo = 'Platinado'
            GROUP BY jogo.idJogo
            ORDER BY COUNT(*) DESC
            LIMIT 1
        ) AS valorMaisPlatinado,


        -- FAVORITO DA COMUNIDADE
        (
            SELECT jogo.nomeJogo
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE favorito = true
            GROUP BY jogo.idJogo
            ORDER BY COUNT(*) DESC
            LIMIT 1
        ) AS jogoFavorito,

        (
            SELECT COUNT(*)
            FROM biblioteca
            JOIN jogo
                ON biblioteca.fkJogo = jogo.idJogo
            WHERE favorito = true
            GROUP BY jogo.idJogo
            ORDER BY COUNT(*) DESC
            LIMIT 1
        ) AS valorFavorito,


        -- NOVOS CADASTROS
        (
            SELECT COUNT(*)
            FROM usuario
            WHERE dataCadastro >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
        ) AS novosCadastros;

    `;

    console.log("Executando SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}


module.exports = {
    salvar,
    listar,
    ranking,
    favoritos,
    maisJogados,
    kpis
}
