const express = require('express');
const router = express.Router();
const { createTender, getTender, updateTender, getTenderById, deleteTender } = require('../controllers/tenderController');

const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

router.post('/create', isAuthenticated,authorizeRoles('admin'),createTender);

router.get('/gettender', getTender);

router.get('/get/tender/:id', getTenderById);

router.put('/update/:id',isAuthenticated,authorizeRoles('admin'), updateTender);

router.delete('/delete/:id', isAuthenticated,authorizeRoles('admin'),deleteTender);

module.exports = router;