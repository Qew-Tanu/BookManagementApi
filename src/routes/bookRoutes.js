const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', bookController.getAllBooks); // Public access to view books
router.get('/:id', bookController.getBookById); // Public access to view a book details
router.post('/', verifyToken, bookController.createBook);
router.patch('/:id', verifyToken, bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);

module.exports = router;
