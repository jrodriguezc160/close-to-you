import React, { useEffect } from 'react';
import '../../styles/album-stack.css';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";

const AlbumStack = ({ myFavAlbums, handleEdit, setChipVisible }) => {

  useEffect(() => {
    const stack = document.querySelector(".album-stack");
    if (!stack) return;

    const swap = (e) => {
      const card = e.target.closest(".album-card:last-child");
      if (!card || !stack.contains(card)) return;

      console.log('Click en el elemento .album-card');

      const vinyl = card.querySelector(".vinyl");
      if (card) {
        vinyl.classList.add('hide')
        card.style.animation = "album-swap 700ms forwards";
        setChipVisible(false);

        setTimeout(() => {
          card.style.animation = "";
          stack.prepend(card);
          vinyl.classList.remove('hide')
        }, 700);
      }
    };

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
                <div key={index} className="album-card">
                  <div className="album-cover" style={{ backgroundImage: `url(${album.imagen})` }}></div>
                  <div className="vinyl" style={{ zIndex: '-5' }}></div>
                </div>
              ))}
            </>
          )
          : (
            <div style={{ width: '11vw', height: '11vw', border: '2px dashed lightgray', borderRadius: '8px' }}>
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
