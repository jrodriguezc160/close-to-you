import React, { useEffect } from 'react';
import '../styles/cardstack.css';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

const CardStack = ({ myFavBooks }) => {

  useEffect(() => {
    const stack = document.querySelector(".stack");
    const cards = [...stack.children].reverse();

    const swap = (e) => {
      const card = document.querySelector(".card:last-child");
      if (e.target !== card) return;
      card.style.animation = "swap 700ms forwards";

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
      <div className='stack'>
        {myFavBooks.length > 0
          ? (
            myFavBooks.map((book, index) => (
              <div key={index} className="card" style={{ backgroundImage: `url(${book.volumeInfo.imageLinks.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              </div>
            ))
          )
          : (
            <div style={{ width: '7vw', height: '11vw', border: '2px dashed lightgray', borderRadius: '4px 16px 16px 4px' }}>
              <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}/*  onClick={handleEdit} */>
                <FiPlus style={{ width: '75%', height: '75%' }} strokeWidth={'1.5px'} />
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default CardStack;
