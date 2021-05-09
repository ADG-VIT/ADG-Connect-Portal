// const memberList = document.getElementById("members");

const getUsers = async () => {
  try {
    let users = await fetch(
      "https://internals-app-c0391.firebaseio.com/Users.json"
    );
    users = await users.json();
    console.log(users);
    return users;
  } catch (err) {
    console.log(err);
  }
};

// getUsers();

const renderUsers = async () => {
  var userList = await getUsers();
  const teams = document.getElementsByClassName("team");
  console.log(teams);
  userList = Object.values(userList);
  console.log(userList);

  userList.forEach((user) => {
    user.teams.forEach((team) => {
      teams[team].innerHTML += `<div class="member-card"> <span class="tooltiptext">${user.email} <br> ${user.phone}</span>
      <div class="member-name">${user.name}</div>
      <div class="member-details">${user.regNo}</div>
    </div>`;
    });
  });
};

renderUsers();
