const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken,bookController.getAllBooks); 
router.get('/detail/:id',verifyToken, bookController.getBookById); 
router.post('/', verifyToken, bookController.createBook);
router.patch('/:id', verifyToken, bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);
router.get('/report', bookController.report);

module.exports = router;
