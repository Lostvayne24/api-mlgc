const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224,224])
    .expandDims()
    .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const probability = Math.max(...score) * 100;
    const classResult = probability > 50 ? 'Cancer' : 'Non-cancer';
    const label = classResult;

    let suggestion;
    if (label === 'Cancer') {
      suggestion = "Segera periksa ke dokter!"  
    }else  {
      suggestion = "Anda sehat!"
    }

    return { probability, label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input : ${error.message}`);
  }
}

module.exports = predictClassification;