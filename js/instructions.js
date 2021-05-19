console.log("1");

//Loader
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
          "body").style.visibility = "hidden";
        document.querySelector(
          "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
          "#loader").style.display = "none";
        document.querySelector(
          "body").style.visibility = "visible";
    }
  };

//Validate password

function checkPasswordMatch() {
  var password = $("#newPass").val();
  var confirmPassword = $("#newPassword").val();

  if (password != confirmPassword)
      $("#divCheckPasswordMatch").html("Passwords do not match!");
  else
      $("#divCheckPasswordMatch").html("");
}

$(document).ready(function () {
 $("#newPassword").keyup(checkPasswordMatch);
 $("#newPass").keyup(checkPasswordMatch);
});

// JS for Password Visibility
// fa-eye fa-eye-slash
const togglePassword1 = document.querySelector("#togglePassword1");
const password1 = document.querySelector("#newPass");

togglePassword1.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password1.getAttribute("type") === "password" ? "text" : "password";
  password1.setAttribute("type", type);
  // toggle the icon
  this.classList.toggle("fa-eye-slash");
});


//FirebaseAuthHandler
document.addEventListener('DOMContentLoaded', () => {
    // TODO: Implement getParameterByName()
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  
    // Get the action to complete.
    var mode = getParameterByName('mode');
    // Get the one-time code from the query parameter.
    var actionCode = getParameterByName('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    //var continueUrl = getParameterByName('continueUrl');
    // (Optional) Get the language code if available.
    //var lang = getParameterByName('lang') || 'en';
  
    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    var config = {
      'apiKey': "AIzaSyAgHtxEJqKVsXItchYAZ8pvCyR38ReYhzQ" // Copy this key from the web initialization
                                                          // snippet found in the Firebase console.
    };
    var app = firebase.initializeApp(config);
    var auth = app.auth();
  
    // Handle the user management action.
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        document.getElementById("titleReset").innerHTML = "Reset your password";
      //document.getElementById("messageReset").innerHTML = "for <b>" + accountEmail +"</b>";
        document.getElementById("resetPasswordUI").style.display = "block";
        handleResetPassword(auth, actionCode);
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.
        document.getElementById("recoverEmailUI").style.display = "block";
        handleRecoverEmail(auth, actionCode);
        break;
      case 'verifyEmail':
        // Display email verification handler and UI.
        document.getElementById("verifyEmailUI").style.display = "block";
        handleVerifyEmail(auth, actionCode);
        break;
      default:
        // Error: invalid mode.
        alert("Invalid Mode");
    }
  }, false);


  function handleVerifyEmail(auth, actionCode) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    auth.applyActionCode(actionCode).then((resp) => {
      // Email address has been verified.
      document.getElementById("title").innerHTML = "E-Mail successfully verified!";
      document.getElementById("message").innerHTML = "Click on Instructions for the Demo of our App";
      document.getElementById("buttons").style.display = "block";
      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.
  
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch((error) => {
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
      document.getElementById("title").innerHTML = "Contact ADG-VIT's Team";
      document.getElementById("message").innerHTML = error;
      document.getElementById("buttons").style.display = "none";
    });
  }


  function handleRecoverEmail(auth, actionCode) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    var restoredEmail = null;
    // Confirm the action code is valid.
    auth.checkActionCode(actionCode).then((info) => {
      // Get the restored email address.
      restoredEmail = info['data']['email'];
  
      // Revert to the old email.
      return auth.applyActionCode(actionCode);
    }).then(() => {
      // Account email reverted to restoredEmail
  
      // TODO: Display a confirmation message to the user.
  
      // You might also want to give the user the option to reset their password
      // in case the account was compromised:
      auth.sendPasswordResetEmail(restoredEmail).then(() => {
        // Password reset confirmation sent. Ask user to check their email.
      }).catch((error) => {
        // Error encountered while sending password reset code.
      });
    }).catch((error) => {
      // Invalid code.
    });
  }

  function handleResetPassword(auth, actionCode) {
    console.log("inside handleResetPassword");
    // Localize the UI to the selected language as determined by the lang
    // parameter.
  
    // Verify the password reset code is valid.
    auth.verifyPasswordResetCode(actionCode).then((email) => {
      console.log("inside verifyPasswordResetCode");
      var accountEmail = email;

      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.

      document.getElementById("messageReset").innerHTML = "for <b>" + accountEmail +"</b>";
      
      // Save the new password.

      document.getElementById("reset-form").addEventListener('submit', savePassword);
      var newPassword;
      function savePassword(){
        newPassword = document.getElementById("newPassword").value;
        auth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
          console.log("Reset Password Called");
          // Password reset has been confirmed and new password updated.
          document.getElementById("passField").style.display = "none";
          document.getElementById("titleReset").innerHTML = "Password changed";
          document.getElementById("messageReset").innerHTML = "You can now sign in with your new password";
          document.getElementById("buttonsReset").style.display = "block";
          
      
          // TODO: Display a link back to the app, or sign-in the user directly
          // if the page belongs to the same domain as the app:
          // auth.signInWithEmailAndPassword(accountEmail, newPassword);
      
          // TODO: If a continue URL is available, display a button which on
          // click redirects the user back to the app via continueUrl with
          // additional state determined from that URL's parameters.
      }).catch((error) => {
        document.getElementById("title").innerHTML = "Try resetting your password again";
        document.getElementById("message").innerHTML = error;
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
      });
      }
          
    }).catch((error) => {
        document.getElementById("title").innerHTML = "Try resetting your password again";
        document.getElementById("message").innerHTML = error;
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
    });
  }

  /*
  function confirmResetPassword(auth, actionCode){
    
    var newPassword = document.getElementById("newPassword").value;
    console.log(newPassword);
    auth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
      console.log("Reset Password Called");
      // Password reset has been confirmed and new password updated.
      document.getElementById("passField").style.display = "none";
      document.getElementById("title").innerHTML = "Password changed";
      document.getElementById("message").innerHTML = "You can now sign in with your new password";
      document.getElementById("buttons").style.display = "block";
      
  
      // TODO: Display a link back to the app, or sign-in the user directly
      // if the page belongs to the same domain as the app:
      // auth.signInWithEmailAndPassword(accountEmail, newPassword);
  
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch((error) => {
      document.getElementById("title").innerHTML = "Try resetting your password again";
      document.getElementById("message").innerHTML = error;
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
    });
  } 
*/
  $("#reset-form").submit(function(e) {
    e.preventDefault();
  });
  
