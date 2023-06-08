const supertest = require("supertest");
const app = require("../app");

const component = {
  id: "",
  name: "RAM Corsair 5",
  description: "Ram Corsair 1",
};

// create component
describe("TEST POST /components endpoint", () => {
  // positive
  test("create success : success create component", () => {
    return supertest(app)
      .post("/components")
      .send(component)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("description");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");

        component.id = res.body.data.id;
      });
  });
//   negative
  test("create component: failed to create component because it has already been made", () => {
    return supertest(app)
      .post("/components")
      .send(component)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("name already exist");

      });
  });

  describe("TEST /components endpoint", () =>{
    test("Get All component", () =>{
        return supertest(app)
        .get("/components")
        .then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty("status")
            expect(res.body).toHaveProperty("message")
            expect(res.body).toHaveProperty("data")
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe("Show all Component success")
        })
    })
  })
// getById component
describe('TEST get by id /components/:component_id endpoint', () => {
    // positive
    test('get by id : component_id', () => {
        return supertest(app)
            .get("/components/" + component.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('description');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('get detail component id success');
            });
    });
});

 //negative
 test('TEST Get By Id : component_id not found', () => {
    return supertest(app)
        .get('/components/99999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can't find component with id, component id not found!`);
        });
});
// update component
describe('TEST UPDATE /components/:component_id', () => {
    // positive
    test('update component with id', () => {
        return supertest(app)
            .put(`/components/` + component.id)
            .send({ name : "RAM Corsair 2"})
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('update component with id success');
            });
    });
})
//negative
test('update failed', () => {
    return supertest(app)
        .put('/components/9999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("can't find component with id component!");
        });
});
describe('TEST DELETE /components/:component_id', () => {
    // positive
    test('delete component with component id', () => {
        return supertest(app)
            .delete(`/components/` + component.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('success');
            });
    });
});
//negative
test('delete failed :  not correct component_id', () => {
    return supertest(app)
        .delete('/components/9999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("can't find component with component id!");
        });
});
})

