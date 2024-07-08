// Modules
const admin = require('firebase-admin');

// Files/Helpers
const serviceAccount = require("../../serviceAccountKey.json");
const config = require('./config');

admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: config.firebase.DATABASE_URL
});


const db = admin.firestore();

module.exports = { db, admin };

