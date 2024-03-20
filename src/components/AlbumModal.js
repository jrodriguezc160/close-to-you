import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiX } from "@react-icons/all-files/fi/FiX";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiDelete } from "@react-icons/all-files/fi/FiDelete";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";

const API_KEY = '73ca2ef62d6bab497ca88979ab55584e';

const AlbumModal = ({ showAlbumModal, setShowAlbumModal, myFavAlbums, setMyFavAlbums, myAlbums, setMyAlbums }) => {
  const [search, setSearch] = useState("");
  const [albumData, setAlbumData] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(myFavAlbums);
  const [showLimit, setShowLimit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedFavAlbums = localStorage.getItem('myFavAlbums');
    if (savedFavAlbums) {
      setMyFavAlbums(JSON.parse(savedFavAlbums));
    }

    const savedAlbum = localStorage.getItem('myAlbums');
    if (savedAlbum) {
      setMyAlbums(JSON.parse(savedAlbum));
    }

    console.log('myFavAlbums: ', myFavAlbums)
    console.log('myAlbums: ', myAlbums)
  }, []);

  useEffect(() => {
    if (myFavAlbums.length > 0) {
      localStorage.setItem('myFavAlbums', JSON.stringify(myFavAlbums));
    }
  }, [myFavAlbums]);

  useEffect(() => {
    if (myAlbums.length > 0) {
      localStorage.setItem('myAlbums', JSON.stringify(myAlbums));
    }
  }, [myAlbums]);

  useEffect(() => {
    if (showAlbumModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showAlbumModal]);

  const handleCloseModal = () => {
    setShowAlbumModal(!showAlbumModal);
  };

  const searchAlbum = () => {
    if (!search.trim()) return; // No need to search if the input is empty

    axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=${API_KEY}&format=json`)
      .then(response => {
        if (response.data && response.data.results && response.data.results.albummatches && response.data.results.albummatches.album) {
          const albums = response.data.results.albummatches.album;
          // console.log(albums)
          setAlbumData(albums)
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

  const handleAddFavourite = (album) => {
    if (myFavAlbums.length >= 5) {
      console.log('Límite excedido')
      setShowLimit(true)
      setTimeout(() => {
        setShowLimit(false)
      }, 2000);
    } else {
      setMyFavAlbums([...myFavAlbums, album])
    }
  }

  const handleRemoveFavourite = (albumToRemove) => {
    const updatedAlbum = myFavAlbums.filter(album => album !== albumToRemove);
    setMyFavAlbums(updatedAlbum);
  }

  const handleAddAlbum = (album) => {
    setMyAlbums([...myAlbums, album])
  }

  const handleRemoveAlbum = (albumToRemove) => {
    const updatedAlbum = myAlbums.filter(album => album !== albumToRemove);
    setMyAlbums(updatedAlbum);
  }

  const handleSelectView = (collection) => {
    const albumsDivs = document.querySelectorAll('.album');
    albumsDivs.forEach(albumDiv => {
      albumDiv.classList.remove('visible');
      console.log('Se ha eliminado la clase .visible')
    });

    setTimeout(() => {
      setSelectedCollection(collection);

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
      <div className={`modal-screen ${showAlbumModal ? 'visible' : ''}`} >

        <div className="modal">
          <div className="search-bar">
            <div className='search-bar-input'>
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
                      if (myFavAlbums.some(favAlbum => favAlbum === album)) {
                        handleRemoveFavourite(album);
                      } else {
                        handleAddFavourite(album);
                      }
                    }}
                    fill={myFavAlbums.some(favAlbum => favAlbum === album) ? 'gray' : 'none'}
                  />
                </div>
                <div className='ic-container' >
                  {!myAlbums.some(favAlbum => favAlbum === album) ? (
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

          <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', padding: '0', paddingLeft: '16px', paddingBottom: '0px', height: 'fit-content' }}>
            <div className={`heading-toggle ${selectedCollection === myFavAlbums ? 'selected' : ''}`} onClick={() => handleSelectView(myFavAlbums)}>
              <h3>My favourites</h3>
            </div>
            <div className='heading-toggle'>
              <h3>/</h3>
            </div>
            <div className={`heading-toggle ${selectedCollection === myAlbums ? 'selected' : ''}`} onClick={() => handleSelectView(myAlbums)}>
              <h3>My collection</h3>
            </div>
          </div>

          <div className="fav-albums masked-overflow">
            {selectedCollection.map((album, index) => (
              <div key={index} className='album'>
                <div className='cover'>
                  <img src={album.image[2]['#text']} />
                </div>
                <div className="text">
                  {album.name}
                </div>
                <div className="text" style={{ color: 'gray', marginBottom: '4px' }}>
                  {album.artist}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <div className='ic-container' >
                    <FiStar
                      onClick={() => {
                        if (myFavAlbums.some(favAlbum => favAlbum === album)) {
                          handleRemoveFavourite(album);
                        } else {
                          handleAddFavourite(album);
                        }
                      }}
                      fill={myFavAlbums.some(favAlbum => favAlbum === album) ? 'gray' : 'none'}
                    />
                  </div>
                  <div className='ic-container' >
                    {!myAlbums.some(favAlbum => favAlbum === album) ? (
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
              </div>
            ))}
          </div>

          <div style={{ minHeight: '5vh' }}></div>
        </div>
      </div>
    </div >
  )
}

export default AlbumModal;
