firebase.database().ref('Users').once('value', function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var member = CurrentRecord.val().name; 
        var meetuserid = CurrentRecord.val().uid; 
        console.log(".");
        var teamId = CurrentRecord.val().teams;
        if(teamId.includes(1)){
            console.log(member);
            console.log(teamId);
        }
      }
    );
  });