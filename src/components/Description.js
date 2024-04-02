import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { useState } from 'react';

const Description = ({ desc, setDesc, setShowDescModal }) => {
  const [editVisible, setEditVisible] = useState(false);

  const handleMouseEnter = () => {
    setEditVisible(true)
  }

  const handleMouseLeave = () => {
    setEditVisible(false)
  }

  const handleClick = () => {
    setShowDescModal(true)
    console.log('holaaaaaaa')
  }

  return (
    <div className='profile-desc' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <p>{desc}&nbsp;
        <FiEdit2 className={`edit-desc ${editVisible === true && ('visible waving')}`} onClick={handleClick} />
      </p>
    </div>
  )
}

export default Description;