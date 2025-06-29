const request = require('supertest');
const app = require('../src/app');

describe('DevOps Project API Tests', () => {
    test('GET / should return project information', async() => {
        const response = await request(app)
            .get('/')
            .expect(200);

        expect(response.body.message).toContain('DevOps and Refactoring Project API');
        expect(response.body.version).toBe('1.0.0');
        expect(response.body.endpoints).toBeDefined();
    });

    test('GET /health should return health status', async() => {
        const response = await request(app)
            .get('/health')
            .expect(200);

        expect(response.body.status).toBe('OK');
        expect(response.body.timestamp).toBeDefined();
        expect(response.body.uptime).toBeDefined();
    });

    test('POST /register should create a new user', async() => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            age: 25,
            city: 'Test City',
            country: 'Test Country'
        };

        const response = await request(app)
            .post('/register')
            .send(userData)
            .expect(201);

        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.user.username).toBe(userData.username);
        expect(response.body.user.email).toBe(userData.email);
        expect(response.body.user.password).toBeUndefined(); // Password should not be returned
        expect(response.body.token).toBeDefined();
    });

    test('POST /register should validate required fields', async() => {
        const response = await request(app)
            .post('/register')
            .send({})
            .expect(400);

        expect(response.body.error).toContain('required');
    });

    test('POST /login should validate required fields', async() => {
        const response = await request(app)
            .post('/login')
            .send({})
            .expect(400);

        expect(response.body.error).toContain('required');
    });
});