var express = require("express");

var router = express.Router();

var switchController =
require("../CONTROLLERS/switchController");


router.get("/melhorPreco",
function(req, res){

    switchController.melhorPreco(req, res);

});

router.get("/status/:idUsuario",
function(req, res){

    switchController.status(req, res);

});

module.exports = router;