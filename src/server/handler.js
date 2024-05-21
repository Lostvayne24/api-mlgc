const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const loadAllData = require('../services/loadAllData');

async function postPredictHandler (request, h) {
  const imageBuffer = Buffer.from(request.payload.image);
  const { model } = request.server.app;
  const { probability, label, suggestion } = await predictClassification (model, imageBuffer);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const data = {
    "id": id,
    "probability": probability,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt 
  };

  await storeData(id, data);
  const response = h.response({
    status: 'success',
    message : 'Model is predicted successfully.',
    data,
  });
  response.code(201);
  return response;
}

async function getAllDataHandler(request, h) {
  const allData = await loadAllData();
  const response = h.response({
    status: "success",
    data: allData,
  });
  response.code(200);
  return response;
}

module.exports = { postPredictHandler, getAllDataHandler };