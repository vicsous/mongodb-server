const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookie = require('cookie')
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors')
const port = 3001;

app.use(bodyParser.json());

mongoose.connect(process.env.DB_HOST)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(e => console.log(e.message))

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('User', UserSchema)

const corsConfig = {
    origin: true,
    credentials: true,
};
  
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.get('/', (req, res) => {
    res.send('Miniblog bakckend')
})

app.post('/signup', async (req, res) => {
    try {
        req.body.username = req.body.username.toUpperCase()
        req.body.email = req.body.email.toUpperCase()
        const user = await User.findOne({ username: req.body.username });
        if (user) throw new Error('Username already in use');
        const email = await User.findOne({ email: req.body.email });
        if (email) throw new Error('Email address already in use');
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await User.create(req.body);
        res.status(200).send(`User "${req.body.username}" created`)
    } catch (e) {
        res.status(400).send(e.message);
    }
})

app.post('/post', (req, res) => {
    res.send('new post created!')
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email.toUpperCase()});
        if (!user) throw new Error('Email not found')
        const auth = await bcrypt.compare(req.body.password, user.password);
        if(!auth) throw new Error('Wrong password');
        const refreshToken = await jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '60s' });
        const accessToken = await jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '30s' });
        res.status(200).json({ success: true, accessToken: accessToken, refreshToken: refreshToken, user: { _id: user.id, username: user.username, email: user.email }})
    } catch(error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message});
    }
})

app.post('/user', async (req, res) => {
    try {
        jwt.verify(req.body.refreshToken, '1234', function(err, decoded) {
            if (err) {
                console.log(err.message)
                res.redirect(process.env.FRONT_END_HOST)
            }
        })
    } catch(error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message});
    }
})


app.post('/logout', async (req, res) => {
    try {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize('token', '', {
                httpOnly: true,
                maxAge: new Date(0),
                path: '/'
            })
        );
        res.status(200).json({ success: true })
    } catch(error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message});
    }})

app.use((req, res) => {
    res.status(404).send('Page not found!')
})

app.listen(port, console.log(`MongoDB Server running on port ${port}...`))