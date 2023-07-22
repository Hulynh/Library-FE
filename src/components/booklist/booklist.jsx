import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "./book";
import Loading from "../loader/loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./booklist.css";

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: singleBook.id,
      cover_img: coverImg
    }
  });
  console.log(booksWithCovers)

  if (loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            booksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <Book key={index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default BookList