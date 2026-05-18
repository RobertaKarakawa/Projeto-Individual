var express = require("express");
var router = express.Router();

var fotoController = require("../controllers/fotoController");

router.post("/salvarFoto", function(req, res) {
    fotoController.salvarFoto(req, res);
});

router.get("/buscarFoto/:idUsuario", function(req, res) {
    fotoController.buscarFoto(req, res);
});

module.exports = router;