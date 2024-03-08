import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import React, { useEffect, useState } from 'react';

const VerticalIconBar = ({ chipVisible }) => {

  useEffect(() => {
    console.log(chipVisible)
  }, [chipVisible])

  return (
    <div className={`v-chip ${chipVisible ? 'open' : ''}`} style={{ flexDirection: "column", width: "16px", height: "fit-content" }} >
      <div className="ic-container">
        <FiEdit2 />
      </div>

      <div className="ic-container">
        <FiTrash />
      </div>
    </div>
  )
}

export default VerticalIconBar;
