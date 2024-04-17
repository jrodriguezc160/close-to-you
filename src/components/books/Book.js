import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import '../../styles/favourites.css'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const Book = ({ book, index, myBooks, myFavBooks, handleAddFavourite, handleRemoveFavourite, handleAddBook, handleRemoveBook }) => {

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
        <div key={index} className='cover'>
          {book.imagen ? (
            <>
              <img src={book.imagen} style={{ zIndex: '2' }} />
              <img src={book.imagen} className='ambilight' />
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