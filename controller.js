import { nanoid } from "nanoid"
import books from "./models.js"

const replyError = (status, message) => {
   return {
      status: status,
      message:message
   }
}

const replySuccess = (status, message, data) => {
   return {
      status: status,
      message: message,
      data: data
   }
}

const getBooks = (res, h) => {
      return h.response(replySuccess('success', {books: books})).code(200)
   }

const getBook = (res, h) => {
   // const id = res.params.id
   // const book = books.find(item => item.id == id)
   // if(book){
   //    return h.response(reply(true, 'Berhasil', book))
   // }

   // return h.response(reply(false, 'Gagal mengambil buku'))
}

const addBook = (res, h) => {
   if(res.payload.name == null) return {
      status: "fail",
      message: "Gagal menambahkan buku, Mohon isi nama buku"
   }
   const {name, year, author, summary, publisher, pageCount, readPage, reading} = res.payload
   
   const id = nanoid(10)
   let finished = false
   if(readPage > pageCount) return h.response(replyError("fail", "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"))
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
   return h.response("Gagal gengs").code(500)
}

const editBook = (res, h) => {
   // const id = res.params.id
   // const {judul, penulis, tahun, kategori} = res.payload
   // const updated_at = new Date().toISOString()
   
   // const index = books.findIndex(item => item.id == id)
   // if(index > -1){
   //    books[index] = {
   //       ...books[index],
   //       judul,
   //       penulis,
   //       tahun,
   //       kategori,
   //       updated_at
   //    }
   //    return h.response(reply(true, 'Berhasil mengubah buku', books[index]))
   // }

   // return h.response(reply(false, 'Gagal mengedit buku'))
}

const deleteBook = (res, h) => {
   // const id = res.params.id
   // const index = books.findIndex(item => item.id == id)
   // if(index >= 0){
   //    books.splice(index, 1)
   //    return h.response(reply(true, 'Berhasil dihapus'))
   // }

   // return h.response(reply(false, 'Gagal menghapus buku'))
}
   
export { getBooks, addBook, getBook, editBook, deleteBook}