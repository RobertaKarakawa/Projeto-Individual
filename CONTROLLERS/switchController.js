var switchModel = require("../MODELS/switchModel");

function melhorPreco(req, res){

    switchModel.melhorPreco()

    .then(function(resultado){

        res.json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro.sqlMessage);

    });

}


function status(req, res){

    var idUsuario = req.params.idUsuario;

    switchModel.status(idUsuario)

    .then(function(resultado){

        res.json(resultado);

    })

    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro.sqlMessage);

    });

}

module.exports = {

    melhorPreco,
    status

}