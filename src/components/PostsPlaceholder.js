import { FiEdit3 } from "@react-icons/all-files/fi/FiEdit3";
import Post from './Post';
import { useEffect, useState } from 'react';
import { fetchPublicaciones, getPublicacionesUsuario } from '../services/PostsServices';
import { getUsuarios } from '../services/UsersServices';

function PostsPlaceholder ({ profilePic, showNewPostModal, setShowNewPostModal, myPosts, setMyPosts, currentUser }) {
  const [postsWithUsers, setPostsWithUsers] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const publicaciones = await getPublicacionesUsuario(currentUser);
        const usuarios = await getUsuarios();
        console.log('respuesta de getPublicaciones', publicaciones)

        // Asociamos cada publicación con su usuario correspondiente
        const posts = publicaciones.map(publicacion => {
          const usuario = usuarios.find(usuario => usuario.id === publicacion.id_usuario);
          return { ...publicacion, usuario };
        });

        setPostsWithUsers(posts);
      } catch (error) {
        console.error('Error al obtener las publicaciones o los usuarios:', error);
      }
    }

    fetchData();
  }, [myPosts]);

  const handleClick = () => {
    setShowNewPostModal(true);
  }

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

      {postsWithUsers.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  )
}

export default PostsPlaceholder;
