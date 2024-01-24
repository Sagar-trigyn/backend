
const express = require('express')
const router = express.Router()

const documentController = require('../controllers/docementController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');


router.post('/upload/document',isAuthenticated,authorizeRoles('admin') , documentController.uploadDocument);

router.get('/documents', documentController.getAllDocuments);

router.get('/folders', documentController.getAllFolders);

router.get('/document/:id', documentController.getDocument);

router.delete('/document/:id', documentController.deleteDocument);

router.put('/document/:id', documentController.updateDocument);

router.get('/get/document', documentController.getFolderContents);

module.exports = router