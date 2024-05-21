const { Firestore } = require('@google-cloud/firestore');

async function getAllData(){
  const db = new Firestore();
  const snapshotData = await db.collection('predictions').get();
  const allData = [];

  snapshotData.forEach((doc) => {
    allData.push({
      id: doc.id,
      history: doc.data(),
    });
  });
  return allData;
}

module.exports = getAllData;