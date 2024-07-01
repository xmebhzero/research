/**
 * In our application, we want users to be able to add books. All books have a title, an author, and an isbn number!
 * However, a library usually doesn’t have just one copy of a book: it usually has multiple copies of the same book.
 * It wouldn’t be very useful to create a new book instance each time if there are multiple copies of the exact same book.
 * Instead, we want to create multiple instances of the Book constructor, that represent a single book.
 * 
 * Pros:
 *  - The flyweight pattern is useful when you’re creating a huge number of objects, which could potentially drain all available RAM.
 *    It allows us to minimize the amount of consumed memory.
 * 
 * Cons:
 *  - In JS, we can easily solve this problem through prototypal inheritance
 *    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
 */

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const isbnNumbers = new Set();
const bookList = [];

const addBook = (title, author, isbn, availibility, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availibility,
    isbn,
  };

  bookList.push(book);
  return book;
};

const createBook = (title, author, isbn) => {
  const book = isbnNumbers.has(isbn);
  if (book) {
    return book;
  } else {
    const book = new Book(title, author, isbn);
    isbnNumbers.add(isbn);
    return book;
  }
};

addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", isbnNumbers.size);
