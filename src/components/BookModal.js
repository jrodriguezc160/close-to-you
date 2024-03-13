import { useState } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";

const BookModal = ({ showBookModal, setShowBookModal }) => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);

  const handleCloseModal = () => {
    setShowBookModal(!showBookModal);
  };

  const searchBook = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' + '&maxResults=5')
      .then(res => setBookData(res.data.items))
      .catch(err => console.log(err))
  }

  // Llama a searchBook cada vez que cambia el valor del input
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    searchBook();
  }

  return (
    <div className={`modal-screen ${showBookModal ? 'visible' : ''}`} >
      <div className="modal">
        <div className="search-bar">
          <input type="text" name="book-search" id="book-search" placeholder='Search for your favourite books...' value={search} onChange={handleInputChange} />
          <div className="ic-container" onClick={handleCloseModal} style={{ marginRight: "0px" }} >
            <FiX />
          </div>
        </div>

        <div className={`books-list ${bookData.length > 0 ? 'visible' : ''}`}>
          {bookData.map((book, index) => (
            <div key={index} className='book-result'>
              <div className='book-cover'>
                <img src={book.volumeInfo.imageLinks?.thumbnail} />
              </div>

              <p>{book.volumeInfo.title}</p>
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
