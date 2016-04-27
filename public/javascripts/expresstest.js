var socket = io.connect();

socket.on('update', function (data) {
    var newProgress = data.newProgress;
    setProgress(newProgress);
});


function getProgress() {
    var eProg1 = document.getElementById('prog1');
    return parseInt(eProg1.value);
}

function setProgress(val) {
    var eProg1 = document.getElementById('prog1');
    var eStart = document.getElementById('start');
    var max = eProg1.getAttribute('max');

    if (!val || !Number.isInteger(val) || val <= 0) {
        val = 0;
        eStart.disabled = false;
        updateButton(eStart, 'Start');
    } else if (val >= max) {
        val = max;
        eStart.disabled = true;
        updateButton(eStart, 'Start');
    }

    eProg1.value = val;
}

function localStart() {
    var progress = getProgress();
    var inc = Math.round(Math.random() * 5);

    setProgress(progress + inc);
}

function updateButton(eButton, newText) {
    eButton.value = newText;
    eButton.innerHTML = newText;
}

function toggleStart(evt) {
    var progress = getProgress();

    var eStart = evt.target;
    var buttonState = eStart.getAttribute('value');

    if (buttonState === 'Start') {

        // Send a signal to the app to begin
        socket.emit('start', {
            progress: progress
        });

        updateButton(eStart, 'Pause');

    } else {
        // Send a signal to the app to pause
        socket.emit('pause');

        updateButton(eStart, 'Start');

    }
}

function clear() {
    setProgress(0);
}


window.onload = function () {
    var eStart = document.getElementById('start');
    eStart.value = 'Start';
    eStart.addEventListener('click', toggleStart);

    document.getElementById('clear').addEventListener('click', clear);
};
