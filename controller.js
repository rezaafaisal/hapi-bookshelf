import { nanoid } from "nanoid"
import books from "./models.js"

const reply = (success, message, data = null) => {
   return {
      success: success,
      message: message,
      data: data,
   }
}

const getBooks = (res, h) => {
      return h.response(books).code(200)
   }

const getBook = (res, h) => {
   const id = res.params.id
   const book = books.find(item => item.id == id)
   if(book){
      return h.response(reply(true, 'Berhasil', book))
   }

   return h.response(reply(false, 'Gagal mengambil buku'))
}

const addBook = (res, h) => {

   const {judul, penulis, tahun, kategori} = res.payload

   const id = nanoid(10)
   const created_at = new Date().toISOString();
   const updated_at = created_at

   const newBook = {
      id,
      judul,
      penulis,
      tahun,
      kategori,
      created_at,
      updated_at,
   }

   books.push(newBook)

   const success = books.filter((book)=> book.id == id).length > 0
   if(success){
      return h.response({
         success: success,
         message: 'Buku berhasil ditambahkan',
         data: newBook
      }).code(201)
   }
   return h.response("Gagal gengs").code(500)
}

const editBook = (res, h) => {
   const id = res.params.id
   const {judul, penulis, tahun, kategori} = res.payload
   const updated_at = new Date().toISOString()
   
   const index = books.findIndex(item => item.id == id)
   if(index > -1){
      books[index] = {
         ...books[index],
         judul,
         penulis,
         tahun,
         kategori,
         updated_at
      }
      return h.response(reply(true, 'Berhasil mengubah buku', books[index]))
   }

   return h.response(reply(false, 'Gagal mengedit buku'))
}

const deleteBook = (res, h) => {
   const id = res.params.id
   const index = books.findIndex(item => item.id == id)
   if(index >= 0){
      books.splice(index, 1)
      return h.response(reply(true, 'Berhasil dihapus'))
   }

   return h.response(reply(false, 'Gagal menghapus buku'))
}
   
export { getBooks, addBook, getBook, editBook, deleteBook}