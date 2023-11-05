const getSpotifyAuth = async () => {
//   const result = await fetch("http://localhost:8888/api/login", {
//     headers: { "Content-Type": "application/json" },
//     method: "GET",
//   });
  window.location.href = "http://localhost:8888/api/login";
  console.log("clicked");
};

// const reauthenticate = async () => {
//     window.location.href = "http://localhost:8888/api/refresh_token"
//     console.log("reauthenticated")
// }

var client_id = "e8e07c14f0fe4adf8fac0acd94f340c8"; // Your client id
var client_secret = "a301eecb06e7444496a62313a50d1e33"; // Your secret
var redirect_uri = "http://localhost:5500/Zotify/client/index.html"; // Your redirect uridocument.addEventListener('DOMContentLoaded', async () => {


    console.log("DOM LOADED")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    console.log("code is", code);
    console.log("state is", state)
//     if (code != null) {
//         localStorage.setItem('spotify-code', code);
//         localStorage.setItem('spotify-state', state);
//         const bodyParams = new URLSearchParams({
//           grant_type: "authorization_code",
//           code: code,
//           redirect_uri: redirect_uri
//         });
//         const result = await fetch("http://localhost:8888/api/callback", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
//           },
//           body: bodyParams
//         });
//         console.log(result);
// }