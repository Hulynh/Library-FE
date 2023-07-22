import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../loader/loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./bookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Comments from '../comment/comments';
const google_images = require("free-google-images");

const URL = "http://localhost:3001/api/book/";
const BookDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function getBookDetails() {
            try {
                const response = await fetch(`${URL}${id}`);
                const { data } = await response.json();
                console.log(data);
                google_images.search(data.title).then(results => results.forEach(r => console.log(r.image.url)))
                if (data) {
                    const { description, title, author, publishedDate, price } = data;
                    const newBook = {
                        description: data ? description : "No description found",
                        title: data ? title : "No title found",
                        cover_img: coverImg,
                        author: data ? author : "No author found",
                        publishedDate: data ? publishedDate : "No published date found",
                        price: data ? Number(price) : "No price found",
                    };
                    setBook(newBook);
                } else {
                    setBook(null);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getBookDetails();
    }, [id]);

    if (loading) return <Loading />;

    return (
        <section className='book-details'>
            <div className='container'>
                <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
                    <FaArrowLeft size={22} />
                    <span className='fs-18 fw-6'>Go Back</span>
                </button>

                <div className='book-details-content grid'>
                    <div className='book-details-img'>
                        <img src={book?.cover_img} alt="cover img" />
                    </div>
                    <div className='book-details-info'>
                        <div className='book-details-item title'>
                            <span className='fw-6 fs-24'>{book?.title}</span>
                        </div>
                        <div className='book-details-item description'>
                            <span>{book?.description}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Author: </span>
                            <span className='text-italic'>{book?.author}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Published Date: </span>
                            <span className='text-italic'>{book?.publishedDate}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Price: </span>
                            <span>{book?.price}</span>
                        </div>
                        <Comments />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookDetails
