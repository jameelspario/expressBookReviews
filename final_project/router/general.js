const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

const methCallGetBookList = new Promise((resolve, reject) => {
  try {
    resolve(books);
  } catch (err) {
    reject(err)
  }
});
// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // const matchingBooks = [];

  // for (const bookId in books) {
  //     const book = books[bookId];
  //       matchingBooks.push(book);
  // }
  // res.send(JSON.stringify(books,null,4));
  // return res.status(200).json(matchingBooks);
  methCallGetBookList.then(
    (data) => res.send(JSON.stringify(data, null, 4)),
    (err) => res.send({ error: err })
  );
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;

  // let data = books[isbn];
  // if (data) {
  //   return res.status(200).json(data);
  // } else {
  //   return res.status(200).json({ message: "no data" });
  // }

  const methCallGetBookbyISBN = new Promise((resolve, reject) => {
    try {
      let data = books[isbn];
      resolve(data);
    } catch (err) {
      reject(err)
    }
  });

  methCallGetBookbyISBN.then(
    (data) => res.status(200).json(data),
    (err) => res.status(200).json({ error: "no data" })
  );

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const authorName = req.params.author;

  // const matchingBooks = [];
  // for (const bookId in books) {
  //   if (books.hasOwnProperty(bookId)) {
  //     const book = books[bookId];
  //     if (book.author.toLowerCase() === authorName.toLowerCase()) {
  //       matchingBooks.push(book);
  //     }
  //   }
  // }

  // if (matchingBooks.length > 0) {
  //   return res.status(200).json({ booksbyauthor: matchingBooks });
  // } else {
  //   return res.status(200).json({ message: "no data" });
  // }

  const methCallGetBookbyAuthor = new Promise((resolve, reject) => {
    try {
      const matchingBooks = [];
      for (const bookId in books) {
        if (books.hasOwnProperty(bookId)) {
          const book = books[bookId];
          if (book.author.toLowerCase() === authorName.toLowerCase()) {
            matchingBooks.push(book);
          }
        }
      }
      resolve(matchingBooks);
    } catch (err) {
      reject(err)
    }
  });

  methCallGetBookbyAuthor.then(
    (data) => res.status(200).json({ booksbyauthor: data }),
    (err) => res.status(200).json({ error: "no data" })
  );

});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const title = req.params.title;

  // const matchingBooks = [];
  // for (const bookId in books) {
  //   if (books.hasOwnProperty(bookId)) {
  //     const book = books[bookId];
  //     if (book.title.toLowerCase() === title.toLowerCase()) {
  //       matchingBooks.push(book);
  //     }
  //   }
  // }
  // if (matchingBooks.length > 0) {
  //   return res.status(200).json({ booksbytitle: matchingBooks });
  // } else {
  //   return res.status(200).json({ message: "no data" });
  // }

  const methCallGetBookbyTitle = new Promise((resolve, reject) => {
    try {
      const matchingBooks = [];
      for (const bookId in books) {
        if (books.hasOwnProperty(bookId)) {
          const book = books[bookId];
          if (book.title.toLowerCase() === title.toLowerCase()) {
            matchingBooks.push(book);
          }
        }
      }
      resolve(matchingBooks);
    } catch (err) {
      reject(err)
    }
  });

  methCallGetBookbyTitle.then(
    (data) => res.status(200).json({ booksbytitle: data }),
    (err) => res.status(200).json({ error: "no data" })
  );
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  let data = books[isbn];
  // data['reviews']
  if (data) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(200).json({ message: "no data" });
  }
});

module.exports.general = public_users;
