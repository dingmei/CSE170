function login(){

    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;


    //real backend
    //firebase.auth().signInWithEmailAndPassword(email,pass).then(function(){
    //  window.location.href="./IssueList.html";
    //});

    window.location.href="./home.html";
}
