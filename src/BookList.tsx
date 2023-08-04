import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>Price: ${book.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
