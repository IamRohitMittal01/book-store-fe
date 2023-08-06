import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './booklist.css';

interface Book {
  id: number;
  title: string;
  discountRate: number;
  description: string;
  coverImage: string;
  price: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Book[]>('http://localhost:3000/books', {
        params: { page },
      });
      setBooks((prevBooks) => [...prevBooks, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      fetchBooks();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '50px', // Trigger the callback 50px before the bottom of the container
      threshold: 0,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  return (
    <div>
      <h1>Book List</h1>
      <div className="book-list" ref={containerRef}>
        {books.map((book) => (
          <div className="book-tile" key={book.id}>
            <img src={book.coverImage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <div className="price-container">
              <div style={{ flex: 1 }}>
                <h6 style={{ color: 'red' }}>${book.discountRate}</h6>
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <h6>@${book.price}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading more books...</p>}
    </div>
  );
};

export default BookList;
