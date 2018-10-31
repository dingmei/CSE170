
$(document).ready(function(){
    $("#sign-up").click(function(){
        $("#sign-up-console").show();
        $("#loginConsole").hide();
    });

    $("#sign-in").click(function(){
        $("#sign-up-console").hide();
        $("#loginConsole").show();
    });
});

function login(){

    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;


    //real backend
    //firebase.auth().signInWithEmailAndPassword(email,pass).then(function(){
    //  window.location.href="./IssueList.html";
    //});

    window.location.href="./home.html";
}
