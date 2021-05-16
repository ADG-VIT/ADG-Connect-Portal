const getMOMS = async () => {
  try {
    let moms = await fetch(
      "https://internals-app-c0391.firebaseio.com/MOMS.json"
    );
    moms = await moms.json();
    // console.log(moms);
    return moms;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch mom data");
  }
};

let MOMS;

const renderMOMS = async () => {
  MOMS = await getMOMS();
  const fetchedMOMS = document.querySelector(".fetchedMOMS");
  console.log(MOMS);

  Object.entries(MOMS)
    .map(
      ([k, m]) =>
        `<div class="MOM" onclick="selectMOM('${k}')">
          <div style="display: flex; justify-content: space-between;">
          <p class="bold">
            ${m.title}
          </p>
          </div>
          <p>${new Date(m.time * 1000).toLocaleDateString()}</p>
        </div>
          `
    )
    .forEach((m) => (fetchedMOMS.innerHTML += m));
};

let MOMId;
let MOM;
const selectMOM = async (mId) => {
  MOMId = mId;
  try {
    const right = document.querySelector(".right");
    1;
    const dbRef = firebase.database().ref();
    let attendance = await dbRef.child("MOMS").child(MOMId).get();
    let snapshot = await attendance.val();
    // console.log(snapshot);

    MOM = snapshot;
    right.innerHTML = "";
    let points = "";
    MOM.points.forEach((p) => {
      points += `<li class="mompoint">${p}</li>`;
    });
    right.innerHTML += `
    <div class="momdetails">
      <h4 class="momheading">${MOM.title}</h4>
      <p>${new Date(MOM.time * 1000).toLocaleString()}</p>
      <br />
      <p>${MOM.header}</p>
      <br />
      <p class="bold">Points Discussed</p>
      <ul>
        ${points}
      </ul>
    </div>
    `;
  } catch (error) {
    console.error(error);
  }
};

renderMOMS();
