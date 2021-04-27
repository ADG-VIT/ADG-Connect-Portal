function logout(){
    //window.location.replace("index.html");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Signed Out");

      }).catch((error) => {
        // An error happened.
        alert(error);
      });
  }