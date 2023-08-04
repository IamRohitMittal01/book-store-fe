import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './booklist.css';

interface Book {
  id: number;
  title: string;
  discountRate: number,
  description: string;
  coverImage: string;
  price: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Make an API call to fetch all books from the server
    axios.get<Book[]>('http://localhost:3000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <div className="book-list">
        {books.map(book => (
          <div className="book-tile" key={book.id}>
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <h6>save ${book.discountRate}</h6>
            <h6>Buy @${book.price}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BookList;
