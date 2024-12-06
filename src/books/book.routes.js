const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBook,
  getABook,
  updateBook,
  deleteBook,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const router = express.Router();

// frontend=> backend server => controller => bookSchema => database =>send to the server => back to the frontend
// post- when submit something frontend to db
// get - when you get something from db
// put/patch - when edit / update something
// delete - when delete something

// post a book
router.post("/create-book",verifyAdminToken, postABook);

// get all book
router.get("/", getAllBook);

// get book by id
router.get("/:id", getABook);

// update a book
router.put('/edit/:id',verifyAdminToken, updateBook);

// delete book
router.delete('/delete/:id',verifyAdminToken,deleteBook)

module.exports = router;
