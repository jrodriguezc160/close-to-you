import { useState } from 'react';
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { FiPlusCircle } from "@react-icons/all-files/fi/FiPlusCircle";
import { FiCheckCircle } from "@react-icons/all-files/fi/FiCheckCircle";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import '../../styles/favourites.css'
import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

const Album = ({ album, index, myAlbums, myFavAlbums, handleAddFavourite, handleRemoveFavourite, handleAddAlbum, handleRemoveAlbum }) => {

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
      <LightTooltip title={`${album.name} by ${album.artist}`} followCursor >
        <div key={index} className='cover'>
          {album.image ? (
            <>
              <img src={album.image[2]['#text']} alt={album.title} style={{ zIndex: '2' }} />
              <img src={album.image[2]['#text']} alt={album.title} className='ambilight' />
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
                if (!myFavAlbums.some(favAlbum => favAlbum === album)) {
                  handleAddFavourite(album);
                } else {
                  handleRemoveFavourite(album);
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
        {/*
      <div className="text">
          <h3 style={{ height: 'fit-content', padding: '0', marginTop: '0' }}>{album.title}</h3>
          {album.overview}
        </div>
        */}
      </LightTooltip >
    </div>
  )
}

export default Album;