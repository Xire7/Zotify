/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
var path = require("path");

var client_id = "e8e07c14f0fe4adf8fac0acd94f340c8"; // Your client id
var client_secret = "a301eecb06e7444496a62313a50d1e33"; // Your secret
var redirect_uri = "http://localhost:5500/Zotify/client/index.html"; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(cors())
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "..", "client"))); // Make sure this directory is correct

app.get("/api/login", function (req, res) {
  console.log("api login processing");
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});


app.post("/api/callback", async (req, res) => {
  var code = "AQCv2QA5yYNEsZLRo1eiYz63fW6Of6ddWgnEoWpdS60CMbwwiImHq4-jHM8MTsD9fsUZCqBmhaThjMhrNh8V45OXac1Awh_1qcUsgLTM7I61Bc-iRLJ4vV2gdQgEBSEp-phwpgvEXwt8nh20XBkHapoB726AavdV5_LBj5au6_c6tpRsT6n-401Y-49GcK_HMdIu18kx_HVApeAWNYgFQ_hhifRLgCQVV_2T8ckpBHnkspnIFo0";
  var state = "DGAt2nXFo6IfaGS4";
  var redirect_uri = "http://localhost:5500/Zotify/client/index.html";

  

})

app.get("/api/callbacks", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  console.log("W")
  var code =
    req.query.code ||
    "AQCv2QA5yYNEsZLRo1eiYz63fW6Of6ddWgnEoWpdS60CMbwwiImHq4-jHM8MTsD9fsUZCqBmhaThjMhrNh8V45OXac1Awh_1qcUsgLTM7I61Bc-iRLJ4vV2gdQgEBSEp-phwpgvEXwt8nh20XBkHapoB726AavdV5_LBj5au6_c6tpRsT6n-401Y-49GcK_HMdIu18kx_HVApeAWNYgFQ_hhifRLgCQVV_2T8ckpBHnkspnIFo0";
  // console.log(code);
  var state = req.query.state || "DGAt2nXFo6IfaGS4";
  var redirect_uri = "http://localhost:5500/Zotify/client/index.html";

  console.log(state)
  try {
    if (state === null) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      console.log("dub");
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      app.post(authOptions, function (error, response, body) {
        console.log("gang")
        if (!error && response.statusCode === 200) {
          console.log(access_token, "HELOOOOOOOOOOOOOOO");
          var access_token = body.access_token,
            refresh_token = body.refresh_token;

          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };

          // use the access token to access the Spotify Web API
          app.get(options, function (error, response, body) {
            console.log(body);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            "/#" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
              })
          );
        } else {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/api/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

app.get("/test", (req, res) => {
  console.log("testing server endpoint");
  res.send({
    test: "test works",
  });
});

console.log("Zotify: Listening on 8888");
app.listen(8888);
