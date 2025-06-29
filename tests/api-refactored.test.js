const request = require('supertest');
const appRefactored = require('../src/app-refactored');

describe('Refactored DevOps Project API Tests', () => {
    test('GET / should return project information', async() => {
        const response = await request(appRefactored)
            .get('/')
            .expect(200);

        expect(response.body.message).toContain('DevOps and Refactoring Project API - Refactored');
        expect(response.body.version).toBe('2.0.0');
        expect(response.body.endpoints).toBeDefined();
    });

    test('GET /health should return health status', async() => {
        const response = await request(appRefactored)
            .get('/health')
            .expect(200);

        expect(response.body.status).toBe('OK');
        expect(response.body.timestamp).toBeDefined();
        expect(response.body.uptime).toBeDefined();
    });

    test('POST /register should create a new user with improved validation', async() => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            age: 25,
            city: 'Test City',
            country: 'Test Country'
        };

        const response = await request(appRefactored)
            .post('/register')
            .send(userData)
            .expect(201);

        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.user.username).toBe(userData.username);
        expect(response.body.user.email).toBe(userData.email);
        expect(response.body.user.password).toBeUndefined(); // Password should not be returned
        expect(response.body.token).toBeDefined();
    });

    test('POST /register should return detailed validation errors', async() => {
        const response = await request(appRefactored)
            .post('/register')
            .send({
                username: '',
                email: 'invalid-email',
                password: '123'
            })
            .expect(400);

        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.length).toBeGreaterThan(0);
    });

    test('POST /login should validate required fields with detailed errors', async() => {
        const response = await request(appRefactored)
            .post('/login')
            .send({})
            .expect(400);

        expect(response.body.errors).toBeDefined();
        expect(response.body.errors).toContain('Username required');
        expect(response.body.errors).toContain('Password required');
    });
});