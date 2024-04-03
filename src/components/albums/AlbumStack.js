import React, { useEffect } from 'react';
import '../../styles/album-stack.css';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

const AlbumStack = ({ myFavAlbums, handleEdit, setChipVisible }) => {

  useEffect(() => {
    const stack = document.querySelector(".album-stack");
    const cards = [...stack.children].reverse();

    const swap = (e) => {
      const card = document.querySelector(".album-card:last-child");
      if (e.target !== card) return;

      card.style.animation = "album-swap 700ms forwards";
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
      <div className='album-stack'>
        {myFavAlbums.length > 0
          ? (
            <>
              {myFavAlbums.map((album, index) => (
                <div key={index} className="album-card" style={{ backgroundImage: `url(${album.image[3]['#text']})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                </div>
              ))}
              {/*              <div className="vinyl">
                <div className="print"></div>
              </div> */}
            </>
          )
          : (
            <div style={{ width: '11vw', height: '11vw', border: '2px dashed lightgray', borderRadius: '4px 16px 16px 4px' }}>
              <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={handleEdit}>
                <FiPlus style={{ width: '75%', height: '75%' }} strokeWidth={'1.5px'} />
              </div>
            </div>
          )}
      </div>
    </>
  )
}

export default AlbumStack;
