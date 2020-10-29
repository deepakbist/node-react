const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://deepak:test@123@cluster0.8ounu.mongodb.net/deepak?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
require('./models/User');


const app = express();
app.use(bodyParser.json());

require('./routes/userRoutes')(app);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});