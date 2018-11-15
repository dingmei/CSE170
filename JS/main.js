// Initialize Firebase
var config = {
  apiKey: "AIzaSyAiWIjeicshUn4lgra_0FBsgdtK8fREq0I",
  authDomain: "gogreen-d8743.firebaseapp.com",
  databaseURL: "https://gogreen-d8743.firebaseio.com",
  projectId: "gogreen-d8743",
  storageBucket: "gogreen-d8743.appspot.com",
  messagingSenderId: "431026737257"
};
firebase.initializeApp(config);

$(document).ready(function(){
    window.localStorage.setItem("percentage", "0");
    $("#sign-up").click(function(){
        $("#sign-up-console").show();
        $("#loginConsole").hide();
    });

    $("#sign-in").click(function(){
        $("#sign-up-console").hide();
        $("#loginConsole").show();
    });
});

function getCurrentUserUID(){
    var currentUser = firebase.auth().currentUser;
    if (currentUser != null){
        console.log("user id is: " + currentUser.uid);
        return currentUser.uid;
    }
    return -1;
}

function login(e){
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;
    firebase.auth().signInWithEmailAndPassword(email,pass).then(function(){
        window.localStorage.setItem("isDone",'true');
        window.localStorage.setItem("isDelay",'false');
        window.location.href="./home.html";
    }).catch(function(error) {
        alert("Your email/password is incorrect, please check!")
      });
}

function validationCheck(callback) {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!email || !username || !password) {
        alert("Please fill out all blanks!")
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            var newUID = getCurrentUserUID();
            var newUserDirName = "User/" + newUID;
            var ref = firebase.database().ref(newUserDirName);
            window.localStorage.setItem("isDone",'true');
            window.localStorage.setItem("isDelay",'false');
            window.localStorage.setItem("isNewUser",'true');
            console.log("ref is: " + ref);
            ref.set({
                username: username,
                plantedTrees: 0,
                durationHour: 0,
                durationMin:30,
                totalExerciseTime: 0,
                totalExerciseDistance: 0
            }).then(function() {
                callback();
            });
        });
    }
}
