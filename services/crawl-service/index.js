const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const RabbitMQ = require('./rabbitmq');
const config = require('./config');
const cron = require('cron');
const moment = require('moment');
const articleService = require('./services/articleService');


const {
  exchangeName,
  articleQueue
} = config.rabbitmq;

dotenv.config();


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('ready');
});


const publishArticles = (article) => {
  console.log('start publish ' + article.title);
  rabbitmq.channel.sendToQueue(articleQueue, Buffer.from(JSON.stringify(article)));
};

const crawlArticle = async () => {
  const response = await articleService.getLatestPublishedDate();
  const latest = parseInt(moment.unix(response.data.latest_date).format('x'));
  let count = 0;
  for (let i = 0; i < 300; i++) {
    console.log('crawling : ' + i);
    if (count === 100) {
      console.log('completed! : ' + count);
    }
    await articleService.getArticleVicare()
      .then(response => {
        response.hits.forEach(ele => {
          if (parseInt(moment(ele.date).format('x')) > latest) {
            count++;
            let article = {
              title: ele.title,
              intro: ele.intro,
              vicare_id: ele.id,
              body_html: ele.body_html,
              published_date: ele.date,
              tags: ele.tags.map(tag => tag.slug)
            };
            if (ele.feed_image) {
              article.medium_image = ele.feed_image.medium_image;
              article.thumbnail_image = ele.feed_image.thumbnail_image;
              article.homepage_image = ele.homepage;
            }
            publishArticles(article);
          }
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const job = new cron.CronJob({
  cronTime: '00 35 19 * * 0-6', // Chạy Jobs vào 23h30 hằng đêm
  onTick: function () {
    crawlArticle();
    console.log('Cron jub runing...');
  },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng
});

onRabbitMqConnected = (channel) => {
  console.log('ok now');

};
setTimeout(() => job.start(), 20000);

const rabbitmq = new RabbitMQ(onRabbitMqConnected);


// job.start();
// crawlArticle();


const server = app.listen(app.get('port'), () => {
  const port = server.address().port;
  console.log('Server running at http://localhost:' + port);
});
