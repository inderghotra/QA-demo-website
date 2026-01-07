const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { getTasks, createTask } = require('../controllers/task.controller');

router.get('/', auth, getTasks);
router.post('/', auth, createTask);

module.exports = router;
