import { useState } from 'react';
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import '../../styles/favourites.css'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { addElemento, deleteElemento, getElementosUsuario, editElemento } from '../../services/CollectionsServices';

const Album = ({ album, myAlbums, myFavAlbums, setMyAlbums, setMyFavAlbums, currentUser, setShowLimit }) => {

  const getAlbumesFavoritos = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 4, 1);
      setMyFavAlbums(elementos);
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios:', error);
    }
  }

  const getAlbumes = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 4);
      setMyAlbums(elementos);
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios:', error);
    }
  }

  const handleAddAlbum = async (album) => {
    // console.log(album)
    try {
      if (!myAlbums.some(favAlbums => favAlbums.titulo === album.titulo)) {
        await addElemento(currentUser, 4, album.titulo, album.autor, album.imagen, album.titulo, 0);
        await getAlbumes();
        setMyAlbums([...myAlbums, album]);
      }
    } catch (error) {
      console.error('Error al agregar la publicación: ', error);
    }
  }

  const handleRemoveAlbum = async (albumToRemove) => {
    try {
      await deleteElemento(albumToRemove.titulo);
      await getAlbumes();
      await getAlbumesFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

  const handleAddFavourite = async (album) => {
    if (myFavAlbums.length >= 5) {
      setShowLimit(true);
      setTimeout(() => {
        setShowLimit(false);
      }, 2000);
    } else {
      try {
        if (!myAlbums.some(favAlbums => favAlbums.titulo === album.titulo)) {
          await handleAddAlbum(album); // Espera a que handleAddAlbum se complete
        }
        await editElemento(album.id_api, 1);
        await getAlbumesFavoritos();
        setMyFavAlbums([...myFavAlbums, album]);
      } catch (error) {
        console.error('Error al agregar la publicación: ', error);
      }
    }
  }

  const handleRemoveFavourite = async (albumToRemove) => {
    try {
      await editElemento(albumToRemove.titulo, 0);
      await getAlbumesFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

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
    <div className="album">
      <LightTooltip title={`${album.titulo} by ${album.autor}`} followCursor >
        <div className='cover'>
          {album.imagen ? (
            <>
              <img src={album.imagen} alt={album.titulo} style={{ zIndex: '2' }} />
              <img src={album.imagen} alt={album.titulo} className='ambilight' />
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
                if (!myFavAlbums.some(favAlbum => favAlbum.id === album.id)) {
                  handleAddFavourite(album);
                } else {
                  handleRemoveFavourite(album);
                }
              }}
              fill={myFavAlbums.some(favAlbum => favAlbum.id === album.id) ? 'gray' : 'none'}
            />
          </div>
          <div className='ic-container' >
            {!myAlbums.some(favAlbum => favAlbum.id === album.id) ? (
              <FiPlusCircle
                onClick={() => handleAddAlbum(album)}
                stroke='gray'
              />
            ) : (
              <FiCheckCircle
                onClick={() => handleRemoveAlbum(album)}
                stroke='gray'
              />
            )
            }
          </div>
        </div>
      </LightTooltip >
    </div>
  )
}

export default Album;