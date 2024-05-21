const { Firestore } = require('@google-cloud/firestore');
const projectId = 'submissionmlgc-ubaydillah';

async function getAllData(){
  const db = new Firestore({
    projectId,
  }
  );
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