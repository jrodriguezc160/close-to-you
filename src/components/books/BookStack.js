import React, { useEffect } from 'react';
import '../../styles/book-stack.css';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

const BookStack = ({ myFavBooks, handleEdit, setChipVisible }) => {

  useEffect(() => {
    const stack = document.querySelector(".book-stack");
    const cards = [...stack.children].reverse();

    const swap = (e) => {
      const card = document.querySelector(".book-card:last-child");
      if (e.target !== card) return;

      card.style.animation = "book-swap 700ms forwards";
      setChipVisible(false);

      setTimeout(() => {
        card.style.animation = "";
        stack.prepend(card);
      }, 700);
    }

    stack.addEventListener("click", swap);

    return () => {
      stack.removeEventListener("click", swap);
    };
  }, []);

  return (
    <>
      <div className='book-stack'>
        {myFavBooks.length > 0
          ? (
            myFavBooks.map((book, index) => (
              <div key={index} className="book-card" style={{ backgroundImage: `url(${book.volumeInfo.imageLinks.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              </div>
            ))
          )
          : (
            <div style={{ width: '7vw', height: '11vw', border: '2px dashed lightgray', borderRadius: '4px 16px 16px 4px' }}>
              <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleEdit}>
                <FiPlus style={{ width: '75%', height: '75%' }} strokeWidth={'1.5px'} />
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default BookStack;
