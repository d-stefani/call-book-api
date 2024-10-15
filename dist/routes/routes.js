"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const controllerPosts = require('../controllers/controllerPosts');
const controllerGets = require('../controllers/controllerGets');
const controllerPuts = require('../controllers/controllerPuts');
const routes = (() => {
    router.post('/api/login', controllerPosts.postLogin);
    router.post('/api/person', controllerPosts.postPersons);
    router.post('/api/visit', controllerPosts.postVisits);
    router.post('/api/search', controllerPosts.postSearch);
    router.get('/api/persons/:id', controllerGets.getPersons);
    router.get('/api/person/:person_id', controllerGets.getPerson);
    router.get('/api/visits/:person_id', controllerGets.getVisits);
    router.get('/api/visit/:visit_id', controllerGets.getVisit);
    router.put('/api/person/', controllerPuts.person);
    router.put('/api/pactive/', controllerPuts.personActive);
    router.put('/api/visit/', controllerPuts.putVisit);
    return router;
})();
exports.default = routes;
//# sourceMappingURL=routes.js.map