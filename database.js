const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

//for debugging
//const userName = "cs260";
//const password = "cs260Password";
//const hostname = "cluster0.jdw1mv6.mongodb.net/";
//console.log("User " + userName);
//console.log("pass " + password);
//console.log("host " + hostname);


if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('simon').collection('score');

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = {};
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

module.exports = { addScore, getHighScores };
