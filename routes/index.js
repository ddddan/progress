module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    var debug = require('debug')('expresstest:app');

    // Update this when a stop message comes in
    var pauseMessage = false;

    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Progress'
        });
    });

    io.on('connection', function (socket) {
        console.log('Connected: ' + socket.id);

        socket.on("start", function (data) {
            var progress = data.progress;

            pauseMessage = false;

            debug('Start message received');

            // Set up a timer to periodically update the status
            var delay = Math.round(Math.random() * 1500) + 500;

            setTimeout(function updateProgress() {
                // Decide how much to advance the timer
                var increment = Math.round(Math.random() * 5) + 1;
                progress = progress + increment;

                // Signal the update
                debug('Sending update: ' + progress);

                socket.emit('update', {
                    newProgress: progress
                });

                if (!pauseMessage && progress < 100) {
                    delay = Math.round(Math.random() * 2500) + 500;


                    setTimeout(updateProgress, delay);
                }

            }, delay);

        });

        socket.on('pause', function () {
            debug('Pause message received');

            pauseMessage = true;
        });
    });

    return router;
};
