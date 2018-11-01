function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$(document).ready(function(){
    var countdown = 30 * 60 * 1000;
    var timerId = setInterval(function(){
    countdown -= 1000;
    var min = Math.floor(countdown / (60 * 1000));
    var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);

    if (countdown <= 0) {
        clearInterval(timerId);
        countdown = 30 * 60 * 1000;
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
});