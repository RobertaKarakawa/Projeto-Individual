var jogosModel = require("../MODELS/jogosModel");

function salvar(req, res) {

    var idUsuario = req.body.idUsuarioServer;
    var idJogo = req.body.idJogoServer;
    var favorito = req.body.favoritoServer;
    var status = req.body.statusServer;
    var nota = req.body.notaServer;

    if (idUsuario == undefined) {

        res.status(400).send("idUsuario está undefined!");

    } else if (idJogo == undefined) {

        res.status(400).send("idJogo está undefined!");

    } else {

        jogosModel.salvar(idUsuario, idJogo, favorito, status, nota)

            .then(

                function (resultado) {

                    res.json(resultado);

                }

            ).catch(

                function (erro) {

                    console.log(erro);

                    console.log(
                        "\nHouve um erro ao salvar o jogo! Erro: ",
                        erro.sqlMessage
                    );

                    res.status(500).json(erro.sqlMessage);

                }

            );
    }
}

function listar(req, res) {

    var idUsuario = req.params.idUsuario;

    jogosModel.listar(idUsuario)

        .then(

            function (resultado) {

                res.json(resultado);

            }

        ).catch(

            function (erro) {

                console.log(erro);

                res.status(500).json(erro.sqlMessage);

            }

        );
}


function ranking(req, res){

    jogosModel.ranking()
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function maisJogados(req, res){

    jogosModel.maisJogados()
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function favoritos(req, res){

    jogosModel.favoritos()
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function kpis(req, res){

    jogosModel.kpis()
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

module.exports = {
    salvar,
    listar,
    ranking,
    maisJogados,
    favoritos,
    kpis
}