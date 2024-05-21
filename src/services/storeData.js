const { Firestore } = require('@google-cloud/firestore');
const projectId = 'submissionmlgc-ubaydillah';

async function storeData (id, data) {
  const db = new Firestore({
    projectId,
  });

  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

module.exports = storeData;