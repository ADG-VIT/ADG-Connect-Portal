//Validate password

function checkPasswordMatch() {
  var password = $("#signupPass").val();
  var confirmPassword = $("#signupPassConfirm").val();

  if (password != confirmPassword)
      $("#divCheckPasswordMatch").html("Passwords do not match!");
  else
      $("#divCheckPasswordMatch").html("");
}

$(document).ready(function () {
 $("#signupPassConfirm").keyup(checkPasswordMatch);
 $("#signupPass").keyup(checkPasswordMatch);
});

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
    document.getElementById("sign-up").innerHTML = "Signing Up...";
    var regNoCheck = document.getElementById("signupRegno").value;
    var n = regNoArr.includes(regNoCheck);
    var i = regNoArr.indexOf(regNoCheck);
    var emailCheck = document.getElementById("signupEmail").value;
    if (emailArr[i] == emailCheck){
        handleData();
    }
    else{
        alert("You are not a member of ADG");
        document.getElementById("sign-up").innerHTML = "Sign Up";
    }
  }

  //Validate checkbox
  function handleData()
  {
      var form_data = new FormData(document.querySelector("form"));
      if(!form_data.has("langs[]"))
      {
        alert('Select atleast one team');
        document.getElementById("sign-up").innerHTML = "Sign Up";
        return false;
      }
      else
      {
        //document.getElementById("chk_option_error").style.visibility = "hidden";
        createUser();
        return true;
      }
  }
  function authSignup(){
    console.log("1");
    return new Promise(function(resolve, reject){
      //Taking Values from Form
      let email = document.getElementById("signupEmail").value;
      let password = document.getElementById("signupPass").value;
  
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log("auth done");
        //waitTime();
        resolve();
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
        document.getElementById("sign-up").innerHTML = "Sign Up";
        // ..
      });
    })
  }

function waitTime(){
    var delayInMilliseconds = 2000;
    setTimeout(function() {
      createUser();
    }, delayInMilliseconds);
}

  var userID;
  let username;
  let email;
  let regno;
  let fcm;
  let os;
  var x;
  let bestFuture;
  var isAdmin;
  var teamArr;
  function userData(){
    console.log("2");
    return new Promise(function(resolve, reject){
      var user = firebase.auth().currentUser;
      
      if (user != null){
        userID = user.uid;
      }
      username = document.getElementById("signupName").value;
      email = document.getElementById("signupEmail").value;
      regNo = document.getElementById("signupRegno").value;
      phone = document.getElementById("signupContact").value;
      fcm = "";
      os = "";
      position ="";
      bestFuture = Boolean(x);
      isAdmin = Boolean(x);
      teamArr = [];
      $("input").each(function(index, el) {
        if (el.checked) {
          var val = $(el).data("value");
          teamArr.push(val);
        }
      });
      console.log(username);
      console.log(email);
      console.log(phone);
      console.log(fcm);
      console.log(bestFuture);
      console.log(isAdmin);
      console.log(userID);
      console.log(teamArr);
      resolve(userID, username, email, regNo, phone, fcm, os, position, bestFuture, isAdmin, teamArr)
    }) 
    //writeUserData(userID, name, email, regNo, phone, fcm, os, position, bestFuture, isAdmin, teamArr);
  }

function writeUserData(userID, username, email, regNo, phone, fcm, os, position, bestFuture, isAdmin, teamArr){
  console.log("3");
  console.log(username);
  console.log(email);
  console.log(phone);
  console.log(fcm);
  console.log(bestFuture);
  console.log(isAdmin);
  console.log(userID);
  console.log(teamArr);
  return new Promise(function(resolve, reject){
    // var data;
    firebase.database().ref('Users/' + userID).set({
      uid: userID,
      name: username,
      email: email, 
      regNo: regNo, 
      phone: phone,
      fcm: fcm,
      os: os,
      position: position,
      bestFuture: bestFuture,
      isAdmin: isAdmin, 
      teams: teamArr
    }
    );
    resolve();
    
  })
  //signOut();
}

function signOut(){
    firebase.auth().signOut();
    console.log("Logged Out");
    // alert("An email has been sent for verification");
    //window.location("instructions.html");
    //window.location.reload();
}

function sendMail(){
  console.log("mail");
  return new Promise(function(resolve, reject){
    var user = firebase.auth().currentUser;
    console.log(user);
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log("Sent");
      resolve();
    }).catch(function(error) {
      // An error happened.
      console.log("Not Sent");
    });
    
  })
}

async function createUser(){
  await authSignup();
  await userData();
  await writeUserData(userID, username, email, regNo, phone, fcm, os, position, bestFuture, isAdmin, teamArr);
  await sendMail();
  signOut();
  document.getElementById("sign-up").innerHTML = "Sign Up";
  alert("A verification email has been sent. Verify your email to Login");
  window.location.reload();
}

$("#signupForm").submit(function(e) {
  e.preventDefault();
});