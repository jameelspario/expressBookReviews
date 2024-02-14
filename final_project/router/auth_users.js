const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  let user = users.filter((user)=>{
    return user.username === username
  });
  if(user.length > 0){
    return true;
  } else {
    return false;
  }

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      user: username
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
  }
  return res.status(200).json({message: "User successfully logged in"});
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  const review1 = req.query.review;
  if(!review1){
    return res.status(200).json({message: "Review not given"});
  }
  let data = books[isbn];
  let rvw = data['reviews'];
  // let hasRvw = rvw[req.user];
  rvw[req.user] = review1;
  res.status(200).json({ message:"review added or updated" }); 
  
});

regd_users.delete("/auth/review/:isbn", (req, res) =>{
  const isbn = req.params.isbn;
  let data = books[isbn];
  let rvw = data['reviews'];
  let hasRvw = rvw[req.user];
  if(hasRvw){
    delete rvw[req.user];
    res.status(200).json({ message:"review deleted" });
  }else{
    res.status(200).json({ message:"review not available" });
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
