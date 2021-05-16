var firebaseConfig = {
  apiKey: "AIzaSyAgHtxEJqKVsXItchYAZ8pvCyR38ReYhzQ",
  authDomain: "internals-app-c0391.firebaseapp.com",
  databaseURL: "https://internals-app-c0391.firebaseio.com",
  projectId: "internals-app-c0391",
  storageBucket: "internals-app-c0391.appspot.com",
  messagingSenderId: "754737704023",
  appId: "1:754737704023:web:5ec000ba7b9d08cea48712",
  measurementId: "G-YYZML2JL2J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


document.onreadystatechange = function() {
  if (document.readyState !== "complete") {
      document.querySelector(
        "body").style.visibility = "hidden";
      document.querySelector(
        "#loader").style.visibility = "visible";
  } else {
      document.querySelector(
        "#loader").style.display = "none";
      document.querySelector(
        "body").style.visibility = "visible";
  }
};

/*
// FCM
 const messaging = firebase.messaging();
 messaging.requestPermission()
 .then(function(){
   console.log('Have permission');
   return messaging.getToken();
 })
 .then(function(token){
   //remove later
   console.log(token);
 })
 .catch(function(err){
 console.log('Error occured, permission denied');
 })

 messaging.onMessage(function(payload){
   console.log('onMessage: ', payload);
 });


//FCM-2
// function getToken() {
//   const messaging=firebase.messaging();
//   // [START messaging_get_token]
//   // Get registration token. Initially this makes a network call, once retrieved
//   // subsequent calls to getToken will return from cache.
//   messaging.getToken({ vapidKey: 'BAr-FE6vCqmvmpNgjAVwOJQr3H2EucL8p4oj64fi_9uPVjXehiUErNI5ahz15VKpEgZ1ARZAz-5IhTbsXmABIS8' })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//       // ...
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
//   });
//   // [END messaging_get_token]
// }

// function requestPermission() {
//   // [START messaging_request_permission]
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//       // TODO(developer): Retrieve a registration token for use with FCM.
//       // ...
//     } else {
//       console.log('Unable to get permission to notify.');
//     }
//   });
//   // [END messaging_request_permission]
// }

// function deleteToken() {
//   const messaging = firebase.messaging();

//   // [START messaging_delete_token]
//   messaging.deleteToken().then(() => {
//     console.log('Token deleted.');
//     // ...
//   }).catch((err) => {
//     console.log('Unable to delete token. ', err);
//   });
//   // [END messaging_delete_token]
// }

/*
curl --header "Authorization: key=AAAAr7nfbFc:APA91bGWqLXS0-KTcy0YyhD6BtjyioIPYAx21746YtM4nKMU4dYKOgc6dp1rETiS73CYWswXMjk9viSMQ6giQri2Mwz8Nf_ImnZ3eDOxCFxGuJe7_mnvAdiu11Du7VXGnLbqeJk0aByA" --header "Content-Type: application/json" -d'{"to": "ebXRXRiOMBDFjCz4m8R282:APA91bFsMGGH6I3EAZ3Z9OtrReDhWAnsrLQCF_PI7CGdZaagqMZiBMjZ1FXC6HfFKplbKO2GGAhax9QGVLSMw-s2QzeNs6nUkHWKfScXM7OUUfd2tEKxErSpKmyypEItdTaWmpCzi381", "notification": {"title": "Hello","body": "Yellow"}}' https://fcm.googleapis.com/fcm/send

curl --header "Authorization: key=AIzaSyAgHtxEJqKVsXItchYAZ8pvCyR38ReYhzQ" --header "Content-Type: application/json" -d'{"to": "ebXRXRiOMBDFjCz4m8R282:APA91bFsMGGH6I3EAZ3Z9OtrReDhWAnsrLQCF_PI7CGdZaagqMZiBMjZ1FXC6HfFKplbKO2GGAhax9QGVLSMw-s2QzeNs6nUkHWKfScXM7OUUfd2tEKxErSpKmyypEItdTaWmpCzi381", "notification": {"title": "Hello","body": "Yellow"}}' https://fcm.googleapis.com/fcm/send
curl --header "Authorization: key=AIzaSyAgHtxEJqKVsXItchYAZ8pvCyR38ReYhzQ" --header "Content-Type: application/json" -d'{"to": "ebXRXRiOMBDFjCz4m8R282:APA91bFsMGGH6I3EAZ3Z9OtrReDhWAnsrLQCF_PI7CGdZaagqMZiBMjZ1FXC6HfFKplbKO2GGAhax9QGVLSMw-s2QzeNs6nUkHWKfScXM7OUUfd2tEKxErSpKmyypEItdTaWmpCzi381", "notification": {"title": "Hello","body": "Yellow"}}' https://fcm.googleapis.com/fcm/send
*/