//Date Checker to be Greater than Today's
function TDate() {
  var UserDate = document.getElementById("date").value;
  var ToDate = new Date();
    
  if (new Date(UserDate).getTime() <= ToDate.getTime()) {
    alert("Choose a Future Date");
    //return false;
  }
  else if (new Date(UserDate).getTime() >= ToDate.getTime()){
    membersCheck();
  }
  else("ERROR!");
}

//Check if Members Selected
function membersCheck(){
  var meetuserArr = [];
  $("input[type='checkbox']").each(function(index, el) {
    if (el.checked) {
      var val = $(el).data("value");
      meetuserArr.push(val);
      return meetuserArr;
    }
  });
 
  if(meetuserArr.length === 0){
    alert("Choose Members");
  }
  else{
    readData();
    return true;
  }
}

//Modal Refresh Code Badi BT thi Isme (Dhyaan se Padhna ise)
var first_click = true;
var plus = document.getElementById("myBtn");
plus.onclick = function() {
    if (first_click) {
      // do stuff for first click
      openModal();
      first_click = false;
    } else {
      console.log("2click");
      var modal = document.getElementById("myModal");
      modal.style.display = "block";   
    }
}

//Open Modal Div
function openModal(){
  console.log("open modal");
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  selectAllDataCore();
  }

//Fetching ALL Member Names in the Modal
function selectAllDataCore(){
  //console.log("create table");
  var tableDiv = document.getElementById('fetchmemberslist');
  var table = document.createElement('table');
  table.setAttribute("id", "memberslist");
  tableDiv.appendChild(table);
  firebase.database().ref('Users').once('value', function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var member = CurrentRecord.val().name;
        var meetuserid = CurrentRecord.val().uid;
        AddItemsToTable(member, meetuserid);
      }
    );
  });
}

//Fetching Data in a table in Modal
function selectAllData(){
  //console.log("create table");
  var tableDiv = document.getElementById('fetchmemberslist');
  var table = document.createElement('table');
  table.setAttribute("id", "memberslist");
  tableDiv.appendChild(table);
  var chosenTeam = getCheckedValue(document.getElementsByName('t[]'));
  //console.log(chosenTeam);
  firebase.database().ref('Users').once('value', function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var member = CurrentRecord.val().name;
        var meetuserid = CurrentRecord.val().uid;
        var teamId = CurrentRecord.val().teams;
        //console.log(teamId);
        var n = teamId.includes(parseInt(chosenTeam));
        if (n==true){
          //console.log("hi");
          AddItemsToTable(member, meetuserid);
        }
        else{
          //console.log("bye");
        }
      }
    );
  });
}
//Filling the table in the Modal
function AddItemsToTable(member, meetuserid){
  var table = document.getElementById('memberslist');
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  td1.innerHTML = "<input type='checkbox' id='human' class='human' name='item[]' data-value='" + meetuserid + "' value='" + member +"'>" + " " + member;
  trow.appendChild(td1);
  table.appendChild(trow);
  }

  //Search bar in Modal
function searchTable() {
var input, filter, table, tr, th, i, txtValue;
input = document.getElementById("searchBar");
filter = input.value.toUpperCase();
table = document.getElementById("memberslist");
tr = table.getElementsByTagName("tr");
for (i = 0; i < tr.length; i++) {
  th = tr[i].getElementsByTagName("td")[0];
  if (th) {
    txtValue = th.textContent || th.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }       
}
}

//To display names of chosen members
function test(){
  document.getElementById("selectedMembers").innerHTML = "";
  var meetuserArr = [];
    $("input[type='checkbox']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        meetuserArr.push(val);
        return meetuserArr;
      }
    });
  //console.log(meetuserArr);

  var nameuserArr = $("input[name='item[]']:checked").map(function () {
    return this.value;
  }).get();
  //console.log(nameuserArr);

  nameuserArr.forEach(el => {
    document.getElementById('selectedMembers').innerHTML +=`<button class="pill" type="button">${el}</button>`;
    // here result is in the id of the div present in the dom
  });

  var meetteamArr = [];
    $("input[type='radio']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        meetteamArr.push(val);
      }
    });
    console.log(meetteamArr);
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var content = document.getElementById("fetchmemberslist");
  
    //console.log("Heyya");    
  };

//Check All in Modal
$(function() {
  $(document).on('click', '#checkAll', function() {
    if ($(this).val() == 'Check All') {
      $('.fetchmemberslist input[type="checkbox"]').prop('checked', true);
      $(this).val('Uncheck All');
    } 
    else {
      $('.fetchmemberslist input[type="checkbox"]').prop('checked', false);
      $(this).val('Check All');
    }
  });
}); 



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
  var pushmeetuserArr = [];
    $("input[type='checkbox']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        pushmeetuserArr.push(val);
      }
    });
    //console.log(pushmeetuserArr);
  writeUserData(unixdate,link,venue,title,pushmeetuserArr);
}

//To push values to firebase
function writeUserData(unixdate,link,venue,title,pushmeetuserArr){
  var taskType = "Duties";
  var newTaskKey = firebase.database().ref().child('Alerts/Core/').push().key;
  firebase.database().ref('Alerts/Core/').push({
  id: newTaskKey,
  time: unixdate,
  title: title,
  location: venue, 
  link: link,
  type: taskType,
  users: pushmeetuserArr
  });

  firebase.database().ref('Home/Notification/').push({
    id: newTaskKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: taskType,
    users: pushmeetuserArr
  });

  alert("Task Posted"); 
  window.location.reload(); 
}


 //Prevent form from refreshing on submit
 $("#newTaskForm").submit(function(e) {
  e.preventDefault();
});
