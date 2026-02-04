const { Book } = require("../models");

exports.createBook = async (req, res) => {
  try {
    const { title, author, published_year, genre } = req.body;
    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Title and Author are required." });
    }
    const book = await Book.create({ title, author, published_year, genre });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const { skip, limit, title, author, published_year, genre } = req.query;

    const where = {};
    if (title) {
      where.title = title;
    }
    if (author) {
      where.author = author;
    }
    if (published_year) {
      where.published_year = published_year;
    }
    if (genre) {
      where.genre = genre;
    }

    const limitVal = limit ? parseInt(limit) : 10;

    const offsetVal = skip ? parseInt(skip) : 0;

    const books = await Book.findAll({
      where: where,
      limit: limitVal,
      offset: offsetVal,
    });

    const totalBooks = await Book.count({ where: where });
    res.setHeader("X-Total-Count", totalBooks);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, published_year, genre } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.published_year = published_year || book.published_year;
    book.genre = genre || book.genre;

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const genre = await Book.findAll({
      attributes: ["genre"],
      group: ["genre"],
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
