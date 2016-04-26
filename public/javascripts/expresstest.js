var socket = io.connect();


function getProgress() {
    var eProg1 = document.getElementById('prog1');
    return parseInt(eProg1.getAttribute('value'));
}

function setProgress(val) {
    var eProg1 = document.getElementById('prog1');
    var max = eProg1.getAttribute('max');

    if (!val || !Number.isInteger(val) || val <= 0) {
        val = 0;
    } else if (val >= max) {
        val = max;
    }

    eProg1.setAttribute('value', val);
}

function start() {
    var progress = getProgress();
    var inc = Math.round(Math.random() * 5);

    setProgress(progress + inc);
}

function clear() {
    setProgress(0);
}


window.onload = function(){
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('clear').addEventListener('click', clear);
};
