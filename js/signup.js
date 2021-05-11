//Validate password
var password = document.getElementById("signupPass"),
confirm_password = document.getElementById("signupPassConfirm");

function validatePassword(){
  if(signupPass.value != signupPassConfirm.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } 
  else {
    confirm_password.setCustomValidity('');
  }
}
signupPass.onchange = validatePassword;
signupPassConfirm.onkeyup = validatePassword;


// JS for Password Visibility
// fa-eye fa-eye-slash
const togglePassword1 = document.querySelector("#togglePassword1");
const password1 = document.querySelector("#signupPass");

togglePassword1.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password1.getAttribute("type") === "password" ? "text" : "password";
  password1.setAttribute("type", type);
  // toggle the icon
  this.classList.toggle("fa-eye-slash");
});


//Authentication
  document.getElementById("signupForm").addEventListener('submit', regValidation)

  //validate reg no
  function regValidation(){
    var regNoCheck = document.getElementById("signupRegno").value;
    var n = regNoArr.includes(regNoCheck);
    var i = regNoArr.indexOf(regNoCheck);
    var emailCheck = document.getElementById("signupEmail").value;
    if (emailArr[i] == emailCheck){
        handleData();
    }
    else{
        alert("You are not a member of ADG");
    }
  }

  //Validate checkbox
  function handleData()
  {
      var form_data = new FormData(document.querySelector("form"));
      if(!form_data.has("langs[]"))
      {
        alert('Select atleast one team');
        return false;
      }
      else
      {
        //document.getElementById("chk_option_error").style.visibility = "hidden";
        authSignup();
        return true;
      }
  }
  function authSignup(){
    console.log("1");
      //Taking Values from Form
      let email = document.getElementById("signupEmail").value;
      let password = document.getElementById("signupPass").value;
      //Create User with Email and Password
      //var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
      /*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      alert(errorMessage);*/

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        //var user = userCredential.user;
        waitTime();
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
        // ..
      });
    // waitTime();
  }

function waitTime(){
    var delayInMilliseconds = 2000;
    setTimeout(function() {
      sendMail();
    }, delayInMilliseconds);
}

function sendMail(){
  console.log("mail");
  var user = firebase.auth().currentUser;
  console.log(user);
  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log("Sent");
  }).catch(function(error) {
    // An error happened.
    console.log("Not Sent");
  });
  userData();
}

  function userData(){
    console.log("2");
    var user = firebase.auth().currentUser;
    if (user != null){
       var userID = user.uid;
       /*user.sendEmailVerification().then(function() {
        // Email sent.
        console.log("sent");
      }).catch(function(error) {
        // An error happened.
        console.log("naah");
      });*/
    }
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let regNo = document.getElementById("signupRegno").value;
    let phone = document.getElementById("signupContact").value;
    let fcm = "";
    var x;
    let bestFuture = Boolean(x);
    var isAdmin = Boolean(x);
    var teamArr = [];
    $("input").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        teamArr.push(val);
      }
    });
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(fcm);
    console.log(bestFuture);
    console.log(isAdmin);
    console.log(userID);
    console.log(teamArr);
    writeUserData(userID, name, email, regNo, phone, fcm, bestFuture, isAdmin, teamArr);
  }

function writeUserData(userID, name, email, regNo, phone, fcm, bestFuture, isAdmin, teamArr){
  console.log("3");
  firebase.database().ref('Users/' + userID).set({
    uid: userID,
    name: name,
    email: email, 
    regNo: regNo, 
    phone: phone,
    fcm: fcm,
    bestFuture: bestFuture,
    isAdmin: isAdmin, 
    teams: teamArr
  });
  signOut();
}
function signOut(){
  console.log("Logged Out");
  firebase.auth().signOut();
  alert('A Verification Email has been sent');
  window.location.reload();
}

$("#signupForm").submit(function(e) {
  e.preventDefault();
});