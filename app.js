const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

// Load environment variables
dotenv.config({ path: ['.env.local', '.env'] });

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session Middleware
app.use(session({
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process if MongoDB connection fails
    });

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: String,
    location: String,
    skillsOffered: [String],
    skillsWanted: [String],
    availability: [String],
    visibility: { type: String, default: 'public' },
    profilePicture: String,
    rating: Number
});

const User = mongoose.model('User', userSchema);

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) return res.redirect('/login');

    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key', (err, user) => {
        if (err) return res.redirect('/login');
        req.user = user;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/profile');
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.render('login', { error: 'Invalid username or password', user: null });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'fallback-secret-key', { expiresIn: '1h' });
    req.session.token = token;
    req.session.user = user;
    res.redirect('/profile');
});

app.get('/signup', (req, res) => {
    if (req.session.user) return res.redirect('/profile');
    res.render('signup', { error: null });
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.render('signup', { error: 'Username already exists', user: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        password: hashedPassword,
        skillsOffered: [],
        skillsWanted: [],
        availability: [],
        visibility: 'public'
    });

    await user.save();
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'fallback-secret-key', { expiresIn: '1h' });
    req.session.token = token;
    req.session.user = user;
    res.redirect('/profile');
});

app.get('/profile', authenticateToken, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.render('profile', { user });
});

app.post('/profile', authenticateToken, async (req, res) => {
    const { fullname, location, skillsOffered, skillsWanted, days, visibility } = req.body;
    const user = await User.findById(req.user.id);

    user.fullname = fullname || user.fullname;
    user.location = location || user.location;
    user.skillsOffered = skillsOffered || user.skillsOffered;
    user.skillsWanted = skillsWanted || user.skillsWanted;
    user.availability = days ? (Array.isArray(days) ? days : [days]) : user.availability;
    user.visibility = visibility || user.visibility;

    // Handle profile picture upload
    if (req.files && req.files.profilePicture) {
        const file = req.files.profilePicture;
        const uploadPath = path.join(__dirname, 'public', 'media', `${user._id}.jpg`);
        await file.mv(uploadPath);
        user.profilePicture = `/media/${user._id}.jpg`;
    }

    await user.save();
    req.session.user = user;
    res.redirect('/profile');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));