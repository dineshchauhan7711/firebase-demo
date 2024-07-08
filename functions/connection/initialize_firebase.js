const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

const serviceAccount = require("../../serviceAccountKey.json");
const config = require('./config');

admin.initializeApp({
     credential: admin.credential.cert(serviceAccount),
     databaseURL: config.firebase.DATABASE_URL
});


const db = admin.firestore();
// const bucket = admin.storage().bucket();

module.exports = { db, admin };

