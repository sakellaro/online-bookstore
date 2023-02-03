import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    categories: [{
        type: String,
        required: true
    }],
    authors: [{
        type: String,
        required: true
    }],
    publisher: {
        type: String, 
        required: true
    },
    year: {
        type: String, 
        required: true
    },
    numberOfPages: {
        type: String, 
        required: true
    },
    rating: {
        type: String, 
        required: true
    },
    isbn10: {
        type: String, 
        required: true
    },
    isbn13: {
        type: String, 
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema)

export default Book