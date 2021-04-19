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


/**
 * Product test suite.
 */
 describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        webIdEx = 'WebId'
        locationEx = {lat : 23,lng: 34}
        const response = await request(app).post('/api/users/add').send({webId: webIdEx,location: locationEx}).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webIdEx);
        expect(response.body.location).toStrictEqual(locationEx);
    });
    /**
     * Tests that we get an user from the database
     * */
    it('can get an user by their webId', async () => {
        // Primero guardamos el usuario en la base de datos
        webIdEx = 'WebId'
        locationEx = {lat : 23, lng: 34}
        let response = await request(app).post('/api/users/add')
            .send({webId: webIdEx,location: locationEx}).set('Accept', 'application/json');


        // Lo recuperamos con su webId
        response = await request(app).get('/api/users/byWebId')
            .set('webId', webIdEx);
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webIdEx);
        expect(response.body.location).toStrictEqual(locationEx);
    });
    /**
     * Tests that we get an user with undefined fields when we try
     * to get an un-existing user
     */
    it('get an unexisting user', async () => {
        response = await request(app).get('/api/users/byWebId')
            .set('webId', "Inexistente");
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(undefined);
        expect(response.body.location).toStrictEqual(undefined);
    })
    /**
     * Test that the location of an existing user can be updated
     */
    it('location of an existing user updated correctly', async () => {
        // Añadimos el usuario
        webIdEx = 'WebId'
        locationEx = {lat : 23, lng: 34}
        await request(app).post('/api/users/add')
            .send({webId: webIdEx,location: locationEx}).set('Accept', 'application/json');

        // Actualizamos su localización
        let newLocationEx = {lat: 1, lng: 10}
        const response = await request(app).post('/api/users/update')
            .send({webId: webIdEx, location: newLocationEx}).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webIdEx);
        expect(response.body.location).toStrictEqual(newLocationEx);
    })
    /**
     * Tests that the location of a non-existent user can be updated, adding the user to the database
     */
    it('add a user updating their location', async () => {
        // Intentamos actualizar la ubicación de un usuario que no está en la base de datos
        webIdEx = 'WebId'
        locationEx = {lat : 23, lng: 34}
        const response = await request(app).post('/api/users/update')
            .send({webId: webIdEx,location: locationEx}).set('Accept', 'application/json');

        // Se debería añadir el usuario
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webIdEx);
        expect(response.body.location).toStrictEqual(locationEx);
    })
    /**
     * Tests that the token of an user can be updated
     */
    it('update token of an user', async () => {
        // Añadimos el usuario
        webIdEx = 'WebId'
        locationEx = {lat : 23, lng: 34}
        await request(app).post('/api/users/add')
            .send({webId: webIdEx,location: locationEx}).set('Accept', 'application/json');

        // Actualizamos su token
        let newToken = "123456"
        const response = await request(app).post('/api/users/update/token')
        .send({webId: webIdEx, token: newToken}).set('Accept', 'application/json');
        // El usuario debería tener los valores antiguos y el nuevo token
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webIdEx);
        expect(response.body.location).toStrictEqual(locationEx);
        expect(response.body.token).toStrictEqual(newToken);
    })
    /**
     * Tests that the token of a non-existent user can be updated, adding the user to the database
     */
     it('add a user updating their token', async () => {
        // Intentamos actualizar el token de un usuario que no está en la base de datos
        webIdEx = 'WebId'
        let tokenEx = "123456"
        const response = await request(app).post('/api/users/update/token')
            .send({webId: webIdEx, token: tokenEx}).set('Accept', 'application/json');

        // Se debería añadir el usuario, con las coordenadas de la ubicación vacías
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webIdEx);
        expect(response.body.location).toStrictEqual({
            lat: null,
            lng: null
        });
        expect(response.body.token).toStrictEqual(tokenEx);
    })
});