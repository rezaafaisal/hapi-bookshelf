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
        path: "/",
        handler: addBook,
        options: {
            validate: {
                payload: Joi.object({
                    judul: Joi.string().min(3),
                    penulis: Joi.string().min(3),
                    tahun: Joi.number(),
                    kategori: Joi.string().min(3),
                })
            }
        }
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
    }
]

export default route