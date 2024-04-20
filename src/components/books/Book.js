import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import '../../styles/favourites.css'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { addElemento, deleteElemento, getElementosUsuario, editElemento } from '../../services/CollectionsServices';

const Book = ({ book, myBooks, myFavBooks, setMyBooks, setMyFavBooks, currentUser, setShowLimit }) => {

  const getLibrosFavoritos = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 1, 1);
      setMyFavBooks(elementos);
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios:', error);
    }
  }

  const getLibros = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 1);
      setMyBooks(elementos);
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios:', error);
    }
  }

  const handleAddBook = async (book) => {
    // console.log(book)
    try {
      if (!myBooks.some(favBook => favBook.id_api === book.id)) {
        await addElemento(currentUser, 1, book.titulo, book.autor, book.imagen, book.id_api, 0);
        await getLibros();
        setMyBooks([...myBooks, book]);
      }
    } catch (error) {
      console.error('Error al agregar la publicación: ', error);
    }
  }

  const handleRemoveBook = async (bookToRemove) => {
    try {
      await deleteElemento(bookToRemove.id_api);
      await getLibros();
      await getLibrosFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

  const handleAddFavourite = async (book) => {
    if (myFavBooks.length >= 3) {
      setShowLimit(true);
      setTimeout(() => {
        setShowLimit(false);
      }, 2000);
    } else {
      try {
        if (!myBooks.some(favBook => favBook.id_api === book.id)) {
          await handleAddBook(book); // Espera a que handleAddBook se complete
        }
        await editElemento(book.id_api, 1);
        await getLibrosFavoritos();
        setMyFavBooks([...myFavBooks, book]);
      } catch (error) {
        console.error('Error al agregar la publicación: ', error);
      }
    }
  }

  const handleRemoveFavourite = async (bookToRemove) => {
    try {
      await editElemento(bookToRemove.id_api, 0);
      await getLibrosFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#efefef7d',
      backdropFilter: 'blur(10px)',
      color: 'rgba(0, 0, 0, 0.5)',
      boxShadow: '0 2px 5px rgba (30, 30, 30, 0.25)',
      fontSize: 11,
    },
  }));

  return (
    <div className="book">
      <LightTooltip title={`${book.titulo} by ${book.autor}`} followCursor >
        <div className='cover'>
          {book.imagen ? (
            <>
              <img src={book.imagen} alt="book cover" style={{ zIndex: '99' }} />
              <img src={book.imagen} className='ambilight' alt="book cover ambilight" />
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FiImage />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          <div className='ic-container' >
            <FiStar
              onClick={() => {
                if (!myFavBooks.some(favBook => favBook.id === book.id)) {
                  handleAddFavourite(book);
                } else {
                  handleRemoveFavourite(book);
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
            )}
          </div>
        </div>
      </LightTooltip>
    </div>
  );

}

export default Book;
