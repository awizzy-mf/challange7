const supertest = require("supertest");
const app = require("../app");

const supplier = {
  id: "",
  name: "Rizky Maolana",
  address: "Bogor",
};

// create supplier
describe("TEST POST /suppliers endpoint", () => {
  // positive
  test("create success : success create supplier", () => {
    return supertest(app)
      .post("/suppliers")
      .send(supplier)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("address");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");

        supplier.id = res.body.data.id;
      });
  });
//   negative
  test("create supplier: failed to create supplier because it has already been made", () => {
    return supertest(app)
      .post("/suppliers")
      .send(supplier)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("name already exist");

      });
  });

  describe("TEST /suppliers endpoint", () =>{
    test("Get All supplier", () =>{
        return supertest(app)
        .get("/suppliers")
        .then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty("status")
            expect(res.body).toHaveProperty("message")
            expect(res.body).toHaveProperty("data")
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe("Show all supplier success")
        })
    })
  })
// getById supplier
describe('TEST get by id /suppliers/:supplier_id endpoint', () => {
    // positive
    test('get by id : supplier_id', () => {
        return supertest(app)
            .get("/suppliers/" + supplier.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('address');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('get detail supplier id success');
            });
    });
});

 //negative
 test('TEST Get By Id : supplier_id not found', () => {
    return supertest(app)
        .get('/suppliers/9999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can't find supplier with id, supplier id not found!`);
        });
});
// update supplier
describe('TEST UPDATE /suppliers/:supplier_id', () => {
    // positive
    test('update supplier with id', () => {
        return supertest(app)
            .put(`/suppliers/` + supplier.id)
            .send({ name : "Beni"})
            .then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('update supplier with id success');
            });
    });
})
//negative
test('update failed', () => {
    return supertest(app)
        .put('/suppliers/9999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("can't find supplier with id supplier!");
        });
});
describe('TEST DELETE /suppliers/:supplier_id', () => {
    // positive
    test('delete supplier with supplier id', () => {
        return supertest(app)
            .delete(`/suppliers/` + supplier.id)
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
test('delete failed :  not correct supplier_id', () => {
    return supertest(app)
        .delete('/suppliers/9999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("can't find supplier with supplier id!");
        });
});
})

