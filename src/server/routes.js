const postPredictHandler = require('../server/handler');

const routes = [
  {
    path: '/predicts',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000000, // Maksimal size file 1MB
        parse: true,
        output: 'file',
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  }
]

module.exports = routes;