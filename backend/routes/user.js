const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { z } = require('zod');
const auth = require('../middlewares/middleware');
require('dotenv').config();

// Zod schema for validation
const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    age: z.number().min(18),
    gender: z.enum(['Male', 'Female', 'Other'])
});

// Register Route
router.post('/signup', async (req, res) => {
    try {
        const validatedData = userSchema.parse(req.body);

        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.password, salt);

        const user = new User({
            ...validatedData,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

// Sign-In Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Zod schema for sign-in validation
    const signInSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    try {
        const validatedData = signInSchema.parse(req.body);

        const user = await User.findOne({
             email: validatedData.email 
        });
        if (!user) {
            return res.status(400).json(
                { 
                    message: 'Invalid email or password' 
                }
            );
        }

        const isMatch = await bcrypt.compare(validatedData.password, user.password);
        if (!isMatch) {
            return res.status(400).json(
                {
                     message: 'Invalid email or password' 
                }
            );
        }

        const token = jwt.sign({ 
            id: user._id 
        }, 
        process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'User logged in successfully' });
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

router.get('/profile', auth, async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
