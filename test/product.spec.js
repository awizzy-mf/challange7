const supertest = require("supertest");
const app = require("../app");

const product = {
  id: "",
  name: "RAM Corsair",
  quantity: 1,
};

// create product
describe("TEST POST /products endpoint", () => {
  // positive
  test("create success : success create product", () => {
    return supertest(app)
      .post("/products")
      .send(product)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data).toHaveProperty("name");
        expect(res.body.data).toHaveProperty("quantity");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("success");

        product.id = res.body.data.id;
      });
  });
//   negative
  test("create product: failed to create product because it has already been made", () => {
    return supertest(app)
      .post("/products")
      .send(product)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("name already exist");

      });
  });

// showAll
  describe("TEST /products endpoint", () =>{
    test("Get All product", () =>{
        return supertest(app)
        .get("/products")
        .then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.body).toHaveProperty("status")
            expect(res.body).toHaveProperty("message")
            expect(res.body).toHaveProperty("data")
            expect(res.body.status).toBe(true)
            expect(res.body.message).toBe("Show all product success")
        })
    })
  })
// get By Id product
describe('TEST get by id /products/:product_id endpoint', () => {
    // positive
    test('get by id : product_id', () => {
        return supertest(app)
            .get("/products/" + product.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('quantity');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('get detail product id success');
            });
    });
});

 //negative
 test('TEST Get By Id : product_id not found', () => {
    return supertest(app)
        .get('/products/99999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe(`can't find product with id, product id not found!`);
        });
});
// update product
describe('TEST UPDATE /products/:product_id', () => {
    // positive
    test('update product with id', () => {
        return supertest(app)
            .put(`/products/` + product.id)
            .send({ quantity : 2})
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('update product with id success');
            });
    });
})
//negative
test('update failed', () => {
    return supertest(app)
        .put('/products/9999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("can't find product with id product!");
        });
});
describe('TEST DELETE /products/:product_id', () => {
    // positive
    test('delete product with product id', () => {
        return supertest(app)
            .delete(`/products/` + product.id)
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
test('delete failed :  not correct product_id', () => {
    return supertest(app)
        .delete('/products/9999')
        .then(res => {
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('status');
            expect(res.body).toHaveProperty('message');
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("can't find product with product id!");
        });
});
})

