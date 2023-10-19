const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const bodyParser = require('body-parser'); // Require body-parser





const app = express();
// Increase the payload size limit (adjust the limit as needed)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(cors()); // Use the cors middleware
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://Mann:mann123@cluster0.olcashm.mongodb.net/?retryWrites=true&w=majority'; // Update with your MongoDB URI

app.use(express.static('public'));

// Import the auth router
const authRouter = require('./routes/auth');

// Import the posts router
const postRouter = require('./routes/postRoutes');
const connectionRouter = require('./routes/connections');

const profileRouter = require('./routes/profileRoutes');

const searchRouter = require('./routes/search');
const likedRouter = require('./routes/likedislike');

const jobRouter = require('./routes/jobs'); 

const usersRouter = require('./routes/users'); // Import the users route

// Use the jobRouter for the /jobs endpoint
app.use('/jobs', jobRouter);

// Use the auth router for the /auth endpoint
app.use('/auth', authRouter);

// Use the posts router for the /posts endpoint
app.use('/postRoutes', postRouter);

app.use('/profileRoutes', profileRouter);

app.use('/search', searchRouter);

app.use('/likedislike', likedRouter);
app.use('/connection', connectionRouter);

app.use('/users', usersRouter);






mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

