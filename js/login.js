// JS for Password Visibility
// fa-eye fa-eye-slash
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#loginPass");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the icon
  this.classList.toggle("fa-eye-slash");
});

var adminId;

//Authentication - Firebase - Login 
const auth = firebase.auth();

document.getElementById("signinForm").addEventListener('submit', login);

function login(){
  console.log("1");
    var ref = firebase.database().ref().child("Users");
    var loginID = document.getElementById("loginID").value;
    var loginPass = document.getElementById("loginPass").value;

    firebase.auth().signInWithEmailAndPassword(loginID, loginPass)
          .then((userCredential) => {
            // Signed in
            //var user = userCredential.user;
            ref.orderByChild("email").equalTo(loginID).on("child_added", function(snapshot) {
              console.log(snapshot.key);
              console.log(snapshot.val().isAdmin);
              var admin = snapshot.val().isAdmin;
              if (admin == true){
                alert("Signed in Successfully");
                console.log("redirect");
                window.location.assign("newmeet.html");
                //adminId = user.uid;
                //...
              }
              else if (admin == false){
                console.log("3");
                firebase.auth().signOut();
                window.location.assign("jrlogin.html");
              }
            });
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
          });
        }
   
auth.onAuthStateChanged(function(user){
    if(user){
        var ref = firebase.database().ref().child("Users");
        var loginID = document.getElementById("loginID").value;
        ref.orderByChild("email").equalTo(loginID).on("child_added", function(snapshot) {
        console.log(snapshot.key);
        console.log(snapshot.val().isAdmin);
        var admin = snapshot.val().isAdmin;
        if (admin == true){
          console.log("redirect");
          window.location.assign("newmeet.html");
          var adminId = user.uid;
          //...
        }
    });
  }
    else{   
        //alert("User not found");
        //no user is signed in
    }
});

/*
firebase.auth().onAuthStateChanged(function(user){
  if(user){
      //user is signed in
  }else{
      window.location.assign("index.html");
  }
});
*/
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

/*
  // var admin = firebase.auth().currentUser;
  // if (admin != null){
  //   adminId = admin.uid;
  //   console.log("Hi");
  // }
  // console.log(adminId);
  var name;
  var ref = firebase.database().ref("Users/" + adminId);
      ref.once("value")
      .then(function(snapshot) {
      name = snapshot.child("name").val();
      console.log("User Name");
      });
  console.log(name);
  //var name = "Anmol Bansal";
  var initials = name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
  console.log(initials);
*/

$("#signinForm").submit(function(e) {
  e.preventDefault();
});