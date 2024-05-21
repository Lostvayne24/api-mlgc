const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler (request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
  const { probability, label, suggestion } = await predictClassification (model, image);

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
    message : 'Berhasil',
    message: probability > 0.5 ? 'Cancer.' : 'Non-cancer',
  })
  response.code(201);
  return response;
}

module.exports = postPredictHandler;