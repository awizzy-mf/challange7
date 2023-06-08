const express = require("express");
const components = require("..//controller//component");
const middleware = require("../utils/auth.js");

const router = express.Router();

router.get('/components', middleware.auth, components.index);
router.get('/components/:id_component', middleware.auth, components.showDetail);
router.post('/components', middleware.auth, middleware.adminOnly, components.store);
router.put('/components/:id_component', middleware.auth, middleware.adminOnly, components.update);
router.delete('/components/:id_component', middleware.auth, middleware.adminOnly, components.destroy);

module.exports = router;