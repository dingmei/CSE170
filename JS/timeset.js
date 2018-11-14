function loadSavedTime() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid;
            var userDirName = "User/" + uid;
            var ref = firebase.database().ref(userDirName);
            ref.once('value').then(function(snapshot) {
                var hour = snapshot.val().durationHour;
                var min = snapshot.val().durationMin;
                if(min < 10 & min.toString().length == 1){
                    min = "0" + min;
                }
                document.getElementById("savedHour").innerHTML = hour;
                document.getElementById("savedMin").innerHTML = min;
            });
        } else {
          console.log("error, user not sign in.");
        }
      }); 
    
}

function changeHour(direction){
    //1 is up 0 is down
    var hour = document.getElementById("savedHour").innerHTML;
    if(direction){
        if(hour < 1)
            hour++;
    }else{
        if(hour != 0){
            hour--;
        }
    }
    document.getElementById("savedHour").innerHTML = hour;
}

function changeMin(direction){
    //1 is up 0 is down
    var min = document.getElementById("savedMin").innerHTML;
    if(direction){
        if(min < 59)
            min++;
        else
            min = 0;
    }else{
        if(min > 0){
            min--;
        }else
            min = 59;
    }
    if(min < 10 & min.toString().length == 1){
        min = "0" + min;
    }
    document.getElementById("savedMin").innerHTML = min;
}

function setTime(){
    var hour = document.getElementById("savedHour").innerHTML;
    var min = document.getElementById("savedMin").innerHTML;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid;
            var userDirName = "User/" + uid;
            var ref = firebase.database().ref(userDirName);
            var updates = { durationHour:hour, durationMin:min};
            ref.update(updates);
            document.getElementById("timeSetOverlay").style.display = "block";
        } else {
          console.log("error, user not sign in.");
        }
      }); 
}

function timeSetDone(){
    document.getElementById("timeSetOverlay").style.display = "none";
    document.location.href = "home.html";
}

function resetTime(){
    loadSavedTime();
}