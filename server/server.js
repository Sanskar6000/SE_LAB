const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = require('./routes/userRouter.js')
const infoRouter = require('./routes/infoRouter.js')

const app = express();


app.use(cors());
app.use(express.json());

//routes
app.use('/users', userRouter)
app.use('/api/info', infoRouter)

// mongo_username = sanskaryerawar;
// mongo_pass = PtquC31TB5vO6U2d;

app.get('/', (req, res) => {
    res.json("Hello");
})

const URI = "mongodb+srv://sanskaryerawar:PtquC31TB5vO6U2d@cluster0.6vc1ofu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URI, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});