const getMeetings = async () => {
  try {
    let meetings = await fetch(
      "https://internals-app-c0391.firebaseio.com/Alerts.json"
    );
    meetings = await meetings.json();
    // console.log(meetings);
    return meetings;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch meeting data");
  }
};

let Meetings;
let allMeetings;
const renderMeetings = async () => {
  Meetings = await getMeetings();
  const fetchedMeetings = document.querySelector(".fetchedMeetings");
  let Teams = Object.values(Meetings.Team).map((team) => {
    return { ...team, scope: "Team" };
  });
  console.log(Meetings);

  let Core = Object.values(Meetings.Core)
    .map((core) => {
      return { ...core, scope: "Core" };
    })
    .filter((Core) => Core.type === "Meetings");

  allMeetings = [...Teams, ...Core];
  allMeetings.sort((a, b) => b.time - a.time);
  allMeetings
    .map(
      (m) =>
        `<div class="meeting" onclick="selectMeeting('${m.id}')">
          <div style="display: flex; justify-content: space-between;">
          <p class="bold">
            ${m?.title}
          </p>
          </div>
          <p>${new Date(m.time * 1000).toLocaleDateString()}</p>
        </div>
          `
    )
    .forEach((m) => (fetchedMeetings.innerHTML += m));

  // fetchedMeetings.innerHTML += TeamsMeetings + CoreMeetings;
};

let id;
var Users;
let meetingId;
let unavailable;
let acknowledged;
const selectMeeting = async (mId) => {
  meetingId = mId;
  try {
    const ackMarkup = document.querySelector(".available");
    const nonAckMarkup = document.querySelector(".unavailable");
    const dbRef = firebase.database().ref();
    let attendance = await dbRef
      .child("AlertAttendance")
      .child(meetingId)
      .get();
    let snapshot = await attendance.val();
    console.log(snapshot);

    Users = await Promise.all(
      Object.entries(snapshot).map(async ([key, value]) => {
        let user = await dbRef.child("Users").child(key).get();
        let snap = await user.val();
        return { ...snap };
      })
    );

    console.log(Users);

    let title = Meetings.Core[mId]?.title ?? Meetings.Team[mId]?.title;
    document.querySelector(".meeting-title").innerHTML = `${title}`;
    acknowledged = Users.filter((u) => snapshot[u.uid] === "available");

    ackMarkup.innerHTML = `<h3>Acknowledged</h3>`;
    if (acknowledged) {
      acknowledged.forEach((user, i) => {
        ackMarkup.innerHTML += `<div class="user">
          <h4>${user.name}</h4>
          <p>${user.regNo}</p>
          <div class="changestatus-btn" id="${i}"onclick="changeStatus(this.id, 0)">Change Status</div>
        </div>`;
      });
    } else {
      nonAckMarkup.innerHTML = `<p>No members</p>`;
    }
    unavailable = Users.filter((u) => snapshot[u.uid] !== "available");
    nonAckMarkup.innerHTML = `<h3>Unavailable</h3>`;
    if (unavailable) {
      unavailable.forEach((user, i) => {
        nonAckMarkup.innerHTML += `<div class="user">
          <h4>${user.name}</h4>
          <p>${user.regNo}</p>
          <div>
            <details>
              <summary class="reason">Reason &#9660;</summary>
              <p>${user?.meetings?.meetingId || "Unavailable"}</p>
            </details>
          </div>
          <div class="changestatus-btn" id="${i}"onclick="changeStatus(this.id, 1)">Change Status</div>
        </div>`;
      });
    } else {
      nonAckMarkup.innerHTML = `<p>No members</p>`;
    }
  } catch (error) {
    console.error(error);
  }
  //document.getElementById("meeting").classList.toggle("active");
};
renderMeetings();

// Mark
async function changeStatus(id, status) {
  let update = {};
  status = parseInt(status);
  if (status == 0) {
    let currUser = acknowledged[id];
    let currUserId = currUser["uid"];
    update[currUserId] = "unavailable";
  } else {
    let currUser = unavailable[id];
    let currUserId = currUser["uid"];
    update[currUserId] = "available";
  }
  const dbRef = firebase.database().ref();
  try {
    await dbRef.child("AlertAttendance").child(meetingId).update(update);

    selectMeeting(meetingId);
  } catch (error) {
    console.error(error);
  }
}  