document.getElementById("newMeetingForm").addEventListener('submit', TDate)

//Date Checker to be Greater than Today's
function TDate() {
    var UserDate = document.getElementById("date").value;
    var ToDate = new Date();
      
    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
        alert("Choose a Future Date");
        //return false;
    }
    else if (new Date(UserDate).getTime() >= ToDate.getTime()){
      handleData2();  
    }
    else("error");
  }

// Check if Team is Selected 
// Check if Member is Selected
function handleData2()
  {
  var form_data = new FormData(document.querySelector("form"));
  var meetuserArr = [];
  $("input[type='checkbox']").each(function(index, el) {
    if (el.checked) {
      var val = $(el).data("value");
      meetuserArr.push(val);
      return meetuserArr;
    }
  });
  if(!form_data.has("t[]"))
  {
    alert('Select a team first');
    return false;
  }
  else if(meetuserArr.length === 0)
  {
    alert("Choose Members");
  }
  else{
    readData();
    return true;
  }
}
    
//Get radio button value
function getCheckedValue(el) {
  for (var i = 0, length = el.length; i < length; i++) {
    if (el[i].checked) {
      return el[i].value;
      break;
    }
  }
  return '';
}

var pushmeetuserArr = [];

//To read values of the form
function readData() {
  // Get input values from each of the form elements    
  let date = document.getElementById("date").value;
  var unixdate = new Date(date).valueOf()/1000;
  let title = document.getElementById("title").value;
  //console.log(title);
  let venue = document.getElementById("venue").value;
  //console.log(venue);
  let link = document.getElementById("link").value;
  //console.log(link);
  let chosenTeam = getCheckedValue(document.getElementsByName('t[]'));
  //console.log(chosenTeam);
  //var pushmeetuserArr = [];
  $("input[type='checkbox']").each(function(index, el) {
    if (el.checked) {
      var val = $(el).data("value");
      pushmeetuserArr.push(val);
    }
  });
  let isMom=false;
  //console.log(pushmeetuserArr);

  writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr, isMom);
}

//To push values to firebase
function writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr, isMom)
{
  if (chosenTeam == "z")
  {
    var meetingCore = "Meetings";
    var newMeetingKey = firebase.database().ref().child('Alerts/Core/').push().key;
    //firebase.database().ref('Alerts/Core/').child(key).push({
    firebase.database().ref('Alerts/Core/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: meetingCore,
    users: pushmeetuserArr,
    isMom: isMom
  }, (error) => {
    if (error) {
      alert(error);
    }
  });
  
    firebase.database().ref('Home/Notification/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: meetingCore,
    users: pushmeetuserArr
  }, (error) => {
    if (error) {
      alert(error);
    }
    });
  
  // alert("Meeting Posted");
  // window.location.reload();
  sendNotif(pushmeetuserArr);
  }

  else if (chosenTeam == "0"||"1"||"2"||"3"||"4"||"5"||"6"||"7"||"8")
  {
    var newMeetingKey = firebase.database().ref().child('Alerts/Team/').push().key;
    firebase.database().ref('Alerts/Team/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: chosenTeam,
    users: pushmeetuserArr
  }, (error) => {
    if (error) {
      alert(error);
    }
  });
  
  firebase.database().ref('Home/Notification/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: chosenTeam,
    users: pushmeetuserArr
  }, (error) => {
    if (error) {
      alert(error);
    }
  });
  // alert("Meeting Posted");
  // window.location.reload();
  sendNotif(pushmeetuserArr);
  }
  
  else{
    alert("Please fill details");
  }
}

var fcmArr = [];
//var newArr = [];
var notif;

function getFCM(){
  console.log("Getting FCM");
  return new Promise(function(resolve, reject){
    for (var i =0; i < pushmeetuserArr.length; i++){
      console.log(i);
      console.log(pushmeetuserArr[i]);
      // var ref = firebase.database().ref("Users/" + pushmeetuserArr[i]);
      // ref.once("value")
      // .then(function(snapshot) {
      // var userfcm = snapshot.child("fcm").val();
      var ref = firebase.database().ref("Users");
      ref.orderByChild("uid").equalTo(pushmeetuserArr[i]).on("child_added", function(snapshot) {
        console.log(snapshot.key);
        var userfcm = snapshot.val().fcm;
        console.log(userfcm);
        fcmArr.push(userfcm);
        console.log(fcmArr);
        resolve(fcmArr);
      });
    }
  })
    //newArr = JSON.stringify(fcmArr);
    //console.log(newArr);
    // console.log(fcmArr);
    // resolve(fcmArr);
}

function getNotifData(){
  //console.log("starting notif data fetch");
  //console.log(pushmeetuserArr);
  //var userfcm;
  //var pushmeetuserArr = ["j8wRGcEgJrMCUAchjfTrD466iFp2", "8YUM5A4T5NaATiU2OKmrx4kQ4BS2", "NE0SB62uEubuo5BGaQy0X6Q4xkD2"];
  //console.log("2");
  return new Promise(function(resolve, reject){
    
    //console.log(fcmArr);
    var titleNotif =  document.getElementById("title").value;
    let date = document.getElementById("date").value;
    var time = new Date(date);
    var timeNotif = time.toLocaleString();
    notif = titleNotif + " on " + timeNotif;
    console.log(notif);
    resolve(notif);
  })
}


function sendNotification(){
  console.log("sending notification");
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "key=AAAAr7nfbFc:APA91bEcfhCAcXHNpLBCRwWu5MlJc9BrSZebZ_UmhlT-onKNRI2GuMGGCnN9wo2DhqZ7aj-52lxg-X1tIfvKu8hDS7gb9A8LUc7Wf8YDewqvQ-OBNvk_PWlTMvf3cFeWilYWpTD58jsr");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "registration_ids": fcmArr,
  "priority": "high",
  "content_available": true,
  "mutable_content": true,
  "notification": {
      "title": "New Meeting Scheduled",
      "body": notif,
      "sound": "default"
  },
  "sound": "default"
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .then(alert("Meeting Posted"))
  .then(window.location.reload())
  .catch(error => alert('error', error));
}

async function sendNotif(){
  console.log('Send Notif');
  await getFCM();
  console.log("FCM Array Formed");
  await getNotifData();
  console.log("Notif Data Fetched");
  sendNotification();
  console.log("notification sent");
}

//Prevent form from refreshing on submit
$("#newMeetingForm").submit(function(e) {
  e.preventDefault();
});



