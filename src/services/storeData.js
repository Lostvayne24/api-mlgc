const { Firestore } = require('@google-cloud/firestore');
const projectId = 'submissionmlgc-ubaydillah';

const db = new Firestore({
  projectId,
});

async function storeData (id, data) {
  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

async function getAllData(){
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
module.exports = { storeData, getAllData };