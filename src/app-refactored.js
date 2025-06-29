// Refactored code addressing identified code smells
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// FIXED: Environment variables instead of hardcoded values
const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_for_dev';
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;

// FIXED: Extracted validation logic into separate functions
class ValidationService {
    static validateRegistration(userData) {
        const errors = [];

        if (!userData.username) errors.push("Username required");
        if (!userData.email) errors.push("Email required");
        if (!userData.password) errors.push("Password required");
        if (userData.password && userData.password.length < 6) errors.push("Password too short");
        if (userData.email && !this.isValidEmail(userData.email)) errors.push("Invalid email");
        if (userData.age && userData.age < 13) errors.push("User too young");

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    static validateLogin(userData) {
        const errors = [];

        if (!userData.username) errors.push("Username required");
        if (!userData.password) errors.push("Password required");

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// FIXED: Extracted user service logic
class UserService {
    static async hashPassword(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    static async comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }

    static generateToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    }

    static createUser(userData) {
        return {
            id: Math.random().toString(36).substr(2, 9),
            username: userData.username,
            email: userData.email,
            password: userData.password,
            age: userData.age,
            city: userData.city,
            country: userData.country,
            createdAt: new Date()
        };
    }

    static sanitizeUserForResponse(user) {
        const { password, ...sanitizedUser } = user;
        return sanitizedUser;
    }
}

// FIXED: Separated controller logic
class UserController {
    static async register(req, res) {
        try {
            // Validate input
            const validation = ValidationService.validateRegistration(req.body);
            if (!validation.isValid) {
                return res.status(400).json({ errors: validation.errors });
            }

            // Hash password
            const hashedPassword = await UserService.hashPassword(req.body.password);

            // Create user
            const userData = {...req.body, password: hashedPassword };
            const user = UserService.createUser(userData);

            // Generate token
            const token = UserService.generateToken({
                id: user.id,
                username: user.username
            });

            // Return response
            res.status(201).json({
                message: "User registered successfully",
                user: UserService.sanitizeUserForResponse(user),
                token: token
            });

        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async login(req, res) {
        try {
            // Validate input
            const validation = ValidationService.validateLogin(req.body);
            if (!validation.isValid) {
                return res.status(400).json({ errors: validation.errors });
            }

            // In real application, fetch user from database
            const storedPassword = "$2a$10$XYZ..."; // This would come from database

            // Verify password
            const isValidPassword = await UserService.comparePassword(
                req.body.password,
                storedPassword
            );

            if (isValidPassword) {
                const token = UserService.generateToken({
                    username: req.body.username
                });

                res.json({
                    message: "Login successful",
                    token: token
                });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }

        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

// Routes
app.post('/register', UserController.register);
app.post('/login', UserController.login);

app.get('/', (req, res) => {
    res.json({
        message: 'DevOps and Refactoring Project API - Refactored',
        version: '2.0.0',
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