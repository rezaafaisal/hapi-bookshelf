import { nanoid } from "nanoid"
import books from "./models.js"

const replyError = (status, message) => {
   return {
      status: status,
      message:message
   }
}

const replySuccess = (status, message, data = null) => {
   if(data == null){
      return {
         status: status,
         message: message
      }
   }
   return {
      status: status,
      message: message,
      data: data
   }
}

const getBooks = (res, h) => {
      const simpleBooks = books.map((book) => {
         return {
            id:book.id,
            name: book.name,
            publisher: book.publisher
         }
      })
      return h.response(replySuccess('success', 'Berhasil mengambil data buku', {books: simpleBooks})).code(200)
   }

const getBook = (res, h) => {
   const id = res.params.id
   const book = books.find(item => item.id == id)
   if(book){
      return h.response(replySuccess("success", 'Berhasil', {book:book})).code(200)
   }

   return h.response(replyError("fail", 'Buku tidak ditemukan')).code(404)
}

const addBook = (res, h) => {
   if(res.payload.name == null) return h.response({
      status: "fail",
      message: "Gagal menambahkan buku, Mohon isi nama buku"
   }).code(400)
   const {name, year, author, summary, publisher, pageCount, readPage, reading} = res.payload
   
   const id = nanoid(10)
   let finished = false
   if(readPage > pageCount) return h.response(replyError("fail", "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount")).code(400)
   if(pageCount == readPage) finished = true
   const insertedAt = new Date().toISOString();
   const updatedAt = insertedAt

   const newBook = {
      id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt
   }

   books.push(newBook)

   const success = books.filter((book)=> book.id == id).length > 0
   if(success){
      return h.response(replySuccess("success", {bookId: id})).code(201)
   }
   return h.response(
      replyError("error", "Buku gagal ditambahkan")
   ).code(500)
}

const editBook = (res, h) => {
   if(res.payload.name == null) return h.response({
      status: "fail",
      message: "Gagal menambahkan buku, Mohon isi nama buku"
   }).code(400)
   const id = res.params.id
   const {name, year, author, summary, publisher, pageCount, readPage, reading} = res.payload

   let finished = false
   if(readPage > pageCount) return h.response(replyError("fail", "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount")).code(400)
   if(pageCount == readPage) finished = true
   const updatedAt = new Date().toISOString()
   
   const index = books.findIndex(item => item.id == id)
   if(books.filter((book)=> book.id == id).length == 0){
      return h.response(replyError("fail", "Gagal memperbarui buku. Id tidak ditemukan")).code(404)
   }
   // return index
   if(index > -1){
      books[index] = {
         ...books[index],
         name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
      }
      return h.response(replySuccess("success", "Buku berhasil diperbarui")).code(200)
   }
   return h.response(replyError("error", "Terjadi Kesalahan")).code(500)
}

const deleteBook = (res, h) => {
   const id = res.params.id
   const index = books.findIndex(item => item.id == id)
   if(books.filter((book)=> book.id == id).length == 0){
      return h.response(replyError("fail", 'Buku gagal dihapus. Id tidak ditemukan'))
   }
   if(index >= 0){
      books.splice(index, 1)
      return h.response(replySuccess("success", 'Buku berhasil dihapus'))
   }
      return h.response(replyError("error", 'Buku gagal dihapus'))

}
   
export { getBooks, addBook, getBook, editBook, deleteBook}