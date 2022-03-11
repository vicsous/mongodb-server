const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3001;

mongoose.connect('mongodb+srv://miniblog:XOqcSiQS23Zu2qpV@cluster0.nihye.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log(error.message))

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('User', UserSchema)

app.get('/', (req, res) => {
    res.send('Miniblog bakckend')
})

app.post('/user', (req, res) => {
    User.create({
        username: 'String',
        email: 'String',
        password: 'String'
    })
    .then(() => res.status(200).send('Success!!!'))
    .catch((e) => res.status(401).send(e.message))
})

app.post('/post', (req, res) => {
    res.send('new post created!')
})

app.post('/login', (req, res) => {
    res.send('user logged in!')
})

app.use((req, res) => {
    res.status(404).send('Page not found!')
})

app.listen(port, console.log(`Miniblog Backend running on port ${port}!`))
