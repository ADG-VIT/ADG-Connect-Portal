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
  var pushmeetuserArr = [];
  $("input[type='checkbox']").each(function(index, el) {
    if (el.checked) {
      var val = $(el).data("value");
      pushmeetuserArr.push(val);
    }
  });
  //console.log(pushmeetuserArr);

  writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr);
}

//To push values to firebase
function writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr)
{
  if (chosenTeam == "z")
  {
    var meetingCore = "Meetings";
    var newMeetingKey = firebase.database().ref().child('Alerts/Core/').push().key;
    firebase.database().ref('Alerts/Core/').push({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: meetingCore,
    users: pushmeetuserArr
  });
  
    firebase.database().ref('Home/Notification/').push({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: meetingCore,
    users: pushmeetuserArr
    });
  alert("Meeting Posted");
  }

  else if (chosenTeam == "0"||"1"||"2"||"3"||"4"||"5"||"6"||"7"||"8")
  {
    var newMeetingKey = firebase.database().ref().child('Alerts/Team/').push().key;
    firebase.database().ref('Alerts/Team/').push({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: chosenTeam,
    users: pushmeetuserArr
  });
  
  firebase.database().ref('Home/Notification/').push({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: chosenTeam,
    users: pushmeetuserArr
  });
  alert("Meeting Posted");
  window.location.reload();
  }
  
  else{
    alert("Please fill details");
  }
}


//Prevent form from refreshing on submit
$("#newMeetingForm").submit(function(e) {
  e.preventDefault();
});

