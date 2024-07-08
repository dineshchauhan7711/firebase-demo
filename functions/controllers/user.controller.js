// const {
//      getAuth,
//      signInWithEmailAndPassword,
//      sendEmailVerification,
//      createUserWithEmailAndPassword
// } = require("firebase/auth");

// const admin = require('firebase-admin');
// admin.initializeApp();


/**
 * Add User
 */
// exports.AddUser = functions.https.onRequest(async (req, res) => {
//      try {
//           // const { uid } = await admin.auth().createUser({
//           //      displayName: "Admin",
//           //      password: "123456",
//           //      email: "admin1@gmail.com",
//           // })


//           // const data = await admin.auth().setCustomUserClaims("nrQusvIuPoa41IuYf89805c42X42", { admin: true })

//           // const data = await admin.auth().getUser("nrQusvIuPoa41IuYf89805c42X42")

//           // Verify Token
//           // const token = await admin.auth().createCustomToken("nrQusvIuPoa41IuYf89805c42X42");
//           // console.log(' token ==========>>> ',  token )
//           // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcyMDA5Njc3MSwiZXhwIjoxNzIwMTAwMzcxLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay00eDY0NEBhcmNoZWQtcm91dGVyLTQyMjUxMC1uNi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLTR4NjQ0QGFyY2hlZC1yb3V0ZXItNDIyNTEwLW42LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoibnJRdXN2SXVQb2E0MUl1WWY4OTgwNWM0Mlg0MiJ9.vylCoDglxA2EOElo1cb2FyVWMKwpeIyIZ9548xlvoLbaKOPthedQEqiJ3Mr0Hyx1tjGKuBqPIwR68XcdZ6eN3qgJPdACdmvY4-yqghZr6cPcM6WLwh07w4bSugGGEuMycPV-DDEdlvWGrGrMvGYgSFGxeAzzYSqMmq4HK75WdWcCk96D7LIjgLl2YYQz4fCzjOl0nV0A2qySoKVo6k0m8TBrkzocqdTX6ol_ih9L_JAcShL7eSKYXrfuDVhzkGTAljbUAT9QlJ85ALZfMBn7sJgVwc2s7JZO-dtEQ8IyiDUIaHzK7e4sCBKYzz5u12AUdtXny8YWOlfC_JtEqFUr_g"


//           // const data = await admin.auth().verifyIdToken()



//           // Send successful response
//           return response.success(res, 1001, data);
//      } catch (error) {
//           console.log('error =====>>> ', error);
//           response.error(res, 9999);
//      }
// });


