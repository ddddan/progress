module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Progress'
        });
    });

    io.on('connection', function (socket) {
        console.log('Connected: ' + socket.id);
    });

    return router;
};
