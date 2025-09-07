const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/user.model');
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Viraji!')
})

// Get all users.
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get user by id.
app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Create new user.
app.post('/api/user', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update exists user.
app.put('/api/user/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findByIdAndUpdate(id, req.body)

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        const updateUser = await User.findById(id)

        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete exists user.
app.delete('/api/user/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        res.status(200).json({message: 'User deleted successfully!'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb://localhost:27017/')
.then(() => {
    console.log('Connected to database!')
    app.listen(3000, () => {
        console.log('Server is running port 3000')
    })
})
.catch(() => {
    console.log('Connection Fail!')
})  