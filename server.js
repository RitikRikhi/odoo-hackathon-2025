const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/ticket');

dotenv.config();
const app = express();

app.use(cors());

// 🔥 THIS MUST BE BEFORE ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server started')))
  .catch(err => console.log(err));