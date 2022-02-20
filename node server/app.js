const express = require('express');
const app = express();
const courseRoutes = require('./routes/CourseRoutes');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');



var corsOptions = {
    origin: "http://localhost:3001"
  };

app.use(cors(corsOptions));

app.use(helmet());
app.use(xss());
app.use(express.json())


app.use(express.urlencoded({extended : true}));

app.use('/api',courseRoutes);


module.exports = app;