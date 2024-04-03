import "../../styles/bookshelf.css"
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconbar from '../VerticalIconBar';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import BookStack from './BookStack';

const ImageSlider = ({ setShowBookModal, showBookModal, myBooks, setMyBooks, myFavBooks, setMyFavBooks }) => {
  const [queue, setQueue] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const touch = document.documentElement.ontouchstart !== undefined;
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const savedFavBooks = localStorage.getItem('myFavBooks');
    if (savedFavBooks) {
      setMyFavBooks(JSON.parse(savedFavBooks));
    }

    const savedBook = localStorage.getItem('myBooks');
    if (savedBook) {
      setMyBooks(JSON.parse(savedBook));
    }
  }, []);

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
    <div style={{ width: '12vw', height: '12vw', display: "flex", gap: "0", transition: 'all 1s ease-in-out' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

      <div style={{ width: '100%', height: '12vw', position: 'relative', display: "flex", justifyContent: 'flex-start', alignItems: "center" }}>
        <div style={{ bottom: '-1vw', right: '3vw', zIndex: '20', width: '3vw', height: '3vw', position: 'absolute' }} >
          <img src='https://em-content.zobj.net/source/apple/391/books_1f4da.png' style={{ width: 'inherit', height: 'inherit' }} />
        </div>

        <BookStack
          myFavBooks={myFavBooks}
          handleEdit={handleEdit}
          setChipVisible={setChipVisible}
        />
      </div>

      <div style={{ marginTop: '.5rem' }}>
        {myFavBooks.length > 0 && <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} />}
      </div>
    </div >
  );
};

export default ImageSlider;
