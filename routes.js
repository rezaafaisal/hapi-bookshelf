import Joi from "joi"
import { addBook, getBooks, getBook, editBook, deleteBook } from "./controller.js"

const route = [
    {
        method: "GET",
        path: "/books",
        handler: getBooks,
        
    },
     {
        method: "GET",
        path: "/books/{id}",
        handler: getBook,
        
    },
    {
        method: "POST",
        path: "/books",
        handler: addBook,
    },
    {
        method: "PUT",
        path: "/books/{id}",
        handler: editBook
    },
    {
        method : "DELETE",
        path: "/books/{id}",
        handler: deleteBook
    },
]

export default route