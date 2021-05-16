firebase.auth().onAuthStateChanged(function(user){
  if(user){
      //user is signed in
  }else{
      window.location.assign("index.html");
  }
});

/*function waitTime(){
  var delayInMilliseconds = 2000;
  setTimeout(function() {
    con();
  }, delayInMilliseconds);
}*/

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




  var adminId = "";
  var adminName = "";
  var position = "";

  function getUserId(){
    console.log("user id");
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          console.log("2");
          adminId = user.uid;
          console.log(adminId);
          resolve(user.uid);
        }
        else{
          console.log(error);
        }
      })
    })
  }
  
  function getUserDetails(){
    console.log("user details");
    return new Promise((resolve, reject) => {
        console.log(adminId);
        var ref = firebase.database().ref("Users/" + adminId);
        ref.once("value")
        .then(function(snapshot) {
        adminName = snapshot.child("name").val();
        position = snapshot.child("position").val();
        resolve(adminName, position);
        });
      });
    }

    function showUserDetails(){
        console.log(adminName);
        console.log(position);
        document.getElementById("name-tag").innerHTML = adminName;
        document.getElementById("name-desc").innerHTML = position;
        var initials = adminName.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
        console.log(initials);
        document.getElementById("initial").innerHTML = initials;
        document.cookie = "name=" + adminName;
        document.cookie = "position" + position;
    }

  
    async function nameTag(){
      await getUserId();
      await getUserDetails();
      showUserDetails();
    }

    nameTag();


/*
var first = 0;
var second = 1;
var third = 2;

  function cons1(){
    console.log(first);
    return new Promise(function(resolve, reject){
      setTimeout(() => {
        //first = "1st";
        console.log("First");
        console.log(first);
        resolve(first);
      }, 3000);
    })
  };
  function cons2(){
    return new Promise(function(resolve, reject){
      setTimeout(() => {
        second = "2nd";
        console.log("Second");
        console.log(first);
        resolve(second);
      }, 4000);
    })
    
  };

  function cons3(){
    third = "3rd";
    console.log("Third");
    console.log(first);
    console.log(second);
  }

  // cons1();
  // cons2();
  // cons3();

  async function consF(){
    await cons1();
    await cons2();
    cons3();
  }

  consF();

*/  




