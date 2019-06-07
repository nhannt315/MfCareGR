class DoctorMailQueueConsumer {
  constructor(data, sendMail) {
    this.data = data;
    this.sendMail = sendMail;
  }

  async process() {
    console.log('FollowedThread queue:');
    const payload = JSON.parse(this.data.content);
    this.sendMail(payload)
  }
}

module.exports = DoctorMailQueueConsumer;