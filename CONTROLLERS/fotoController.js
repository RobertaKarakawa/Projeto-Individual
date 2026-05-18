var fotoModel = require("../models/fotoModel");

function salvarFoto(req, res) {

    var foto = req.body.fotoServer;
    var idUsuario = req.body.idUsuarioServer;

    fotoModel.salvarFoto(foto, idUsuario)

    .then(function(resultado){
        res.json(resultado);
    })

    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro);
    });

}

function buscarFoto(req, res) {

    var idUsuario = req.params.idUsuario;

    fotoModel.buscarFoto(idUsuario)

    .then(function(resultado){
        res.json(resultado);
    })

    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro);
    });

}

module.exports = {
    salvarFoto,
    buscarFoto
}