var admin = require("firebase-admin");

var serviceAccount = require("./server-coder-firebase-adminsdk-mwjh1-23bd012d61.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };