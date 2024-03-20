import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import React, { useEffect, useState } from 'react';

const VerticalIconBar = ({ chipVisible, handleEdit, book, handleRemoveFavourite }) => {

  // useEffect(() => {
  //   console.log(chipVisible)
  // }, [chipVisible])

  return (
    <div className={`v-chip ${chipVisible ? 'open' : ''}`} style={{ flexDirection: "column", width: "16px", height: "fit-content" }} >
      <div className="ic-container" onClick={handleEdit}>
        <FiEdit2 />
      </div>

      {/*       <div className="ic-container" onClick={() => handleRemoveFavourite(book)}>
        <FiTrash />
      </div> */}
    </div>
  )
}

export default VerticalIconBar;
