import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import Book from '../books/Book';
import { addElemento } from '../../services/CollectionsServices';

const BookModal = ({ showBookModal, setShowBookModal, myFavBooks, setMyFavBooks, myBooks, setMyBooks, currentUser }) => {
  const [search, setSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(myFavBooks);
  const [showLimit, setShowLimit] = useState(false);
  const inputRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    showBookModal === true && setModalVisible(true);

    setTimeout(() => {
      let delay = 100;
      const booksDivs = document.querySelectorAll('.book');
      booksDivs.forEach(bookDiv => {
        setTimeout(() => {
          bookDiv.classList.add('visible');
        }, delay);

        delay += 100;
      });
    }, 500);
  }, [showBookModal])

  useEffect(() => {
    localStorage.setItem('myFavBooks', JSON.stringify(myFavBooks));
  }, [myFavBooks]);

  useEffect(() => {
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
  }, [myBooks]);

  useEffect(() => {
    if (modalVisible === true) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalVisible]);

  const handleCloseModal = () => {
    setShowBookModal(!showBookModal);
  };

  const searchBook = () => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' + '&maxResults=15')
      .then(res => setBookData(res.data.items))
      .catch(err => console.log(err));

    console.log('bookData', bookData)
  }

  // Llama a searchBook cada vez que cambia el valor del input
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    searchBook();
  }

  const handleClearInput = () => {
    setSearch('');
    setBookData([]);
  }

  const handleAddFavourite = async (book) => {
    /*     try {
          await addElemento(currentUser, 2, book.title);
        } catch (error) {
          console.error('Error al agregar la publicación: ', error)
        } */

    console.log("LIBROOO: ", book)

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
    const updatedBooks = myFavBooks.filter(book => book.id !== bookToRemove.id);
    setMyFavBooks(updatedBooks);
  }

  const handleAddBook = (book) => {
    setMyBooks([...myBooks, book])
  }

  const handleRemoveBook = (bookToRemove) => {
    const updatedBooks = myBooks.filter(book => book !== bookToRemove);
    setMyBooks(updatedBooks);
  }

  const handleSelectView = (collection) => {
    const booksDivs = document.querySelectorAll('.book');
    booksDivs.forEach(bookDiv => {
      bookDiv.classList.remove('visible');
      console.log('Se ha eliminado la clase .visible')
    });

    setTimeout(() => {
      setSelectedCollection(collection);

      setTimeout(() => {
        let delay = 100;
        const booksDivs = document.querySelectorAll('.book');
        booksDivs.forEach(bookDiv => {
          setTimeout(() => {
            bookDiv.classList.add('visible');
          }, delay);

          delay += 100;
        });
      }, 50);
    }, 300);
  }

  const handleClickExterior = (event) => {
    console.log('Click exteriors')
    if (event.target.classList.contains('modal-screen')) {
      setModalVisible(false)
      setTimeout(() => {
        setShowBookModal(false);
      }, 1000);
    }
  }

  return (
    <div>
      <div className={`modal-screen ${showLimit ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }}>
        <div className={`modal-message ${showLimit ? 'visible' : ''}`} style={{ zIndex: '201', visibility: showLimit ? 'visible' : 'hidden', opacity: showLimit ? 1 : 0 }}>
          <div className="ic-container" style={{ width: '64px', height: '64px' }} >
            <FiAlertTriangle fill='white' stroke='rgb(222, 0, 0)' />
          </div>
          <p>Límite de favoritos: 3.</p>
          <p>Elimine un favorito para continuar</p>
        </div>
      </div>

      <div className={`modal-screen ${modalVisible === true ? 'visible' : ''}`} onClick={handleClickExterior} >
        <div className="modal">
          <div className="text-bar">
            <div className='text-bar-input'>
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

          <div className="books-list visible" style={{ padding: '0px', margin: '0', gap: '0', minHeight: '80px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', height: 'fit-content', padding: '32px 0 0 30px' }}>
              <div className={`heading-toggle ${selectedCollection === myFavBooks ? 'selected' : ''}`} onClick={() => handleSelectView(myFavBooks)}>
                <h3>My favourites</h3>
              </div>
              <div className='heading-toggle'>
                <h3>/</h3>
              </div>
              <div className={`heading-toggle ${selectedCollection === myBooks ? 'selected' : ''}`} onClick={() => handleSelectView(myBooks)}>
                <h3>My collection</h3>
              </div>
            </div>

            <div className="fav-books masked-overflow" >
              {selectedCollection.map((book, index) => (
                <Book book={book} index={index} handleAddFavourite={handleAddFavourite} handleRemoveFavourite={handleRemoveFavourite} myBooks={myBooks} myFavBooks={myFavBooks} handleAddBook={handleAddBook} handleRemoveBook={handleRemoveBook} />
              ))}
            </div>
          </div>

          <div style={{ minHeight: '5vh' }}></div>
        </div>
      </div>
    </div>
  )
}

export default BookModal;
