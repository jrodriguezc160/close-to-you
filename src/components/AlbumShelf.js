import "../styles/albumshelf.css"
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconbar from './VerticalIconBar';

const AlbumShelf = ({ setShowAlbumModal, showAlbumModal, myAlbum, setMyAlbum, myFavAlbums, setMyFavAlbums }) => {
  const [queue, setQueue] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const touch = document.documentElement.ontouchstart !== undefined;
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  const handleRemoveFavourite = () => {
    const updatedAlbum = [...myFavAlbums];
    updatedAlbum.shift(); // Remove the first album
    setMyFavAlbums(updatedAlbum);
  }

  const cssTransition = () => {
    const body = document.body || document.documentElement;
    const style = body.style;
    const vendors = ['Moz', 'Webkit', 'O'];

    if (typeof style.transition === 'string') {
      return true;
    }

    for (let i = 0; i < vendors.length; i++) {
      const vendor = vendors[i];
      if (typeof style[vendor + 'Transition'] === 'string') {
        return true;
      }
    }

    return false;
  };

  const timeout = cssTransition() ? [300, 400] : [0, 0];

  useEffect(() => {
    imageWidthRef.current = imagesRef?.current?.firstElementChild?.offsetWidth;
    imageOffsetRef.current = imagesRef?.current?.firstElementChild?.offsetLeft;
  }, []);

  const handleImageClick = (event) => {
    if (queue) {
      return;
    }

    setChipVisible(false)
    setQueue(true);

    const direction =
      (touch ? event.changedTouches[0].pageX : event.pageX) - imageOffsetRef.current > imageWidthRef.current / 2
        ? 'slide-right'
        : 'slide-right';

    const lastClassList = imagesRef.current.lastElementChild.classList;
    lastClassList.add(direction);

    setTimeout(() => {
      lastClassList.remove(direction);
      lastClassList.add('back');

      setTimeout(() => {
        imagesRef.current.insertBefore(imagesRef.current.lastElementChild, imagesRef.current.firstElementChild);
        lastClassList.remove('back');
        setQueue(false);
        setChipVisible(true)
      }, timeout[0]);
    }, timeout[1]);
  };

  const handleMouseEnter = () => {
    setChipVisible(true)
  }

  const handleMouseLeave = () => {
    setChipVisible(false)
  }

  const handleEdit = () => {
    setShowAlbumModal(!showAlbumModal)
  }

  return (
    <div style={{ width: '100%', height: editing ? 'auto' : '200px', display: "flex", gap: "16px", transition: 'all 1s ease-in-out' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={imagesRef} className={`favAlbums ${editing ? 'edit' : ''}`} onClick={handleImageClick} >
        {myFavAlbums.map((album, index) => (
          <div key={index} className={`favAlbum ${editing ? 'edit' : ''}`}>
            <img src={album.image[3]['#text']} />
          </div>
        ))}
      </div>

      <div>
        <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} album={{/* aquí debería ir el libro actual (que se muestra por encima del resto)*/ }} />
      </div>
    </div>
  );
};

export default AlbumShelf;