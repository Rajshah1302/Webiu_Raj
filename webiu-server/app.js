const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const contributorRoutes = require('./routes/contributorRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/project', projectRoutes);

app.use('/api/contributor',contributorRoutes);

module.exports = app;