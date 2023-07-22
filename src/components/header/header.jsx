import React from 'react';
import Navbar from "../navbar/navbar";
import SearchForm from "../searchform/searchform";
import "./header.css";

const Header = () => {
    return (
        <div className='holder'>
            <header className='header'>
                <Navbar />
                <div className='header-content flex flex-c text-center text-white'>
                    <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
                    <p className='header-text fs-18 fw-3'>Let us tenderly and kindly cherish, therefore, the means of knowledge. Let us dare to read, think, speak, and write</p>
                    <SearchForm />
                </div>
            </header>
        </div>
    )
}

export default Header