// Original code with intentional code smells for refactoring demonstration
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// CODE SMELL 1: Hardcoded values and magic numbers
const SECRET_KEY = "hardcoded_secret_123"; // Should be in environment variables
const PORT = 3000; // Magic number, should be configurable

// CODE SMELL 2: Large function with multiple responsibilities
function processUserRegistration(req, res) {
    const { username, email, password, age, city, country } = req.body;

    // Validation logic mixed with business logic
    if (!username) {
        return res.status(400).json({ error: "Username required" });
    }
    if (!email) {
        return res.status(400).json({ error: "Email required" });
    }
    if (!password) {
        return res.status(400).json({ error: "Password required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password too short" });
    }
    if (!email.includes('@')) {
        return res.status(400).json({ error: "Invalid email" });
    }
    if (age < 13) {
        return res.status(400).json({ error: "User too young" });
    }

    // Password hashing
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Database simulation (normally would be database call)
    const user = {
        id: Math.random().toString(36).substr(2, 9),
        username: username,
        email: email,
        password: hashedPassword,
        age: age,
        city: city,
        country: country,
        createdAt: new Date()
    };

    // Token generation
    const token = jwt.sign({ id: user.id, username: user.username },
        SECRET_KEY, { expiresIn: '1h' }
    );

    // Response
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            age: user.age,
            city: user.city,
            country: user.country
        },
        token: token
    });
}

// CODE SMELL 3: Duplicate code
function processUserLogin(req, res) {
    const { username, password } = req.body;

    // Same validation pattern as registration
    if (!username) {
        return res.status(400).json({ error: "Username required" });
    }
    if (!password) {
        return res.status(400).json({ error: "Password required" });
    }

    // Simulate database lookup
    const storedPassword = "$2a$10$XYZ..."; // This would come from database

    if (bcrypt.compareSync(password, storedPassword)) {
        const token = jwt.sign({ username: username },
            SECRET_KEY, { expiresIn: '1h' }
        );

        res.json({
            message: "Login successful",
            token: token
        });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
}

// Routes
app.post('/register', processUserRegistration);
app.post('/login', processUserLogin);

app.get('/', (req, res) => {
    res.json({
        message: 'DevOps and Refactoring Project API',
        version: '1.0.0',
        endpoints: [
            'POST /register - User registration',
            'POST /login - User login'
        ]
    });
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;