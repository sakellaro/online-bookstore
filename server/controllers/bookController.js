import Book from '../models/bookModel.js';

export const getBooks = async (req,res) => {
    
    try {
        const books = await Book.find();
        res.status(200).json(books);

    } catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const createBook = async (req,res) => {

    const title = req.body.title
    const description = req.body.description
    const image = req.body.image
    const categories = req.body.categories
    const authors = req.body.authors
    const publisher = req.body.publisher
    const year = req.body.year
    const numberOfPages = req.body.numberOfPages
    const rating = req.body.rating
    const isbn10 = req.body.isbn10
    const isbn13 = req.body.isbn13

    const newBook = new Book({
        title: title,
        description: description,
        image: image,
        categories: categories,
        authors: authors,
        publisher: publisher,
        year: year,
        numberOfPages: numberOfPages,
        rating: rating,
        isbn10: isbn10,
        isbn13: isbn13
    })
    try {

        await newBook.save();

        res.status(201).json(newBook);

    } catch (error){
        
        res.status(409).json({ message: error.message });

    }

}