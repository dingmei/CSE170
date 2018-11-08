function loadSavedTime() {
    //hour and min should changed after databse created
    document.getElementById("savedHour").innerHTML = "00";
    document.getElementById("savedMin").innerHTML = "30";
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