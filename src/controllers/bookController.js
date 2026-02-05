const { Book } = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");

const genreList = ["Mystery", "Fantasy", "Romance", "Horror", "Other"];

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
    const { current, pageSize, genre } = req.query;

    const where = {};

    if (genre) {
      where.genre = genre;
    }

    const limitVal = pageSize ? parseInt(pageSize) : 10;

    const offsetVal = current ? (parseInt(current) - 1) * limitVal : 0;

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

exports.report = async (req, res) => {
  try {
    const { genre, startYear, endYear } = req.query;

    const where = {};

    if (startYear && endYear) {
      where.published_year = {
        [Op.between]: [parseInt(startYear), parseInt(endYear)],
      };
    }
    if (genre) {
      where.genre = genre;
    }

    const books = await Book.findAll({
      where: where,
    });

    const getUniqueYears = _.groupBy(books, "published_year");
    const result = [];
    for (const year in getUniqueYears) {
      const bookData = getUniqueYears[year];
      const countData = _.countBy(bookData, "genre");

      const resultYear = {
        year: year,
        ...genreList.reduce((acc, genre) => {
          if (genre === "Other") {
            acc[genre] = countData["null"] || 0;
          } else {
            acc[genre] = countData[genre] || 0;
          }
          return acc;
        }, {}),
        name: String(year),
        value: bookData.length,
      };
      result.push(resultYear);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
