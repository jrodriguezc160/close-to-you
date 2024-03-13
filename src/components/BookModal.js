import { useState, useRef } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";

const BookModal = ({ showBookModal, setShowBookModal }) => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const inputRef = useRef(null);

  const handleCloseModal = () => {
    setShowBookModal(!showBookModal);
  };

  const searchBook = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' + '&maxResults=20')
      .then(res => setBookData(res.data.items))
      .catch(err => console.log(err))
  }

  // Llama a searchBook cada vez que cambia el valor del input
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    searchBook();
  }

  const handleClearInput = () => {
    setSearch('');
  }

  return (
    <div className={`modal-screen ${showBookModal ? 'visible' : ''}`} >
      <div className="modal">
        <div className="search-bar">
          <div className='search-bar-input'>
            <input ref={inputRef} type="text" name="book-search" id="book-search" placeholder='Search for your favourite books...' value={search} onChange={handleInputChange} />
            <div className='ic-container' onClick={handleClearInput}>
              <FiDelete />
            </div>
          </div>

          <div className="ic-container" onClick={handleCloseModal} >
            <FiX />
          </div>
        </div>

        <div className={`books-list ${bookData.length > 0 ? 'visible' : ''}`}>
          {bookData.map((book, index) => (
            <div key={index} className='book-result'>
              <div className='book-cover'>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                ) : (
                  <div style={{ width: '50%', height: '50%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FiImage />
                  </div>
                )}
              </div>
              <p>{book.volumeInfo.title}</p>
              <p>{book.volumeInfo.author}</p>
              <div className='ic-container'>
                <FiStar />
              </div>
            </div>
          ))}
        </div>

        <div className="fav-books">
          {/* Aquí van los libros favoritos */}
        </div>
      </div>
    </div>
  )
}

export default BookModal;
