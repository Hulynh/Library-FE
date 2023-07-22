import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context';
import './index.css';
import Home from './home/home';

import BookDetails from "./components/bookDetails/bookDetails";
import BookList from "./components/booklist/booklist";
import Comments from './components/comment/comments';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="book" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="comment" element={<Comments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
