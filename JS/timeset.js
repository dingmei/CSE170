function loadSavedTime() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid;
            var userDirName = "User/" + uid;
            var ref = firebase.database().ref(userDirName);
            ref.once('value').then(function(snapshot) {
                var hour = snapshot.val().durationHour;
                var min = snapshot.val().durationMin;
                if(hour < 10 & hour > 0){
                    hour = "0" + hour;
                }
                if(hour == 0){
                    hour = "00";
                }
                if(min < 10 & min > 0){
                    min = "0" + min;
                }
                if(min == 0){
                    min = "00";
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
        hour++;
    }else{
        if(hour != 0){
            hour--;
        }
    }
    if(hour < 10 & hour > 0){
        hour = "0" + hour;
    }
    if(hour == 0){
        hour = "00";
    }
    document.getElementById("savedHour").innerHTML = hour;
}

function changeMin(direction){
    //1 is up 0 is down
    var min = document.getElementById("savedMin").innerHTML;
    if(direction){
        min++;
    }else{
        if(min != 0){
            min--;
        }
    }
    if(min < 10 & min > 0){
        min = "0" + min;
    }
    if(min == 0){
        min = "00";
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

function confirm(x) {
    //0 is no 1 is yes
}