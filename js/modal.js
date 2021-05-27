//Modal Refresh Thing (Badi BT thi Isme (Dhyaan se Padhna ise))
var first_click = true;
var plus = document.getElementById("myBtn");
var chosenCoreFirst;
plus.onclick = function() {
    if (first_click) {
        // do stuff for first click
        //console.log("1click");
        chosenCoreFirst = getCheckedValue(document.getElementsByName('t[]'));
        //console.log(chosenCoreFirst);
        handleData1();
        first_click = false;
        return chosenCoreFirst;
    } else {
      //console.log("2click");
      //console.log(chosenCoreFirst);
      // do stuff for second click
      var chosenCoreSecond = getCheckedValue(document.getElementsByName('t[]'));

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
      //console.log(chosenCoreSecond);
      if (chosenCoreSecond == chosenCoreFirst){
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
      }
      else if (chosenCoreSecond != chosenCoreFirst) {
        var modalContent = document.getElementById("fetchmemberslist");
        modalContent.innerHTML = "";
        handleData1();
      }
        
    }
}


//Validate radio button
function handleData1()
{
  var form_data = new FormData(document.querySelector("form"));
  if(!form_data.has("t[]"))
  {
    alert('Select a team first');
    return false;
  }
  else
  {
    //console.log("team selected");
    openModal();
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
  
//Open Modal
function openModal(){
  //console.log("open modal");
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
  sortTeam();
  }

//Fetch Data according to team (Core/Team ID)
function sortTeam(){
  console.log("sort team");
  var chosenCore = getCheckedValue(document.getElementsByName('t[]'));
  if (chosenCore=="z"){
    selectAllDataCore();
  }
  else if (chosenCore == 0||1||2||3||4||5||6||7||8) {
    selectAllData();
  }
}

//Fetching ALL Member Names in the Modal
function selectAllDataCore(){
  //console.log("create table");
  var tableDiv = document.getElementById('fetchmemberslist');
  var table = document.createElement('table');
  table.setAttribute("id", "memberslist");
  tableDiv.appendChild(table);
  //console.log("core selected");
  firebase.database().ref('Users').once('value', function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var member = CurrentRecord.val().name;
        var meetuserid = CurrentRecord.val().uid;
        var boardMember = CurrentRecord.val().isAdmin;
        var guest = CurrentRecord.val().name;
        if(boardMember==false && guest != "Guest User"){
          AddItemsToTable(member, meetuserid);
        }
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
          var boardMember = CurrentRecord.val().isAdmin;
          var guest = CurrentRecord.val().name;
          if(boardMember==false && guest != "Guest User"){
            AddItemsToTable(member, meetuserid);
          }
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
function selectedMembersDisp(){
  document.getElementById("selectedMembers").innerHTML = "";
  var meetuserArr = [];
    $("input[type='checkbox']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        meetuserArr.push(val);
        return meetuserArr;
      }
    });
  console.log(meetuserArr);

  var nameuserArr = $("input[name='item[]']:checked").map(function () {
    return this.value;
  }).get();
  console.log(nameuserArr);

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
