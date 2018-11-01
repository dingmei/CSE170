function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function go() {
    document.getElementById("countdownOverlay").style.display = "none";
    setTimeout(function() { goSuc() }, 5000);
}

function goSuc() {
    document.getElementById("successOverlay").style.display = "block";
}

function done() {
    document.getElementById("successOverlay").style.display = "none";
    startTime(30);
}

function never() {
    document.getElementById("countdownOverlay").style.display = "none";
    goFail();
}

function goFail() {
    document.getElementById("failOverlay").style.display = "block";
}

function gotIt() {
    document.getElementById("failOverlay").style.display = "none";
    startTime(10);
}

function startTime(countdown) {
    countdown = countdown * 60 * 1000;
    var timerId = setInterval(function(){
    countdown -= 1000;
    var min = Math.floor(countdown / (60 * 1000));
    var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);

    if (countdown <= 0) {
        document.getElementById("countdownOverlay").style.display = "block";
        clearInterval(timerId);
        
    } else {
        
        if(min < 10){
            min = "0" + min;
        }
        if(sec < 10){
            sec = "0" + sec;
        }
        $("#timer").html(min + " : " + sec);
        
        
    }
    }, 1000);
}
$(document).ready(startTime(0.1));