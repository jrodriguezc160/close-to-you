import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";

const BookModal = ({ showBookModal, setShowBookModal, myFavBooks, setMyFavBooks, myBooks, setMyBooks }) => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [showLimit, setShowLimit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedBooks = sessionStorage.getItem('myFavBooks');
    if (savedBooks) {
      setMyFavBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    if (myFavBooks.length > 0) {
      sessionStorage.setItem('myFavBooks', JSON.stringify(myFavBooks));
    }
  }, [myFavBooks]);


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
    if (myFavBooks.length >= 3) {
      console.log('Límite excedido')
      setShowLimit(true)
      setTimeout(() => {
        setShowLimit(false)
      }, 2000);
    } else {
      setMyFavBooks([...myFavBooks, book])
    }
  }

  const handleRemoveFavourite = (bookToRemove) => {
    const updatedBooks = myFavBooks.filter(book => book !== bookToRemove);
    setMyFavBooks(updatedBooks);
  }

  const handleAddBook = (book) => {
    setMyBooks([...myBooks, book])
  }

  const handleRemoveBook = (bookToRemove) => {
    const updatedBooks = myBooks.filter(book => book !== bookToRemove);
    setMyBooks(updatedBooks);
  }

  return (
    <div>
      <div className={`modal-screen ${showLimit ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }} >
        <div className={`modal-message ${showLimit ? 'visible' : ''}`} style={{ zIndex: '201', visibility: showLimit ? 'visible' : 'hidden', opacity: showLimit ? 1 : 0 }}>
          <div className="ic-container" style={{ width: '64px', height: '64px' }} >
            <FiAlertTriangle fill='white' stroke='rgb(222, 0, 0)' />
          </div>
          <p>Límite de favoritos: 3.</p>
          <p>Elimine un favorito para continuar</p>
        </div>
      </div>
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
                  <FiStar
                    onClick={() => {
                      if (myFavBooks.some(favBook => favBook.id === book.id)) {
                        handleRemoveFavourite(book);
                      } else {
                        handleAddFavourite(book);
                      }
                    }}
                    fill={myFavBooks.some(favBook => favBook.id === book.id) ? 'gray' : 'none'}
                  />

                </div>
                <div className='ic-container' >
                  {!myBooks.some(favBook => favBook.id === book.id) ? (
                    <FiPlusCircle
                      onClick={() => handleAddBook(book)}
                      stroke='gray'
                    />
                  ) : (
                    <FiCheckCircle
                      onClick={() => handleAddBook(book)}
                      stroke='gray'
                    />
                  )
                  }
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: '32px', paddingBottom: '0px' }}>
            <h3 style={{ margin: '2px' }}>My favourite books</h3>
            <p style={{ margin: '2px' }}>You can only set 3 fav so choose wisely;)</p>
          </div>
          <div className="fav-books">
            {myFavBooks.map((book, index) => (
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

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <div className='ic-container' >
                    <FiStar
                      onClick={() => {
                        if (myFavBooks.some(favBook => favBook.id === book.id)) {
                          handleRemoveFavourite(book);
                        } else {
                          handleAddFavourite(book);
                        }
                      }}
                      fill={myFavBooks.some(favBook => favBook.id === book.id) ? 'gray' : 'none'}
                    />
                  </div>
                  <div className='ic-container' >
                    {!myBooks.some(favBook => favBook.id === book.id) ? (
                      <FiPlusCircle
                        onClick={() => handleAddBook(book)}
                        stroke='gray'
                      />
                    ) : (
                      <FiCheckCircle
                        onClick={() => handleRemoveBook(book)}
                        stroke='gray'
                      />
                    )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: '32px', paddingBottom: '0px' }}>
            <h3 style={{ margin: '2px' }}>My books</h3>
            <p style={{ margin: '2px' }}>(all of them)</p>
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

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <div className='ic-container' >
                    <FiStar
                      onClick={() => {
                        if (myFavBooks.some(favBook => favBook.id === book.id)) {
                          handleRemoveFavourite(book);
                        } else {
                          handleAddFavourite(book);
                        }
                      }}
                      fill={myFavBooks.some(favBook => favBook.id === book.id) ? 'gray' : 'none'}
                    />
                  </div>
                  <div className='ic-container' >
                    {!myBooks.some(favBook => favBook.id === book.id) ? (
                      <FiPlusCircle
                        onClick={() => handleAddBook(book)}
                        stroke='gray'
                      />
                    ) : (
                      <FiCheckCircle
                        onClick={() => handleRemoveBook(book)}
                        stroke='gray'
                      />
                    )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ minHeight: '5vh' }}></div>
        </div>
      </div>
    </div>
  )
}

export default BookModal;