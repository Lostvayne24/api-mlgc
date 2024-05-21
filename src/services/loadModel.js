const tf = require('@tensorflow/tfjs-node');

async function loadModel(){
  try {
    const model = tf.loadGraphModel(process.env.MODEL_URL);
    console.log('Model berhasil dimuat!');
    return model;
  } catch (error) {
    console.error('Gagal memuat model:', error);
  }
}

module.exports = loadModel;