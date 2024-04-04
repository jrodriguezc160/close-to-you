import "../../styles/albumshelf.css"
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconbar from '../VerticalIconBar';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import AlbumStack from './AlbumStack';

const AlbumShelf = ({ setShowAlbumModal, showAlbumModal, myAlbums, setMyAlbums, myFavAlbums, setMyFavAlbums }) => {
  const [queue, setQueue] = useState(false);
  const [chipVisible, setChipVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const touch = document.documentElement.ontouchstart !== undefined;
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const savedFavAlbums = localStorage.getItem('myFavAlbums');
    if (savedFavAlbums) {
      setMyFavAlbums(JSON.parse(savedFavAlbums));
    }

    const savedAlbum = localStorage.getItem('myAlbums');
    if (savedAlbum) {
      setMyAlbums(JSON.parse(savedAlbum));
    }
  }, []);

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

    setChipVisible(false);
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
    <div style={{ width: '36vw', height: editing ? 'auto' : '18vw', display: "flex", gap: "2rem", transition: 'all 1s ease-in-out', justifyContent: 'flex-start', overflow: 'visible', alignItems: 'center' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div style={{ width: '100%', height: '18vw', position: 'relative', display: "flex", justifyContent: "center", alignItems: "end" }}>
        <div style={{ top: '-0.5rem', right: '-3rem', width: '3rem', height: '3rem', position: 'absolute' }}>
          <VerticalIconbar chipVisible={chipVisible} handleEdit={handleEdit} handleRemoveFavourite={handleRemoveFavourite} />
        </div>

        {/*         <div style={{ bottom: '-1vw', right: '-1vw', zIndex: '20', width: '2vw', height: '2vw', position: 'absolute' }} >
          <img src='https://em-content.zobj.net/source/apple/391/videocassette_1f4fc.png' style={{ width: 'inherit', height: 'inherit' }} />
        </div> */}

        <AlbumStack myFavAlbums={myFavAlbums} handleEdit={handleEdit} setChipVisible={setChipVisible} />
      </div>

    </div>
  );
};

export default AlbumShelf;
