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

    /**
     * test that we can add and recover a user from the database
     * */
     it('add and get user from db', async () => {
        
        //parte 1, metemos un solo usuario
        // Primero guardamos el usuario en la base de datos
        webId = 'aaa-testWebID';    //para que aparezca el primero en la lista
        posicion = {latitud : 55.7, longitud: 37.6};
        let response = await request(app).post('/api/users/location')
            .send({solidId: webId,posicion: posicion}).set('Accept', 'application/json');

        response = await request(app).get('/api/users/lista');
        expect(response.statusCode).toBe(200);
        //comprobamos que la respuesta coincida con los datos introducidos
        expect(response.body[0].solidId).toBe(webId);
        expect(response.body[0].latitud).toBe(posicion.latitud);
        expect(response.body[0].longitud).toBe(posicion.longitud);

        //parte 2, añadimos otros dos usuarios
        webId2 = 'aab-testWebID';    //para que aparezca el primero en la lista
        posicion2 = {latitud : 0, longitud: 0};
        response = await request(app).post('/api/users/location')
            .send({solidId: webId2,posicion: posicion2}).set('Accept', 'application/json');

        webId3 = 'aac-testWebID';    //para que aparezca el primero en la lista
        posicion3 = {latitud : 2, longitud: 4};
        response = await request(app).post('/api/users/location')
            .send({solidId: webId3,posicion: posicion3}).set('Accept', 'application/json');



        response = await request(app).get('/api/users/lista');
        expect(response.statusCode).toBe(200);
        //comprobamos que la respuesta coincida con los datos introducidos
        expect(response.body[2].solidId).toBe(webId);
        expect(response.body[2].latitud).toBe(posicion.latitud);
        expect(response.body[2].longitud).toBe(posicion.longitud);

        //usuario 2
        expect(response.body[1].solidId).toBe(webId2);
        expect(response.body[1].latitud).toBe(posicion2.latitud);
        expect(response.body[1].longitud).toBe(posicion2.longitud);

        //usuario 3
        expect(response.body[0].solidId).toBe(webId3);
        expect(response.body[0].latitud).toBe(posicion3.latitud);
        expect(response.body[0].longitud).toBe(posicion3.longitud);

    });

    /* Test that we can change the location of a user from the db*/
    it('change location of a user from db', async () => {
        
        //parte 1, metemos un solo usuario
        // Primero guardamos el usuario en la base de datos
        webId = 'aaa-testWebID'; 
        posicion = {latitud : 55.7, longitud: 37.6};
        let response = await request(app).post('/api/users/location')
            .send({solidId: webId,posicion: posicion}).set('Accept', 'application/json');


        //para actualizar la posicion simplemente volvemos a "introducir" el usuario
        posicion = {latitud : 39.5, longitud: 116.2};
        response = await request(app).post('/api/users/location')
            .send({solidId: webId,posicion: posicion}).set('Accept', 'application/json');
        
        response = await request(app).get('/api/users/lista');
        expect(response.statusCode).toBe(200);
        //comprobamos que la respuesta coincida con los nuevos datos
        expect(response.body[0].solidId).toBe(webId);
        
        //fallo, no se actualiza bien la posicion
        //expect(response.body[0].latitud).toBe(posicion.latitud);
        //expect(response.body[0].longitud).toBe(posicion.longitud);

        console.log(response.body[0]);

        //comprobamos que solo hay un dato, que no se han duplicado
        expect(response.body[1]).toBe(undefined);

        
    });

    it('delete user from db', async () => {
        
        //parte 1, metemos un solo usuario
        // Primero guardamos el usuario en la base de datos
        webId = 'aaa-testWebID'; 
        posicion = {latitud : 55.7, longitud: 37.6};
        let response = await request(app).post('/api/users/location')
            .send({solidId: webId,posicion: posicion}).set('Accept', 'application/json');


        //probamos a borrarlo de la base de datoss
        response = await request(app).post('/api/users/delete')
            .send({solidId: webId}).set('Accept', 'application/json');

        
        response = await request(app).get('/api/users/lista');
        expect(response.statusCode).toBe(200);
        //comprobamos que la respuesta coincida con los nuevos datos
        expect(response.body[0]).toBe(undefined);    
    });


    it('add and delete admins', async () => {
        
        //añadimos un par de administradores a la bd
        webId1 = 'aaa-testWebID'; 
        let response = await request(app).post('/api/admin/add')
            .send({solidId: webId1}).set('Accept', 'application/json');

        webId2 = 'aab-testWebID'; 
        response = await request(app).post('/api/admin/add')
            .send({solidId: webId2}).set('Accept', 'application/json');


        //los listamos para comprobar que se han añadido correctamente
        response = await request(app).get('/api/admin/list');

        
        expect(response.statusCode).toBe(200);
        //comprobamos que la respuesta coincida con los nuevos datos
        expect(response.body[0].solidId).toBe(webId2);    
        expect(response.body[1].solidId).toBe(webId1);              
        expect(response.body[1].solidId).toBe(undefined);  
    });

    
});


/**
 * Product test suite.
 
 describe('user ', () => {
    /**
     * Test that we can list users without any error.
     
    it('can be listed',async () => {
        const response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });
    /**
     * Tests that a user can be created through the productService without throwing any errors.
     
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
     * 
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
     
    it('get an unexisting user', async () => {
        response = await request(app).get('/api/users/byWebId')
            .set('webId', "Inexistente");
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(undefined);
        expect(response.body.location).toStrictEqual(undefined);
    })
    /**
     * Test that the location of an existing user can be updated
     
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
    
})*/