const request = require("supertest");
const server = require("./server-for-tests");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb();
    app = await server.startserver();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await server.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer(); //finish the server
    await server.closeDB();
});

/**
 * Product test suite.
 */
describe("user ", () => {
    /**
     * Test that we can list users without any error.
     */
    it("can be listed",async () => {
        const response = await request(app).get("/api/users/lista");
        expect(response.statusCode).toBe(200);
    });

    
});