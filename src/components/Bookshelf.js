import "../styles/bookshelf.css"
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconbar from './VerticalIconBar';

const ImageSlider = ({ setShowBookModal, showBookModal, myBooks, setMyBooks, myFavBooks, setMyFavBooks }) => {
  const [queue, setQueue] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const touch = document.documentElement.ontouchstart !== undefined;
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  const handleRemoveFavourite = () => {
    const updatedBooks = [...myFavBooks];
    updatedBooks.shift(); // Remove the first book
    setMyFavBooks(updatedBooks);
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
    setShowBookModal(!showBookModal)
  }

  return (
    <div style={{ width: '11vw', height: '12vw', display: "flex", gap: "0", transition: 'all 1s ease-in-out' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={imagesRef} className={`images ${editing ? 'edit' : ''}`} onClick={handleImageClick} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "12vw" }}>
        {myFavBooks.map((book, index) => (
          <div key={index} className={`image ${editing ? 'edit' : ''}`}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '.5rem' }}>
        <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} />
      </div>
    </div>
  );
};

export default ImageSlider;
