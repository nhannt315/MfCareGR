var express = require('express');
var router = express.Router();
const apiAdapter = require('./apiAdapter');

const DOCTOR_BASE_URL = 'http://doctor-app:3000';
const doctorApi = apiAdapter(DOCTOR_BASE_URL);
const DISEASE_MEDICINE_URL = 'http://disease-medicine-app:3000';
const medicineApi = apiAdapter(DISEASE_MEDICINE_URL);
const PREDICT_URL = 'http://predict-app:5000';
const predictApi = apiAdapter(PREDICT_URL);


router.get('/lookUpData', async (req, res) => {
  var doctorCount = await doctorApi.get('/doctors/total');
  var diseaseCount = await medicineApi.get('/diseases/total');
  var medicineCount = await medicineApi.get('/medicines/total');
  res.send({
    doctor: doctorCount.data.total,
    disease: diseaseCount.data.total,
    medicine: medicineCount.data.total
  });
});

router.post('/predict', (req, res) => {
  predictApi.post(req.originalUrl, {content: req.body.content})
    .then(resp => {
      res.send(resp.data);
    });
});


module.exports = router;
