function getUsername() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = firebase.auth().currentUser.uid;
            console.log("user uid is: " + uid);
            var userDir = "User/" + uid;
            var ref = firebase.database().ref(userDir);
            ref.once('value').then(function(snapshot) {
                var username = snapshot.val().username;
                document.getElementById("profile-username").innerHTML = username;
            });
        }
    });
}
