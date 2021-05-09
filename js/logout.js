/*firebase.auth().onAuthStateChanged(function(user){
  if(user){
      //user is signed in
  }else{
      window.location.assign("index.html");
  }
});*/

function logout(){
    //window.location.replace("index.html");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Signed Out");
        window.location.assign("index.html");

      }).catch((error) => {
        // An error happened.
        alert(error);
      });
  }