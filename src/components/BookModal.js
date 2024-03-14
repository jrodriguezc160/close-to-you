import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";

const BookModal = ({ showBookModal, setShowBookModal, myBooks, setMyBooks }) => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Agregar clase al body cuando el modal está abierto
    if (showBookModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showBookModal]);

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

  const handleAddFavourite = (book) => {
    setMyBooks([...myBooks, book])
  }

  const handleRemoveFavourite = (bookToRemove) => {
    const updatedBooks = myBooks.filter(book => book !== bookToRemove);
    setMyBooks(updatedBooks);
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
                  <img src={book.volumeInfo.imageLinks.thumbnail} />
                ) : (
                  <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FiImage />
                  </div>
                )}
              </div>
              <p style={{ maxWidth: '50%', marginRight: 'auto' }}>{book.volumeInfo.title}</p>
              <p style={{ color: 'gray' }}>{book.volumeInfo.authors}</p>
              <div className='ic-container' >
                <FiStar onClick={() => handleAddFavourite(book)} />
              </div>
            </div>
          ))}
        </div>

        <div className="fav-books">
          {myBooks.map((book, index) => (
            <div className="book">
              <div key={index} className='cover'>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img src={book.volumeInfo.imageLinks.thumbnail} />
                ) : (
                  <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FiImage />
                  </div>
                )}
              </div>

              <p>{book.volumeInfo.title}</p>
              <p style={{ color: 'gray' }}>{book.volumeInfo.authors}</p>
              <div className='ic-container' >
                <FiStar onClick={() => handleRemoveFavourite(book)} fill='gray' stroke='gray' />
              </div>
            </div>
          ))}
        </div>

        <div style={{ minHeight: '5vh' }}></div>
      </div>
    </div>
  )
}

export default BookModal;