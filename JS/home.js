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
    window.localStorage.setItem("isDone",'true');
    window.localStorage.setItem("isDelay",'false');
    var percentage = window.localStorage.getItem("percentage");
    percentage = parseInt(percentage) + 10;
    window.localStorage.setItem("percentage", percentage.toString());
    
    if (percentage == 100){
        document.location.reload();
    }else{
        startTime();
    }
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
    window.localStorage.setItem("isDone",'true');
    window.localStorage.setItem("isDelay",'true');
    startTime();
}

function startTime() {
    var d = new Date();
    var isDone = window.localStorage.getItem("isDone");
    var isDelay = window.localStorage.getItem("isDelay");
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid;
            var userDirName = "User/" + uid;
            var ref = firebase.database().ref(userDirName);
            ref.once('value').then(function(snapshot) {
                var hour = snapshot.val().durationHour;
                var min = snapshot.val().durationMin;
                var countdown  = parseInt(min) + parseInt(hour) * 60;
                if(isDelay == 'true'){
                    countdown = 10;
                }else{
                    countdown = parseInt(min) + parseInt(hour) * 60;
                }
                countdown = countdown * 60 * 1000;
                
                if(isDone === 'true'){
                    if (window.localStorage) {
                        window.localStorage.setItem("startedHour",d.getHours());
                        window.localStorage.setItem("startedMin",d.getMinutes());
                        window.localStorage.setItem("startedSec",d.getSeconds());
                        window.localStorage.setItem("isDone",'false');
                    }         
                      
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
                }else{
                    var startedHour = window.localStorage ? window.localStorage.getItem("startedHour") : '';
                    var startedMin = window.localStorage ? window.localStorage.getItem("startedMin") : '';
                    var startedSec = window.localStorage ? window.localStorage.getItem("startedSec") : '';
                    var currentTime = (d.getHours() - startedHour) * 60 + (d.getMinutes() - startedMin) + (d.getSeconds() - startedSec)/60;
                    countdown = countdown - (currentTime * 60 * 1000);
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
                
            });
        } else {
          console.log("error, user not sign in.");
        }
      }); 
}


function startExe(){
    document.getElementById("startExeOverlay").style.display = "block";
}

function doneStart() {
    document.getElementById("startExeOverlay").style.display = "none";
    window.localStorage.setItem("isDone",'true');
    window.localStorage.setItem("isDelay",'false');
    var per = parseInt(window.localStorage.getItem("percentage"));
    per = parseInt(per) + 10;
    window.localStorage.setItem("percentage",per.toString());
    
    document.location.reload();  
    
    
}

function logout(){
    window.localStorage.removeItem("isDone");
    window.localStorage.removeItem("isDelay");
    window.localStorage.removeItem("startedHour");
    window.localStorage.removeItem("startedMin");
    window.localStorage.removeItem("startedSec");
    firebase.auth().signOut();
    location.href='index.html';
}

function flip(){
    document.getElementById("progress-bar").style.display = "none";
}

function treeEarnedDone(){
    document.getElementById("treeEarnedOverlay").style.display = "none";
    document.location.reload();
}

function loadProgress(){
    $(".progress-bar").loading();
    var per = parseInt(window.localStorage.getItem("percentage"));
    setTimeout(function() { 
        if (per == 100){
            document.getElementById("treeEarnedOverlay").style.display = "block";
            per = 0;
            window.localStorage.setItem("percentage",per.toString());
        }
    }, 600);
}