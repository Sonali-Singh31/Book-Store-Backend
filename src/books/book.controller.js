const Book = require("./book.model");

// post a book function
const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(201).send({
      success: true,
      message: "Book posted successfully!!",
      book: newBook,
    });
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).send({
      message: "Failed to create book",
    });
  }
};

// get all book function
const getAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    if (!books) {
      return res.status(404).send({
        message: "Books not found",
      });
    } else {
      res.status(200).send({
        success: true,
        length: books.length,
        book: books,
      });
    }
  } catch (error) {
    console.log("Error fetching books", error);
    res.status(500).send({
      message: "Failed to fetch books",
    });
  }
};

// get a single book by Id
const getABook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({
        message: "Book not found",
      });
    } else {
      res.status(200).send({
        success: true,
        book: book,
      });
    }
  } catch (error) {
    console.log("Error fetching book", error);
    res.status(500).send({
      message: "Failed to fetch book",
    });
  }
};

// update book data
const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new:true});
        if(!updateBook){
            return res.status(404).send({
                message: "Book not found",
            });
        }
        else{
            res.status(201).send({
                success: true,
                message:"Book updated successfully!!",
                book: updateBook,
            });
        }
    } catch (error) {
        console.log("Error updating a book", error);
        res.status(500).send({
        message: "Failed to update book",
    });
    }
};

// delete book
const deleteBook = async(req,res) =>{
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).send({
                message: "Book not found",
            });
        }
        else{
            res.status(200).send({
                success: true,
                message:"Book Deleted successfully!!"
            });
        }
    } catch (error) {
            console.log("Error deleting a book", error);
            res.status(500).send({
            message: "Failed to delete book",
        });
    }
}

module.exports = { postABook, getAllBook, getABook, updateBook, deleteBook };
