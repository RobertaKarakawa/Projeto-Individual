var express = require("express");

var router = express.Router();

var jogosController = require("../CONTROLLERS/jogosController");

router.post("/salvar", function (req, res) {

    jogosController.salvar(req, res);

});

router.get("/listar/:idUsuario", function (req, res) {

    jogosController.listar(req, res);

});

module.exports = router;