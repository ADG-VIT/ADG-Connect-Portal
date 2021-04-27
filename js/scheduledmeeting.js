const getMeetings = async () => {
  try {
    let meetings = await fetch(
      "https://internals-app-c0391.firebaseio.com/Alerts.json"
    );
    meetings = await meetings.json();
    // console.log(meetings);
    return meetings;
  } catch (err) {
    console.log(err);
    alert("Failed to fetch meeting data");
  }
};

let Meetings;
const renderMeetings = async () => {
  Meetings = await getMeetings();
  const fetchedMeetings = document.querySelector(".fetchedMeetings");
  let Teams = Object.values(Meetings.Team).map((team) => {
    return { ...team, scope: "Team" };
  });

  let Core = Object.values(Meetings.Core)
    .map((core) => {
      return { ...core, scope: "Core" };
    })
    .filter((Core) => Core.type === "Meetings");

  let allMeetings = [...Teams, ...Core];
  allMeetings.sort((a, b) => b.time - a.time);
  allMeetings
    .map(
      (m) =>
        `<div class="meeting" onclick="selectMeeting('${m.id}')">
          <p class="bold">
            ${m.scope} Meeting
            <a class="post" href="">Post Attendance</a>
          </p>
          <p>${new Date(m.time * 1000).toLocaleDateString()}</p>
        </div>`
    )
    .forEach((m) => (fetchedMeetings.innerHTML += m));
  console.log(allMeetings);

  // fetchedMeetings.innerHTML += TeamsMeetings + CoreMeetings;
};

let id;

const selectMeeting = async (meetingId) => {
  id = meetingId;
  try {
    console.log(meetingId);
    const dbRef = firebase.database().ref();
    let attendance = await dbRef
      .child("AlertAttendance")
      .child(meetingId)
      .get();
    let snapshot = await attendance.val();

    let Users = await Promise.all(
      Object.entries(snapshot).map(async ([key, value]) => {
        let user = await dbRef.child("Users").child(key).get();
        let snap = await user.val();
        console.log(snap);
        return {
          name: snap.name,
          regNo: snap.regNo,
          reason: value,
        };
      })
    );
    console.log(Users);

    const ackMarkup = document.querySelector(".available");

    let acknowledged = Users.filter((u) => u.reason === "available");

    console.log(ackMarkup);
    ackMarkup.innerHTML = `<h3>Acknowledged</h3>`;
    acknowledged.forEach((user) => {
      ackMarkup.innerHTML += `<div class="user">
        <h4>${user.name}</h4>
        <p>${user.regNo}</p>
      </div>`;
    });
    let unavailable = Users.filter((u) => u.reason !== "available");
    const nonAckMarkup = document.querySelector(".unavailable");
    console.log(nonAckMarkup);
    nonAckMarkup.innerHTML = `<h3>Unavailable</h3>`;
    unavailable.forEach((user) => {
      nonAckMarkup.innerHTML += `<div class="user">
        <h4>${user.name}</h4>
        <p>${user.regNo}</p>
      </div>`;
    });
  } catch (error) {
    console.error(error);
  }
};
renderMeetings();
