var express = require('express');
var router = express.Router();
var qs = require('query-string');
const apiAdapter = require('./apiAdapter');

const DOCTOR_BASE_URL = 'http://doctor-app:3000';
const doctorApi = apiAdapter(DOCTOR_BASE_URL);
const DISEASE_MEDICINE_URL = 'http://disease-medicine-app:3000';
const medicineApi = apiAdapter(DISEASE_MEDICINE_URL);
const PREDICT_URL = 'http://predict-app:5000';
const predictApi = apiAdapter(PREDICT_URL);

const ARTICLE_URL = 'http://article-app:3000';
const articleApi = apiAdapter(ARTICLE_URL);
const THREAD_URL = 'http://toukou-app:3000';
const threadApi = apiAdapter(THREAD_URL);


router.get('/lookUpData', async (req, res) => {
  try {
    var doctorCount = await doctorApi.get('/doctors/total');
    var diseaseCount = await medicineApi.get('/diseases/total');
    var medicineCount = await medicineApi.get('/medicines/total');
    res.send({
      doctor: doctorCount.data.total,
      disease: diseaseCount.data.total,
      medicine: medicineCount.data.total
    });
  } catch (error) {
    res.status(error.response.status).send(error.response.statusText);
  }
});

router.get('/askDoctorData', async (req, res) => {
  console.log('params', req.query);
  try {
    var articleCount = await articleApi.get('/articles/get_total' + '?' + qs.stringify(req.query, {arrayFormat: 'bracket'}));
    // var postCount = await threadApi.get('/posts/get_total');
    res.send({
      article: articleCount.data.total,
      recommend: articleCount.data.recommend_total
      // post: postCount.data.total
    });
  } catch (error) {
    res.status(error.response.status).send(error.response.statusText);
  }
});

router.post('/predict', (req, res) => {
  predictApi.post(req.originalUrl, {content: req.body.content})
    .then(resp => {
      res.send(resp.data);
    });
});


module.exports = router;
