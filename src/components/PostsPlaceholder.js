import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import Post from './Post';
import { useEffect } from 'react';

function PostsPlaceholder ({ profilePic, showNewPostModal, setShowNewPostModal, myPosts, setMyPosts }) {

  const baseUrl = 'https://localhost/close-to-you/';

  useEffect(() => {
    fetchPublicaciones()
  }, [])

  const fetchPublicaciones = async () => {
    try {
      const response = await fetch(baseUrl + 'getPublicaciones.php');
      if (!response.ok) {
        throw new Error('Error al obtener las publicaciones');
      }
      const data = await response.json();
      // Verifica si la respuesta es exitosa
      if (data.success) {
        // Asigna los datos a myPosts
        setMyPosts(data.data);
      } else {
        throw new Error('Error en la respuesta: ' + data.error);
      }
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  }

  useEffect(() => {
    const savedPosts = localStorage.getItem('myPosts');
    // console.log('savedPosts', savedPosts)
    if (savedPosts) {
      // setMyPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleClick = () => {
    setShowNewPostModal(true);
  }

  useEffect(() => {
    console.log(myPosts)
  }, [myPosts])


  return (
    <div className='posts-placeholder'>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: '8px' }}>
        <h3>POSTS</h3>
        <div className="chip-button" onClick={handleClick}>
          <p>&nbsp;&nbsp;</p>
          <FiEdit3 />
          <p>&nbsp;&nbsp;Nuevo post&nbsp;&nbsp;</p>
        </div>
      </div>

      {myPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  )
}

export default PostsPlaceholder;
