const connectionString = 'mongodb+srv://nebojsa_ilic:z!y5hjWRXGSjhzj@mernacademy.vacfo.mongodb.net/mernAcademyDB?retryWrites=true&w=majority'
const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
