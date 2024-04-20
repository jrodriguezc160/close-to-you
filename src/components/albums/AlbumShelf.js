import "../../styles/albumshelf.css"
import React, { useEffect, useRef, useState } from 'react';
import VerticalIconbar from '../VerticalIconBar';
import AlbumStack from './AlbumStack';
import { getElementosUsuario } from '../../services/CollectionsServices';

const AlbumShelf = ({ setShowAlbumModal, showAlbumModal, myAlbums, setMyAlbums, myFavAlbums, setMyFavAlbums, currentUser }) => {
  const [chipVisible, setChipVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const imagesRef = useRef(null);
  const imageWidthRef = useRef(0);
  const imageOffsetRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumesFavoritos = await getElementosUsuario(currentUser, 4, 1);
        setMyFavAlbums(albumesFavoritos);
        const albumes = await getElementosUsuario(currentUser, 4);
        setMyAlbums(albumes);
      } catch (error) {
        console.error('Error al obtener los elementos o los usuarios:', error);
      }
    }

    fetchData();
  }, []);

  const handleRemoveFavourite = () => {
    const updatedAlbum = [...myFavAlbums];
    updatedAlbum.shift(); // Remove the first album
    setMyFavAlbums(updatedAlbum);
  }

  useEffect(() => {
    imageWidthRef.current = imagesRef?.current?.firstElementChild?.offsetWidth;
    imageOffsetRef.current = imagesRef?.current?.firstElementChild?.offsetLeft;
  }, []);

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

        <AlbumStack myFavAlbums={myFavAlbums} handleEdit={handleEdit} setChipVisible={setChipVisible} />
      </div>

    </div>
  );
};

export default AlbumShelf;
