var express = require("express");

var router = express.Router();

var jogosController = require("../CONTROLLERS/jogosController");

router.post("/salvar", function (req, res) {

    jogosController.salvar(req, res);

});

router.get("/listar/:idUsuario", function (req, res) {

    jogosController.listar(req, res);

});


router.get('/ranking', function(req, res){
    jogosController.ranking(req, res);
});

router.get('/maisJogados', function(req, res){
    jogosController.maisJogados(req, res);
});

router.get('/favoritos', function(req, res){
    jogosController.favoritos(req, res);
});

router.get('/kpis', function(req, res){
    jogosController.kpis(req, res);
});

module.exports = router;
