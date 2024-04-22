import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import Album from '../albums/Album';
import { addElemento, deleteElemento, getElementosUsuario, editElemento } from '../../services/CollectionsServices';

const API_KEY = '73ca2ef62d6bab497ca88979ab55584e';

const AlbumModal = ({ showAlbumModal, setShowAlbumModal, myFavAlbums, setMyFavAlbums, myAlbums, setMyAlbums, currentUser }) => {
  const [search, setSearch] = useState("");
  const [albumData, setAlbumData] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(myFavAlbums);
  const [showLimit, setShowLimit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef(null);

  const getAlbumesFavoritos = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 4, 1)
      setMyFavAlbums(elementos)
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios');
    }
  }

  const getAlbumes = async () => {
    try {
      const elementos = await getElementosUsuario(currentUser, 4)
      console.log(elementos)
      setMyAlbums(elementos)
    } catch (error) {
      console.error('Error al obtener los elementos o los usuarios');
    }
  }

  useEffect(() => {
    showAlbumModal === true && setModalVisible(true);

    setTimeout(() => {
      let delay = 100;
      const albumsDivs = document.querySelectorAll('.album');
      albumsDivs.forEach(albumDiv => {
        setTimeout(() => {
          albumDiv.classList.add('visible');
        }, delay);

        delay += 100;
      });
    }, 500);
  }, [showAlbumModal]);

  useEffect(() => {
    if (modalVisible === true) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalVisible]);

  const handleCloseModal = () => {
    setShowAlbumModal(!showAlbumModal);
  };

  const searchAlbum = () => {
    if (!search.trim()) return; // No need to search if the input is empty

    axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${API_KEY}&format=json&limit=10`)
      .then(response => {
        if (response.data && response.data.results && response.data.results.albummatches && response.data.results.albummatches.album) {
          const matchingAlbums = response.data.results.albummatches.album;

          // Array para almacenar las promesas de las solicitudes de información del álbum
          const requests = matchingAlbums.map(album => {
            return axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&album=${album.name}&artist=${album.artist}&format=json`)
              .then(response => response.data.album)
              .catch(error => {
                console.error('Error searching album:', error);
                return null; // Si hay un error, devolver null para manejarlo más tarde
              });
          });

          // Esperar a que todas las solicitudes se completen
          Promise.all(requests)
            .then(albums => {
              // Filtrar los álbumes que no son null (hubo errores en las solicitudes)
              const validAlbums = albums.filter(album => album !== null);
              // Actualizar albumData con los álbumes válidos
              setAlbumData(validAlbums);
            })
            .catch(error => {
              console.error('Error searching album:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error searching album:', error);
      });
  };

  // Llama a searchAlbum cada vez que cambia el valor del input
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    searchAlbum();
  }

  const handleClearInput = () => {
    setSearch('');
    setAlbumData([]);
  }

  const handleAddAlbum = async (album) => {
    console.log(album);
    console.log(myAlbums);
    try {
      if (!myAlbums.some(album => album.id_api === album.url)) {
        await addElemento(currentUser, 4, album.name, album.artist, album.image[5]['#text'], album.url, 0);
        await getAlbumes();
      }
    } catch (error) {
      console.error('Error al agregar la publicación: ', error);
    }
  }

  const handleRemoveAlbum = async (albumToRemove) => {
    try {
      await deleteElemento(albumToRemove.id);
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
        if (!myAlbums.some(favAlbum => favAlbum.id_api === album.url)) {
          await handleAddAlbum(album); // Espera a que handleAddAlbum se complete
        }
        await editElemento(album.url, 1); // Llama a editElemento después de que handleAddAlbum se haya completado
        await getAlbumesFavoritos();
      } catch (error) {
        console.error('Error al agregar la publicación: ', error);
      }
    }
  }

  const handleRemoveFavourite = async (albumToRemove) => {
    try {
      await editElemento(albumToRemove.url, 0);
      getAlbumesFavoritos();
    } catch (error) {
      console.error('Error al eliminar la publicación: ', error);
    }
  }

  const handleSelectView = (collection, e) => {
    const albumsDivs = document.querySelectorAll('.album');
    albumsDivs.forEach(albumDiv => {
      albumDiv.classList.remove('visible');
    });

    const headingToggleElements = document.querySelectorAll('.heading-toggle');
    headingToggleElements.forEach(headingToggle => {
      headingToggle.classList.remove('selected');
    });

    setTimeout(() => {
      e.target.parentElement.classList.add('selected');
      setSelectedCollection([...collection]);

      setTimeout(() => {
        let delay = 100;
        const albumsDivs = document.querySelectorAll('.album');
        albumsDivs.forEach(albumDiv => {
          setTimeout(() => {
            albumDiv.classList.add('visible');
          }, delay);

          delay += 100;
        });
      }, 50);
    }, 300);
  }

  const handleClickExterior = (event) => {
    console.log('Click exteriors')
    if (event.target.classList.contains('modal-screen')) {
      setModalVisible(false)
      setTimeout(() => {
        setShowAlbumModal(false);
      }, 1000);
    }
  }

  return (
    <div>
      <div className={`modal-screen ${showLimit ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }} >
        <div className={`modal-message ${showLimit ? 'visible' : ''}`} style={{ zIndex: '201', visibility: showLimit ? 'visible' : 'hidden', opacity: showLimit ? 1 : 0 }}>
          <div className="ic-container" style={{ width: '64px', height: '64px' }} >
            <FiAlertTriangle fill='white' stroke='rgb(222, 0, 0)' />
          </div>
          <p>Límite de favoritos: 5.</p>
          <p>Elimine un favorito para continuar</p>
        </div>
      </div>

      <div className={`modal-screen ${modalVisible === true ? 'visible' : ''}`} onClick={handleClickExterior}  >
        <div className="modal">
          <div className="text-bar">
            <div className='text-bar-input'>
              <input ref={inputRef} type="text" name="album-search" id="album-search" placeholder='Search for your favourite album..' value={search} onChange={handleInputChange} />
              <div className='ic-container' onClick={handleClearInput}>
                <FiDelete />
              </div>
            </div>

            <div className="ic-container" onClick={handleCloseModal} >
              <FiX />
            </div>
          </div>

          <div className={`albums-list ${albumData.length > 0 ? 'visible' : ''}`}>
            {albumData.map((album, index) => (
              <div key={index} className='album-result'>
                <div className='album-cover'>
                  {album?.image ? (
                    <img src={album.image[2]['#text']} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', color: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <FiImage />
                    </div>
                  )}
                </div>
                <p style={{ maxWidth: '50%', marginRight: 'auto' }}>{album.name}</p>
                <p style={{ color: 'gray' }}>{album.artist}</p>
                <div className='ic-container' >
                  <FiStar
                    onClick={() => {
                      if (myFavAlbums.some(favAlbum => favAlbum.id_api === album.url)) {
                        handleRemoveFavourite(album);
                      } else {
                        handleAddFavourite(album);
                      }
                    }}
                    fill={myFavAlbums.some(favAlbum => favAlbum.id_api === album.url) ? 'gray' : 'none'}
                  />
                </div>
                <div className='ic-container' >
                  {!myAlbums.some(favAlbum => favAlbum.id_api === album.url) ? (
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
            ))}
          </div>

          <div className="albums-list visible" style={{ padding: '0px', margin: '0', gap: '0', minHeight: '80px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', height: 'fit-content', padding: '32px 0 0 32px' }}>
              <div className={`heading-toggle ${selectedCollection === myFavAlbums ? 'selected' : ''}`} onClick={(e) => handleSelectView(myFavAlbums, e)}>
                <h3>My favourites</h3>
              </div>
              <div className='heading-toggle'>
                <h3>/</h3>
              </div>
              <div className={`heading-toggle ${selectedCollection === myAlbums ? 'selected' : ''}`} onClick={(e) => handleSelectView(myAlbums, e)}>
                <h3>My collection</h3>
              </div>
            </div>

            <div className="fav-albums masked-overflow" >
              {selectedCollection.map((album, index) => (
                <Album
                  album={album}
                  myAlbums={myAlbums}
                  myFavAlbums={myFavAlbums}
                  setMyAlbums={setMyAlbums}
                  setMyFavAlbums={setMyFavAlbums}
                  currentUser={currentUser}
                  setShowLimit={setShowLimit}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AlbumModal;
