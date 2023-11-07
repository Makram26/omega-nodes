
const mongoose = require('mongoose')

async function start() {
    try {
      //Database Connect
      await mongoose.connect(
        'mongodb://localhost:27017/omeganodes',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        () => {
          console.log("Database Connected");
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

module.exports = start